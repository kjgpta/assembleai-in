
import React, { useRef, useEffect, useState } from "react";
import { Terminal, GitBranch, Database, Bot, Brain, Layers, Lock, Activity } from "lucide-react";

interface Feature {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
  color: string;
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
      title: "Neural Network Architecture",
      description: "Custom neural network architecture with advanced layer configurations and optimization strategies.",
      icon: <Brain size={24} />,
      tags: ["Python", "PyTorch", "Research"],
      color: "from-pink-500 to-rose-500"
    },
    {
      id: 2,
      title: "Training Pipeline",
      description: "End-to-end training pipeline with data preprocessing, augmentation, and validation procedures.",
      icon: <Layers size={24} />,
      tags: ["Python", "ML", "Pipeline"],
      color: "from-amber-500 to-orange-600"
    },
    {
      id: 3,
      title: "Inference API",
      description: "High-performance REST API for model inference with batching and caching capabilities.",
      icon: <Terminal size={24} />,
      tags: ["FastAPI", "API", "Deployment"],
      color: "from-cyan-500 to-blue-600"
    },
    {
      id: 4,
      title: "Data Collection System",
      description: "Automated data collection and preprocessing system for continuous model improvement.",
      icon: <Database size={24} />,
      tags: ["Data", "ETL", "Python"],
      color: "from-green-500 to-emerald-600"
    },
    {
      id: 5,
      title: "Experiment Tracking",
      description: "Comprehensive experiment tracking with parameter logging, metrics, and result visualization.",
      icon: <Activity size={24} />,
      tags: ["MLflow", "Research", "Monitoring"],
      color: "from-violet-500 to-purple-600"
    },
    {
      id: 6,
      title: "Model Versioning",
      description: "Robust versioning system for models, datasets, and code to ensure reproducibility.",
      icon: <GitBranch size={24} />,
      tags: ["DevOps", "Git", "CI/CD"],
      color: "from-slate-500 to-slate-700"
    },
    {
      id: 7,
      title: "Conversational Agent",
      description: "Interactive conversational agent built using advanced language models with context management.",
      icon: <Bot size={24} />,
      tags: ["NLP", "Python", "API"],
      color: "from-blue-500 to-indigo-600"
    },
    {
      id: 8,
      title: "Security Layer",
      description: "Comprehensive security implementation with encryption, authentication, and access controls.",
      icon: <Lock size={24} />,
      tags: ["Security", "DevOps", "API"],
      color: "from-red-500 to-red-700"
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
            Technical Capabilities
          </h2>
          <p 
            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
            style={{ 
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s',
            }}
          >
            Showcasing the core technical components of this machine learning system
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
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
              className="relative bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              style={{ 
                transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                opacity: isVisible ? 1 : 0,
                transition: `transform 0.8s ease-out ${0.4 + index * 0.1}s, opacity 0.8s ease-out ${0.4 + index * 0.1}s, box-shadow 0.3s ease-out`,
              }}
            >
              <div className={`h-2 bg-gradient-to-r ${feature.color}`}></div>
              <div className="p-6">
                <div className="flex items-start mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white bg-gradient-to-br ${feature.color}`}>
                    {feature.icon}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{feature.title}</h3>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {feature.tags.map(tag => (
                        <span 
                          key={tag} 
                          className="text-xs px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-slate-600 dark:text-slate-300">{feature.description}</p>
              </div>
              
              {/* Hover animation */}
              <div 
                className="absolute inset-0 bg-gradient-to-br pointer-events-none opacity-0 transition-opacity duration-300"
                style={{ 
                  opacity: hoveredItem === feature.id ? 0.05 : 0,
                  background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                  '--tw-gradient-from': feature.color.split(' ')[0].replace('from-', ''),
                  '--tw-gradient-to': feature.color.split(' ')[1].replace('to-', '')
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
