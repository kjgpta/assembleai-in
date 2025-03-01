
import React, { useEffect } from "react";
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import Products from "../components/Products";
import About from "../components/About";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";

const Index = () => {
  useEffect(() => {
    // Helper function to handle parallax scrolling
    const handleParallax = () => {
      const layers = document.querySelectorAll('.parallax-layer');
      
      layers.forEach(layer => {
        const speed = parseFloat(layer.getAttribute('data-speed') || '0.1');
        const yPos = window.scrollY * speed;
        (layer as HTMLElement).style.transform = `translateY(${yPos}px)`;
      });
    };
    
    // Helper function for scroll animations
    const handleScrollAnimations = () => {
      const elements = document.querySelectorAll('.reveal-on-scroll');
      
      elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('revealed');
        }
      });
    };
    
    // Add event listeners
    window.addEventListener('scroll', handleParallax);
    window.addEventListener('scroll', handleScrollAnimations);
    
    // Initial check for elements in view
    handleScrollAnimations();
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleParallax);
      window.removeEventListener('scroll', handleScrollAnimations);
    };
  }, []);

  return (
    <Layout>
      <Hero />
      <Products />
      <About />
      <Testimonials />
      <Contact />
    </Layout>
  );
};

export default Index;
