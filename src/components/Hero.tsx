
import React, { useEffect, useState, useRef } from "react";
import { ArrowRight, Sparkles, Braces } from "lucide-react";
import AnimatedButton from "./ui/AnimatedButton";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [typingComplete, setTypingComplete] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    const typingTimer = setTimeout(() => {
      setTypingComplete(true);
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearTimeout(typingTimer);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center px-4 overflow-hidden"
      style={{ 
        background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(139, 92, 246, 0.15), rgba(8, 15, 40, 0.05))` 
      }}
    >
      {/* Floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, index) => (
          <div 
            key={index}
            className="absolute rounded-full mix-blend-screen"
            style={{
              width: `${Math.random() * 400 + 50}px`,
              height: `${Math.random() * 400 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, rgba(${Math.floor(Math.random() * 100 + 100)}, ${Math.floor(Math.random() * 100 + 100)}, ${Math.floor(Math.random() * 255)}, 0.${Math.floor(Math.random() * 5 + 1)}) 0%, transparent 70%)`,
              transform: `translate3d(${(mousePosition.x - 0.5) * 20 * (index % 5 - 2)}px, ${(mousePosition.y - 0.5) * 20 * (index % 3 - 1)}px, 0)`,
              filter: `blur(${Math.random() * 40 + 5}px)`,
              opacity: Math.random() * 0.5 + 0.2,
              transition: 'transform 0.1s ease-out',
            }}
          ></div>
        ))}
      </div>

      <div className="container mx-auto max-w-6xl z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-3">
            <div
              style={{ 
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? 'translateY(0)' : 'translateY(30px)',
                transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
              }}
            >
              <div className="inline-flex items-center mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-3">
                  <Sparkles size={20} />
                </div>
                <span className="text-sm font-semibold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-400">
                  Experimental Build
                </span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-br from-slate-900 to-slate-700 dark:from-white dark:to-slate-300">
                <span className="block">Next Generation</span>
                <div className="relative overflow-hidden h-[1.2em] mt-2">
                  <span 
                    className={`absolute bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-500 ${typingComplete ? '' : 'typewriter'}`}
                    style={{
                      animation: typingComplete ? 'none' : 'typewriter 2s steps(20, end)'
                    }}
                  >
                    Machine Learning
                  </span>
                  {!typingComplete && (
                    <span className="absolute top-0 right-0 w-1 h-full bg-violet-600 animate-blink"></span>
                  )}
                </div>
              </h1>
              
              <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-xl">
                Building with cutting-edge AI technologies. This is a showcase of experimental features using advanced machine learning algorithms.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <AnimatedButton 
                  variant="primary" 
                  size="lg"
                  className="bg-gradient-to-r from-violet-600 to-indigo-500 hover:from-violet-700 hover:to-indigo-600"
                >
                  View Demo
                  <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
                </AnimatedButton>
                
                <AnimatedButton
                  variant="outline"
                  size="lg"
                  className="border-violet-200 text-violet-700 hover:bg-violet-50"
                >
                  <Braces size={18} className="mr-2" />
                  Source Code
                </AnimatedButton>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div 
              style={{ 
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? 'translateY(0)' : 'translateY(30px)',
                transition: 'opacity 0.8s ease-out 0.3s, transform 0.8s ease-out 0.3s',
              }}
              className="relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600/20 to-indigo-600/20 rounded-2xl blur-xl"></div>
              <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-violet-100/50 dark:border-violet-800/30 shadow-xl overflow-hidden">
                <div className="absolute top-0 left-0 right-0 flex items-center p-3 border-b border-violet-100/30 dark:border-violet-800/30 bg-violet-50/50 dark:bg-slate-800/50">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="ml-4 text-xs text-slate-500 dark:text-slate-400 font-mono">ai_model.py</div>
                </div>
                
                <div className="font-mono text-xs text-slate-800 dark:text-slate-300 pt-12 p-4 overflow-hidden h-72">
                  <div className="animate-pulse mb-2 text-violet-600 dark:text-violet-400"># Neural Network Architecture</div>
                  
                  <div className="text-slate-500 dark:text-slate-400 mb-2">class <span className="text-indigo-600 dark:text-indigo-400">NeuralNetwork</span>(nn.Module):</div>
                  
                  <div className="ml-4 text-slate-500 dark:text-slate-400">def <span className="text-indigo-600 dark:text-indigo-400">__init__</span>(self):</div>
                  <div className="ml-8 text-slate-500 dark:text-slate-400">super(NeuralNetwork, self).__init__()</div>
                  <div className="ml-8 text-slate-500 dark:text-slate-400">self.layers = nn.Sequential(</div>
                  <div className="ml-12 text-slate-500 dark:text-slate-400">nn.Linear(784, 512),</div>
                  <div className="ml-12 text-slate-500 dark:text-slate-400">nn.ReLU(),</div>
                  <div className="ml-12 text-slate-500 dark:text-slate-400">nn.Dropout(0.2),</div>
                  <div className="ml-12 text-slate-500 dark:text-slate-400">nn.Linear(512, 256),</div>
                  <div className="ml-12 text-slate-500 dark:text-slate-400">nn.ReLU(),</div>
                  <div className="ml-12 text-slate-500 dark:text-slate-400">nn.Dropout(0.2),</div>
                  <div className="ml-12 text-slate-500 dark:text-slate-400">nn.Linear(256, 128),</div>
                  <div className="ml-12 text-slate-500 dark:text-slate-400">nn.ReLU(),</div>
                  <div className="ml-12 text-slate-500 dark:text-slate-400">nn.Linear(128, 10)</div>
                  <div className="ml-8 text-slate-500 dark:text-slate-400">)</div>
                  
                  <div className="mt-4 ml-4 text-slate-500 dark:text-slate-400">def <span className="text-indigo-600 dark:text-indigo-400">forward</span>(self, x):</div>
                  <div className="ml-8 text-slate-500 dark:text-slate-400">x = x.view(-1, 784)</div>
                  <div className="ml-8 text-slate-500 dark:text-slate-400">logits = self.layers(x)</div>
                  <div className="ml-8 text-slate-500 dark:text-slate-400">return F.log_softmax(logits, dim=1)</div>
                  
                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white dark:from-slate-900 to-transparent"></div>
                </div>
                
                {/* Floating particles */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(10)].map((_, i) => (
                    <div 
                      key={i}
                      className="absolute w-2 h-2 rounded-full bg-violet-400/30"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animation: `float ${2 + Math.random() * 3}s ease-in-out infinite alternate`,
                        animationDelay: `${i * 0.2}s`
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
