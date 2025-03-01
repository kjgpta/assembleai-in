
import React, { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedCardProps {
  className?: string;
  children: React.ReactNode;
  hoverEffect?: boolean;
  perspective?: boolean;
  revealOnScroll?: boolean;
  delay?: number;
}

const AnimatedCard = ({
  className,
  children,
  hoverEffect = true,
  perspective = true,
  revealOnScroll = false,
  delay = 0,
}: AnimatedCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(!revealOnScroll);

  useEffect(() => {
    if (!revealOnScroll) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true);
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [revealOnScroll, delay]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!perspective || !hoverEffect || !cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };
  
  const handleMouseLeave = () => {
    if (!perspective || !hoverEffect || !cardRef.current) return;
    
    const card = cardRef.current;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        "relative rounded-xl shadow-md transition-all duration-300",
        hoverEffect && "hover:shadow-lg",
        revealOnScroll && "transition-opacity duration-700",
        revealOnScroll && !isVisible && "opacity-0 translate-y-8",
        revealOnScroll && isVisible && "opacity-100 translate-y-0",
        perspective && "transform-gpu",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default AnimatedCard;
