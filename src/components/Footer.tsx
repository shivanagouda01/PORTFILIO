import { motion } from "motion/react";

interface FooterProps {
  onOpenPolicy: (type: "privacy" | "terms") => void;
}

export default function Footer({ onOpenPolicy }: FooterProps) {
  return (
    <footer className="py-12 px-6 border-t border-white/5">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8"
      >
        <div className="flex items-center gap-3">
          <img
            src="https://lh3.googleusercontent.com/d/1ih-ub465tBjOwVP2JIe7T21zPhZGk4FP"
            alt="Shivanagouda Patil"
            className="w-10 h-10 rounded-xl object-cover shadow-lg shadow-brand-primary/20 border border-white/10"
          />
          <div className="text-xl font-display font-bold tracking-tight">
            Shivanagouda Patil
          </div>
        </div>

        <div className="text-white/40 text-sm font-mono">
          &copy; {new Date().getFullYear()} Shivanagouda Patil. All rights reserved.
        </div>

        <div className="flex items-center gap-8">
          <button 
            type="button"
            onClick={() => onOpenPolicy("privacy")}
            className="text-sm text-white/40 hover:text-white transition-colors cursor-pointer"
          >
            Privacy Policy
          </button>
          <button 
            type="button"
            onClick={() => onOpenPolicy("terms")}
            className="text-sm text-white/40 hover:text-white transition-colors cursor-pointer"
          >
            Terms of Service
          </button>
        </div>
      </motion.div>
    </footer>
  );
}
