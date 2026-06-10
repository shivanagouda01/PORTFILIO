/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Certificates from "./components/Certificates";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Background from "./components/Background";
import PolicyModal from "./components/PolicyModal";
import ThreeDCursor from "./components/ThreeDCursor";
import { motion, useScroll, useSpring } from "motion/react";
import { useState } from "react";

export default function App() {
  const [activePolicy, setActivePolicy] = useState<"privacy" | "terms" | null>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative">
      <Background />
      <ThreeDCursor />
      
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand-primary z-[60] origin-left"
        style={{ scaleX }}
      />

      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certificates />
        <Education />
        <Contact />
      </main>

      <Footer onOpenPolicy={(type) => setActivePolicy(type)} />

      {/* Policies Detail Overlay Modal */}
      <PolicyModal type={activePolicy} onClose={() => setActivePolicy(null)} />
    </div>
  );
}
