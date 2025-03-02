
import React, { useState, useEffect } from "react";
import { Menu, X, Brain } from "lucide-react";
import AnimatedButton from "./ui/AnimatedButton";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Products", href: "#products" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-white/90 backdrop-blur-lg shadow-sm"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="inline-flex items-center gap-2">
            <span className="font-display font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-blue-400">
              Assemble AI
            </span>
          </a>
        </div>

        {/* Desktop Navigation - Centered */}
        <nav className="hidden md:flex items-center absolute left-1/2 transform -translate-x-1/2">
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium hover:text-primary transition-colors duration-200 animated-underline"
              >
                {link.name}
              </a>
            ))}
          </div>
        </nav>

        {/* AI Icon in the corner */}
        <div className="hidden md:flex items-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 flex items-center justify-center text-white animate-pulse-soft">
            <Brain size={20} />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-md focus:outline-none"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-x-0 top-[60px] bg-white/95 backdrop-blur-lg shadow-lg transition-all duration-300 ease-in-out z-40 ${
          menuOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        } overflow-hidden`}
      >
        <nav className="container mx-auto py-6 px-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="py-3 text-lg font-medium hover:text-primary transition-colors duration-200"
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
