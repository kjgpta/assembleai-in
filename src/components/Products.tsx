import React, { useRef, useEffect, useState } from "react";
import { ChefHat, FileText, Filter, Code, PenSquare, Search, Pizza, Filter as FilterIcon, Briefcase } from "lucide-react";

interface Feature {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
  color: string;
  demoUrl?: string;
  codeUrl?: string;
}

const Products = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const features: Feature[] = [
    {
      id: 1,
      title: "AI Recipe Maker",
      description: "Create custom recipes based on available ingredients, cuisine preferences, nutritional goals, and dietary restrictions using advanced GPT models.",
      icon: <ChefHat size={24} />,
      tags: ["GPT", "Food", "Personalization"],
      color: "from-green-500 to-emerald-600",
      demoUrl: "/recipe-demo",
      codeUrl: "https://github.com/yourname/recipe-maker"
    },
    {
      id: 2,
      title: "Resume Parser",
      description: "AI-powered resume analysis tool that helps recruiters parse CVs, extract key information, and generate additional screening questions.",
      icon: <FileText size={24} />,
      tags: ["GPT", "HR", "Recruitment"],
      color: "from-blue-500 to-indigo-600",
      demoUrl: "/resume-demo",
      codeUrl: "https://github.com/yourname/resume-parser"
    }
  ];

  const allTags = Array.from(new Set(features.flatMap(feature => feature.tags))).sort();

  const toggleFilter = (tag: string) => {
    setActiveFilters(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  const filteredFeatures = activeFilters.length === 0 
    ? features 
    : features.filter(feature => 
        feature.tags.some(tag => activeFilters.includes(tag))
      );

  return (
    <section id="features" ref={sectionRef} className="py-24 px-4 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 
            className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300"
            style={{ 
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
            }}
          >
            AI Projects
          </h2>
          <p 
            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
            style={{ 
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s',
            }}
          >
            Experimental applications using advanced GPT models
          </p>
        </div>

        {/* Filter tags */}
        <div 
          className="flex flex-wrap gap-2 justify-center mb-12"
          style={{ 
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease-out 0.3s, transform 0.8s ease-out 0.3s',
          }}
        >
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleFilter(tag)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilters.includes(tag)
                  ? 'bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200 ring-2 ring-violet-500/20'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              {tag}
            </button>
          ))}
          {activeFilters.length > 0 && (
            <button
              onClick={() => setActiveFilters([])}
              className="px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-200 dark:hover:bg-red-800/30 transition-all duration-300"
            >
              Clear filters
            </button>
          )}
        </div>

        <div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          style={{ 
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.8s ease-out 0.4s',
          }}
        >
          {filteredFeatures.map((feature, index) => (
            <div
              key={feature.id}
              onMouseEnter={() => setHoveredItem(feature.id)}
              onMouseLeave={() => setHoveredItem(null)}
              className="relative bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500"
              style={{ 
                transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                opacity: isVisible ? 1 : 0,
                transition: `transform 0.8s ease-out ${0.4 + index * 0.1}s, opacity 0.8s ease-out ${0.4 + index * 0.1}s, box-shadow 0.5s ease-out`,
              }}
            >
              <div className={`h-2 bg-gradient-to-r ${feature.color}`}></div>
              <div className="p-8">
                <div className="flex items-start mb-6">
                  <div className={`w-14 h-14 rounded-lg flex items-center justify-center text-white bg-gradient-to-br ${feature.color}`}>
                    {feature.icon}
                  </div>
                  <div className="ml-5">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {feature.tags.map(tag => (
                        <span 
                          key={tag} 
                          className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <p className="text-slate-600 dark:text-slate-300 mb-8">{feature.description}</p>
                
                <div className="flex gap-4">
                  <a 
                    href={feature.demoUrl} 
                    className="group flex items-center px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-500 hover:from-violet-700 hover:to-indigo-600 text-white rounded-md transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    <PenSquare size={18} className="mr-2 transition-transform group-hover:scale-110" />
                    <span className="group-hover:translate-x-0.5 transition-transform">View Demo</span>
                  </a>
                  
                  <a 
                    href={feature.codeUrl} 
                    className="group flex items-center px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600 rounded-md transition-all duration-300"
                  >
                    <Code size={18} className="mr-2 transition-transform group-hover:rotate-12" />
                    <span>Source Code</span>
                  </a>
                </div>
              </div>
              
              {/* Hover animation */}
              <div 
                className={`absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-500 bg-gradient-to-br ${feature.color}`}
                style={{ 
                  opacity: hoveredItem === feature.id ? 0.05 : 0,
                }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
