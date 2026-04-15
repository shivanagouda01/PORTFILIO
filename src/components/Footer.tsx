import { motion } from "motion/react";

export default function Footer() {
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
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center text-white font-bold">
            SP
          </div>
          <div className="text-xl font-display font-bold tracking-tight">
            Shivanagouda Patil
          </div>
        </div>

        <div className="text-white/40 text-sm font-mono">
          &copy; {new Date().getFullYear()} Shivanagouda Patil. All rights reserved.
        </div>

        <div className="flex items-center gap-8">
          <a href="#" className="text-sm text-white/40 hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="text-sm text-white/40 hover:text-white transition-colors">Terms of Service</a>
        </div>
      </motion.div>
    </footer>
  );
}
