import { motion } from "motion/react";

export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#030303]">
      {/* Subtle Ambient Light */}
      <div className="absolute top-0 left-1/4 w-[50%] h-[50%] rounded-full bg-brand-primary/5 blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-[50%] h-[50%] rounded-full bg-brand-secondary/5 blur-[120px]" />
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            opacity: Math.random() * 0.3,
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%"
          }}
          animate={{
            y: [null, (Math.random() - 0.5) * 200 + "px"],
            opacity: [null, Math.random() * 0.5, Math.random() * 0.2]
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute w-1 h-1 bg-white rounded-full"
        />
      ))}
    </div>
  );
}
