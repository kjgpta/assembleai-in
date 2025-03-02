
import React, { useState, useRef, useEffect } from "react";
import { MapPin, Mail, Phone, Send } from "lucide-react";
import AnimatedButton from "./ui/AnimatedButton";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const contactRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { toast } = useToast();
  
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [focused, setFocused] = useState({
    name: false,
    email: false,
    message: false,
  });

  const handleFocus = (field: keyof typeof focused) => {
    setFocused((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field: keyof typeof focused) => {
    if (!formState[field]) {
      setFocused((prev) => ({ ...prev, [field]: false }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent",
      description: "Thank you for contacting us. We'll get back to you soon!",
    });
    setFormState({ name: "", email: "", message: "" });
    setFocused({ name: false, email: false, message: false });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (contactRef.current) {
      observer.observe(contactRef.current);
    }

    return () => {
      if (contactRef.current) {
        observer.unobserve(contactRef.current);
      }
    };
  }, []);

  const contactInfo = [
    {
      icon: <Mail size={20} />,
      label: "Email",
      value: "mailguptakshitij@gmail.com",
    },
  ];

  return (
    <section id="contact" ref={contactRef} className="section-padding bg-gray-50">
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
            Got any questions and ideas? Let's talk!
          </h2>
        </div>

        <div className="flex justify-center items-center">
          {/* Apple-style contact card - centered on page */}
          <div 
            className={`transition-all duration-700 delay-300 max-w-md ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            style={{ width: '100%' }}
          >
            <div className="bg-gradient-to-br from-primary to-blue-600 text-white rounded-2xl shadow-lg p-8 md:p-10 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 backdrop-blur-sm">
              <div className="space-y-8">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-4 hover:-translate-y-1 transition-transform duration-300">
                    <div className="mt-1 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                      {info.icon}
                    </div>
                    <div>
                      <p className="text-white/70 text-sm">{info.label}</p>
                      <p className="font-medium">{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="absolute bottom-8 right-8 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
