
import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
}

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
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

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "CTO",
      company: "TechVision Inc.",
      content: "The GPT tools have completely transformed our customer service operations. We've seen a 40% reduction in response time and our satisfaction scores have never been higher.",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Data Science Lead",
      company: "Innovate AI",
      content: "We've integrated these ML tools into our data analysis pipeline and the results have been phenomenal. The accuracy of our predictions has improved by nearly 30%.",
      avatar: "https://randomuser.me/api/portraits/men/46.jpg",
      rating: 5,
    },
    {
      id: 3,
      name: "Emma Williams",
      role: "VP of Product",
      company: "FutureTech",
      content: "These tools have simplified our development process significantly. What used to take weeks now takes days, allowing us to iterate faster and stay ahead of the competition.",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      rating: 4,
    },
  ];

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <section 
      id="testimonials" 
      ref={containerRef}
      className="section-padding bg-blue-50"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 animated-element">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            What Our Clients Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from companies that have transformed their businesses using our AI and machine learning tools.
          </p>
        </div>

        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="relative mx-auto max-w-4xl">
            <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
              <div 
                className="transition-all duration-500 ease-in-out"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                <div className="flex">
                  {testimonials.map((testimonial) => (
                    <div 
                      key={testimonial.id}
                      className="w-full flex-shrink-0 p-8 md:p-12"
                    >
                      <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">
                        <div className="flex-shrink-0">
                          <div className="relative">
                            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-blue-100">
                              <img 
                                src={testimonial.avatar} 
                                alt={testimonial.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="absolute -bottom-2 -right-2 bg-primary text-white rounded-full p-1">
                              <Star size={12} fill="white" />
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex mb-3">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i}
                                size={16} 
                                className={i < testimonial.rating ? "text-amber-400 fill-amber-400" : "text-gray-300"} 
                              />
                            ))}
                          </div>
                          
                          <blockquote className="text-lg md:text-xl mb-6 italic text-gray-800">
                            "{testimonial.content}"
                          </blockquote>
                          
                          <div>
                            <p className="font-semibold">{testimonial.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {testimonial.role}, {testimonial.company}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="absolute top-1/2 -translate-y-1/2 left-4 md:-left-4">
              <button 
                onClick={prevTestimonial}
                className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </button>
            </div>
            
            <div className="absolute top-1/2 -translate-y-1/2 right-4 md:-right-4">
              <button 
                onClick={nextTestimonial}
                className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} />
              </button>
            </div>
            
            <div className="mt-6 flex justify-center gap-2">
              {testimonials.map((_, index) => (
                <button 
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === activeIndex 
                      ? "bg-primary w-6" 
                      : "bg-gray-300"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
