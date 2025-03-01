
import React, { useEffect, useState, useRef } from "react";
import { ArrowRight, Sparkles, Braces, ChefHat, FileSearch } from "lucide-react";
import AnimatedButton from "./ui/AnimatedButton";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [typingComplete, setTypingComplete] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
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
        background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(139, 92, 246, 0.15), rgba(8, 15, 40, 0.05))`,
        transition: 'background 0.3s ease-out'
      }}
    >
      {/* Floating elements with smoother animations */}
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
              transition: 'transform 0.3s ease-out',
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
                transition: 'opacity 1s ease-out, transform 1s ease-out',
              }}
            >
              <div className="inline-flex items-center mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-3">
                  <Sparkles size={20} />
                </div>
                <span className="text-sm font-semibold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-400">
                  AI-Powered Projects
                </span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-br from-slate-900 to-slate-700 dark:from-white dark:to-slate-300">
                <span className="block">GPT-Powered</span>
                <div className="relative overflow-hidden h-[1.2em] mt-2">
                  <span 
                    className={`absolute bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-500 ${typingComplete ? '' : 'typewriter'}`}
                    style={{
                      animation: typingComplete ? 'none' : 'typewriter 2s steps(20, end)'
                    }}
                  >
                    Applications
                  </span>
                  {!typingComplete && (
                    <span className="absolute top-0 right-0 w-1 h-full bg-violet-600 animate-blink"></span>
                  )}
                </div>
              </h1>
              
              <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-xl">
                Explore innovative applications powered by GPT models, designed to solve real-world problems in cooking and recruitment.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <AnimatedButton 
                  variant="primary" 
                  size="lg"
                  className="group bg-gradient-to-r from-violet-600 to-indigo-500 hover:from-violet-700 hover:to-indigo-600"
                  onMouseEnter={() => setSelectedProject("recipe")}
                  onClick={() => window.location.href = "/recipe-demo"}
                >
                  <ChefHat size={20} className="mr-2 transition-transform group-hover:rotate-12" />
                  Recipe Generator
                  <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
                </AnimatedButton>
                
                <AnimatedButton
                  variant="outline"
                  size="lg"
                  className="group border-violet-200 text-violet-700 hover:bg-violet-50"
                  onMouseEnter={() => setSelectedProject("resume")}
                  onClick={() => window.location.href = "/resume-demo"}
                >
                  <FileSearch size={20} className="mr-2 transition-transform group-hover:rotate-12" />
                  Resume Parser
                  <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
                </AnimatedButton>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div 
              style={{ 
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? 'translateY(0)' : 'translateY(30px)',
                transition: 'opacity 1s ease-out 0.3s, transform 1s ease-out 0.3s',
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
                  <div className="ml-4 text-xs text-slate-500 dark:text-slate-400 font-mono">
                    {selectedProject === "recipe" ? "recipe_generator.py" : 
                     selectedProject === "resume" ? "resume_parser.py" : 
                     "gpt_model.py"}
                  </div>
                </div>
                
                <div className="font-mono text-xs text-slate-800 dark:text-slate-300 pt-12 p-4 overflow-hidden h-72">
                  {selectedProject === "recipe" ? (
                    <>
                      <div className="animate-pulse mb-2 text-violet-600 dark:text-violet-400"># Recipe Generator</div>
                      <div className="text-slate-500 dark:text-slate-400 mb-2">def <span className="text-indigo-600 dark:text-indigo-400">generate_recipe</span>(ingredients, cuisine, dietary_restrictions):</div>
                      <div className="ml-4 text-slate-500 dark:text-slate-400">"""Generate a recipe using GPT model"""</div>
                      <div className="ml-4 text-slate-500 dark:text-slate-400">prompt = format_recipe_prompt(</div>
                      <div className="ml-8 text-slate-500 dark:text-slate-400">ingredients=ingredients,</div>
                      <div className="ml-8 text-slate-500 dark:text-slate-400">cuisine=cuisine,</div>
                      <div className="ml-8 text-slate-500 dark:text-slate-400">restrictions=dietary_restrictions</div>
                      <div className="ml-4 text-slate-500 dark:text-slate-400">)</div>
                      <div className="ml-4 text-slate-500 dark:text-slate-400">response = gpt_model.generate(prompt)</div>
                      <div className="ml-4 text-slate-500 dark:text-slate-400">return parse_recipe_response(response)</div>
                    </>
                  ) : selectedProject === "resume" ? (
                    <>
                      <div className="animate-pulse mb-2 text-violet-600 dark:text-violet-400"># Resume Parser</div>
                      <div className="text-slate-500 dark:text-slate-400 mb-2">def <span className="text-indigo-600 dark:text-indigo-400">parse_resume</span>(resume_text):</div>
                      <div className="ml-4 text-slate-500 dark:text-slate-400">"""Extract structured data from resume"""</div>
                      <div className="ml-4 text-slate-500 dark:text-slate-400">prompt = format_resume_prompt(resume_text)</div>
                      <div className="ml-4 text-slate-500 dark:text-slate-400">response = gpt_model.generate(prompt)</div>
                      <div className="ml-4 text-slate-500 dark:text-slate-400">skills = extract_skills(response)</div>
                      <div className="ml-4 text-slate-500 dark:text-slate-400">experience = extract_experience(response)</div>
                      <div className="ml-4 text-slate-500 dark:text-slate-400">education = extract_education(response)</div>
                      <div className="ml-4 text-slate-500 dark:text-slate-400">return {"{"}
                      </div>
                      <div className="ml-8 text-slate-500 dark:text-slate-400">"skills": skills,</div>
                      <div className="ml-8 text-slate-500 dark:text-slate-400">"experience": experience,</div>
                      <div className="ml-8 text-slate-500 dark:text-slate-400">"education": education</div>
                      <div className="ml-4 text-slate-500 dark:text-slate-400">{"}"}</div>
                    </>
                  ) : (
                    <>
                      <div className="animate-pulse mb-2 text-violet-600 dark:text-violet-400"># GPT Model Interface</div>
                      <div className="text-slate-500 dark:text-slate-400 mb-2">class <span className="text-indigo-600 dark:text-indigo-400">GPTInterface</span>:</div>
                      <div className="ml-4 text-slate-500 dark:text-slate-400">def __init__(self, model_name="gpt-4"):</div>
                      <div className="ml-8 text-slate-500 dark:text-slate-400">self.model = model_name</div>
                      <div className="ml-8 text-slate-500 dark:text-slate-400">self.temperature = 0.7</div>
                      <div className="ml-8 text-slate-500 dark:text-slate-400">self.max_tokens = 1024</div>
                      <div className="ml-4 text-slate-500 dark:text-slate-400">def generate(self, prompt):</div>
                      <div className="ml-8 text-slate-500 dark:text-slate-400">"""Generate completion using GPT"""</div>
                      <div className="ml-8 text-slate-500 dark:text-slate-400">response = call_openai_api(</div>
                      <div className="ml-12 text-slate-500 dark:text-slate-400">model=self.model,</div>
                      <div className="ml-12 text-slate-500 dark:text-slate-400">prompt=prompt,</div>
                      <div className="ml-12 text-slate-500 dark:text-slate-400">temperature=self.temperature,</div>
                      <div className="ml-12 text-slate-500 dark:text-slate-400">max_tokens=self.max_tokens</div>
                      <div className="ml-8 text-slate-500 dark:text-slate-400">)</div>
                      <div className="ml-8 text-slate-500 dark:text-slate-400">return process_response(response)</div>
                    </>
                  )}
                  
                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white dark:from-slate-900 to-transparent"></div>
                </div>
                
                {/* Floating particles with smoother animations */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(10)].map((_, i) => (
                    <div 
                      key={i}
                      className="absolute w-2 h-2 rounded-full bg-violet-400/30"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animation: `float ${2 + Math.random() * 3}s ease-in-out infinite alternate`,
                        animationDelay: `${i * 0.2}s`,
                        transition: 'all 0.5s ease-out'
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
