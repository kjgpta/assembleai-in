
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
      icon: <MapPin size={20} />,
      label: "Address",
      value: "123 Innovation Way, Tech Valley, CA 94103",
    },
    {
      icon: <Mail size={20} />,
      label: "Email",
      value: "contact@gptastic.com",
    },
    {
      icon: <Phone size={20} />,
      label: "Phone",
      value: "+1 (555) 123-4567",
    },
  ];

  return (
    <section id="contact" ref={contactRef} className="section-padding bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 animated-element">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600 animate-fade-up">
            Contact Us
          </h2>
          <div className="w-24 h-1 mx-auto bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-6 animate-scale-in"></div>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto animate-fade-in">
            Have questions about our AI tools or interested in a custom solution? Contact us today.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 hover:shadow-xl transition-all duration-500">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Send Us a Message</h3>
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div className="relative">
                    <label 
                      htmlFor="name"
                      className={`absolute left-3 transition-all duration-200 ${
                        focused.name ? 'text-xs -top-2 text-primary z-10 bg-white px-1' : 'text-muted-foreground top-3'
                      }`}
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      onFocus={() => handleFocus('name')}
                      onBlur={() => handleBlur('name')}
                      required
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                    />
                  </div>
                  
                  <div className="relative">
                    <label 
                      htmlFor="email"
                      className={`absolute left-3 transition-all duration-200 ${
                        focused.email ? 'text-xs -top-2 text-primary z-10 bg-white px-1' : 'text-muted-foreground top-3'
                      }`}
                    >
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      onFocus={() => handleFocus('email')}
                      onBlur={() => handleBlur('email')}
                      required
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                    />
                  </div>
                  
                  <div className="relative">
                    <label 
                      htmlFor="message"
                      className={`absolute left-3 transition-all duration-200 ${
                        focused.message ? 'text-xs -top-2 text-primary z-10 bg-white px-1' : 'text-muted-foreground top-3'
                      }`}
                    >
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      onFocus={() => handleFocus('message')}
                      onBlur={() => handleBlur('message')}
                      required
                      rows={5}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none resize-none"
                    />
                  </div>
                  
                  <div>
                    <AnimatedButton 
                      type="submit" 
                      variant="primary" 
                      className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition-all duration-300"
                    >
                      Send Message
                      <Send size={16} className="ml-2" />
                    </AnimatedButton>
                  </div>
                </div>
              </form>
            </div>
          </div>
          
          <div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="bg-gradient-to-br from-primary to-blue-600 text-white rounded-2xl shadow-lg p-8 md:p-10 h-full hover:shadow-xl hover:shadow-primary/10 transition-all duration-500">
              <h3 className="text-2xl font-bold mb-8">Contact Information</h3>
              
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
              
              <div className="mt-12">
                <h4 className="text-lg font-semibold mb-4">Office Hours</h4>
                <p className="mb-2">Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday - Sunday: Closed</p>
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
