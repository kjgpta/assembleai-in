
import React from "react";
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import Products from "../components/Products";
import About from "../components/About";
import Contact from "../components/Contact";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <Products />
      <About />
      <Contact />
    </Layout>
  );
};

export default Index;
