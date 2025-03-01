
import React from "react";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
}

const AnimatedButton = ({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: AnimatedButtonProps) => {
  const baseClasses = "relative inline-flex items-center justify-center overflow-hidden rounded-md font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-primary text-primary-foreground shadow-lg hover:shadow-primary/30 focus:ring-primary/70",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:ring-secondary/70",
    outline: "border border-input bg-background hover:bg-secondary focus:ring-primary/70",
    ghost: "bg-transparent hover:bg-secondary focus:ring-primary/70",
  };
  
  const sizes = {
    sm: "text-xs px-3 py-1.5",
    md: "text-sm px-4 py-2",
    lg: "text-base px-6 py-3",
  };
  
  const animationEffect = "after:absolute after:inset-0 after:bg-white/10 after:opacity-0 hover:after:opacity-100 after:transition-opacity";
  
  return (
    <button
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        animationEffect,
        "group",
        className
      )}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-1.5 transition-transform duration-300 group-hover:scale-[1.03]">
        {children}
      </span>
    </button>
  );
};

export default AnimatedButton;
