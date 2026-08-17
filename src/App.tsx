/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Background from "./components/Background";
import PolicyModal from "./components/PolicyModal";
import ThreeDCursor from "./components/ThreeDCursor";
import { motion, useScroll, useSpring } from "motion/react";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Company from "./pages/Company";

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
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/company" element={<Company />} />
        <Route path="/about" element={<Company />} />
      </Routes>

      <Footer onOpenPolicy={(type) => setActivePolicy(type)} />

      {/* Policies Detail Overlay Modal */}
      <PolicyModal type={activePolicy} onClose={() => setActivePolicy(null)} />
    </div>
  );
}
