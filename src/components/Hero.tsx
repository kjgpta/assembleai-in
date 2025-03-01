
import React, { useEffect, useState, useRef } from "react";
import { ArrowRight, Brain, CircuitBoard } from "lucide-react";
import AnimatedButton from "./ui/AnimatedButton";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [typingComplete, setTypingComplete] = useState(false);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    const typingTimer = setTimeout(() => {
      setTypingComplete(true);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(typingTimer);
    };
  }, []);

  useEffect(() => {
    if (!particlesRef.current) return;
    
    const moveParticles = (e: MouseEvent) => {
      const particles = particlesRef.current;
      if (!particles) return;
      
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      particles.style.transform = `translate(${x * -20}px, ${y * -20}px)`;
    };
    
    window.addEventListener('mousemove', moveParticles);
    
    return () => {
      window.removeEventListener('mousemove', moveParticles);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 px-4 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div 
          className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-white"
          style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 1s ease-out' }}
        ></div>
        <div 
          ref={particlesRef}
          className="absolute inset-0 transition-transform duration-200 ease-out"
          style={{ opacity: isLoaded ? 0.7 : 0, transition: 'opacity 1s ease-out' }}
        >
          {[...Array(15)].map((_, index) => (
            <div 
              key={index}
              className="absolute rounded-full bg-primary/5"
              style={{
                width: `${Math.random() * 300 + 100}px`,
                height: `${Math.random() * 300 + 100}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                opacity: Math.random() * 0.5 + 0.2,
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div
            className="animated-element"
            style={{ 
              transitionDelay: '0.3s',
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(30px)',
            }}
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-primary text-sm font-medium mb-6">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
              <span>The Future of AI</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="block">Empowering the Future</span>
              <div className="hero-text-container">
                <span className={`block text-primary typewriter ${typingComplete ? '' : 'after:content-[""]'}`}>
                  with GPT & Machine Learning
                </span>
                {!typingComplete && <span className="typewriter-cursor"></span>}
              </div>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-lg">
              Our cutting-edge GPT and ML tools help businesses harness the power of artificial intelligence to solve complex problems and drive innovation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <AnimatedButton 
                variant="primary" 
                size="lg"
              >
                Explore Our Tools
                <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
              </AnimatedButton>
              
              <AnimatedButton
                variant="outline"
                size="lg"
              >
                Learn More
              </AnimatedButton>
            </div>
          </div>
          
          <div 
            className="animated-element"
            style={{ 
              transitionDelay: '0.6s',
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(30px)',
            }}
          >
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-blue-400 rounded-2xl blur opacity-30 animate-pulse"></div>
              <div className="relative bg-white rounded-2xl border border-blue-100/50 p-6 shadow-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-3 p-4 rounded-xl bg-blue-50/50">
                    <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Brain size={24} />
                    </div>
                    <h3 className="font-semibold">AI Analysis</h3>
                    <p className="text-sm text-muted-foreground">Advanced pattern recognition and data analysis</p>
                  </div>
                  
                  <div className="flex flex-col gap-3 p-4 rounded-xl bg-blue-50/50">
                    <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <CircuitBoard size={24} />
                    </div>
                    <h3 className="font-semibold">Neural Networks</h3>
                    <p className="text-sm text-muted-foreground">Custom-built neural networks for your specific needs</p>
                  </div>
                </div>
                
                <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50/50">
                  <div className="mb-2 flex justify-between items-center">
                    <span className="text-sm font-medium">Processing Model</span>
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100/70">82% Complete</span>
                  </div>
                  <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full"
                      style={{ width: '82%' }}
                    ></div>
                  </div>
                  <div className="mt-3 grid grid-cols-4 gap-1">
                    {[...Array(4)].map((_, index) => (
                      <div 
                        key={index}
                        className="h-1.5 rounded-full bg-blue-100"
                        style={{ 
                          opacity: Math.random() * 0.5 + 0.5,
                          width: `${Math.random() * 50 + 50}%` 
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
                
                <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full blur-xl opacity-20"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
