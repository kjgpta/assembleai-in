
import React, { useRef, useEffect, useState } from "react";
import { ArrowRight, Code, BrainCircuit, Database, Bot } from "lucide-react";
import AnimatedCard from "./ui/AnimatedCard";
import AnimatedButton from "./ui/AnimatedButton";

interface Product {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const Products = () => {
  const productRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (productRef.current) {
      observer.observe(productRef.current);
    }

    return () => {
      if (productRef.current) {
        observer.unobserve(productRef.current);
      }
    };
  }, []);

  const products: Product[] = [
    {
      id: 1,
      title: "GPT Text Generation",
      description: "Create human-like text for various applications including content creation, chatbots, and more.",
      icon: <BrainCircuit size={32} className="text-primary" />,
    },
    {
      id: 2,
      title: "Code Analysis",
      description: "Automatically analyze and optimize your codebase with our AI-powered code analysis tools.",
      icon: <Code size={32} className="text-primary" />,
    },
    {
      id: 3,
      title: "Data Processing",
      description: "Process and analyze large datasets with ML algorithms designed for efficiency and accuracy.",
      icon: <Database size={32} className="text-primary" />,
    },
    {
      id: 4,
      title: "Conversational AI",
      description: "Build sophisticated chatbots and virtual assistants with our conversational AI platform.",
      icon: <Bot size={32} className="text-primary" />,
    },
  ];

  return (
    <section id="products" ref={productRef} className="section-padding bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animated-element">
            Our AI-Powered Products
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animated-element delay-200">
            Discover our suite of advanced tools designed to revolutionize the way you work with artificial intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {products.map((product, index) => (
            <AnimatedCard
              key={product.id}
              className="bg-white p-6 h-full"
              revealOnScroll={true}
              delay={index * 200}
            >
              <div className="flex flex-col h-full">
                <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-blue-50 mb-6">
                  {product.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{product.title}</h3>
                <p className="text-muted-foreground mb-6">{product.description}</p>
                <div className="mt-auto pt-4">
                  <a
                    href="#"
                    className="inline-flex items-center text-primary font-medium group"
                  >
                    Learn more
                    <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>

        <div className="text-center animated-element delay-600">
          <AnimatedButton variant="primary" size="lg">
            View All Products
          </AnimatedButton>
        </div>
      </div>
    </section>
  );
};

export default Products;
