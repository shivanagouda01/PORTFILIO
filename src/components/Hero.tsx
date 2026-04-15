import { motion } from "motion/react";
import { ArrowRight, ChevronDown, Mail, Github, Linkedin } from "lucide-react";
import { useState, useEffect } from "react";

const roles = ["Web Developer", "Startup Builder", "Problem Solver"];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="max-w-7xl w-full grid md:grid-cols-2 gap-12 items-center">
        {/* Profile Image - Left Side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative order-2 md:order-1 flex justify-center"
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80 group">
            <div className="absolute inset-0 bg-brand-primary/20 blur-[60px] rounded-full group-hover:bg-brand-primary/30 transition-colors duration-700" />
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full h-full rounded-3xl overflow-hidden border border-white/10 glass shadow-2xl"
            >
              <img
                src="https://lh3.googleusercontent.com/d/1HVLiBV8sWqgJTyOeuUu5XrwKVafUcr8I"
                alt="Shivanagouda Patil"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-out scale-105 hover:scale-100"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Text Content - Right Side */}
        <div className="order-1 md:order-2 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block px-4 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-[10px] font-bold uppercase tracking-widest mb-8 border border-brand-primary/20"
          >
            Founder of Webnixo
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-6 leading-[1.1]"
          >
            Shivanagouda <br /> <span className="text-brand-primary">Patil</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl text-white/80 font-medium mb-8"
          >
            Web Developer | Founder of Webnixo
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg text-white/50 mb-12 max-w-lg mx-auto md:mx-0 leading-relaxed"
          >
            I am a Computer Science (AI & ML) student and founder of Webnixo. I build modern, fast, and user-friendly websites for businesses and startups.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center gap-6 justify-center md:justify-start"
          >
            <a
              href="https://webnixo.in"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-5 rounded-xl bg-brand-primary text-white font-bold hover:bg-brand-primary/90 transition-all w-full sm:w-auto text-center shadow-lg shadow-brand-primary/20 hover:shadow-brand-primary/40 hover:-translate-y-1 active:translate-y-0"
            >
              Visit Webnixo
            </a>
            <a
              href="#projects"
              className="px-10 py-5 rounded-xl glass border border-white/10 font-bold hover:bg-white/5 transition-all w-full sm:w-auto text-center hover:-translate-y-1 active:translate-y-0"
            >
              View Portfolio
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
