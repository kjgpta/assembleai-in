
import React from "react";
import { ArrowUpRight } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: "Products",
      links: [
        { label: "GPT Text Generation", href: "#" },
        { label: "Code Analysis", href: "#" },
        { label: "Data Processing", href: "#" },
        { label: "Conversational AI", href: "#" },
      ],
    },
    {
      title: "Contact",
      links: [
        { label: "Support", href: "#" },
        { label: "Sales", href: "#" },
        { label: "Partnership", href: "#" },
        { label: "Feedback", href: "#" },
      ],
    },
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto max-w-6xl px-4 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-1">
            <div className="mb-6">
              <a href="/" className="inline-flex items-center gap-2">
                <span className="font-display font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-blue-500">
                  GPTastic
                </span>
              </a>
            </div>
            
            <p className="text-muted-foreground mb-6 max-w-md">
              Empowering businesses with cutting-edge GPT and machine learning tools to drive innovation and solve complex problems.
            </p>
            
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center hover:bg-violet-200 transition-colors text-violet-700">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              
              <a href="#" className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center hover:bg-violet-200 transition-colors text-violet-700">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              
              <a href="#" className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center hover:bg-violet-200 transition-colors text-violet-700">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              
              <a href="#" className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center hover:bg-violet-200 transition-colors text-violet-700">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>
          
          {footerLinks.map((column, idx) => (
            <div key={idx}>
              <h4 className="font-semibold mb-4 text-violet-800">{column.title}</h4>
              <ul className="space-y-3">
                {column.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <a 
                      href={link.href}
                      className="text-muted-foreground hover:text-violet-700 transition-colors inline-flex items-center group"
                    >
                      {link.label}
                      <ArrowUpRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="pt-8 border-t">
          <div className="flex justify-center items-center">
            <p className="text-sm text-muted-foreground">
              © {currentYear} GPTastic. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
