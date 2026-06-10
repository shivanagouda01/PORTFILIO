import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect } from "react";

export default function Background() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs to avoid jittery jumps
  const springX = useSpring(mouseX, { stiffness: 45, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 45, damping: 22 });

  // Map to distinct parallax speeds
  const gridX = useTransform(springX, (val) => val * 0.4);
  const gridY = useTransform(springY, (val) => val * 0.4);

  const glow1X = useTransform(springX, (val) => val * 0.85);
  const glow1Y = useTransform(springY, (val) => val * 0.85);

  const glow2X = useTransform(springX, (val) => val * -0.6);
  const glow2Y = useTransform(springY, (val) => val * -0.6);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Offset values representing px drift from center
      const x = (e.clientX / window.innerWidth - 0.5) * 60;
      const y = (e.clientY / window.innerHeight - 0.5) * 60;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#030303] select-none pointer-events-none">
      {/* Subtle Ambient Light (Foreground/Background opposites) */}
      <motion.div 
        style={{ x: glow1X, y: glow1Y }}
        className="absolute top-0 left-1/4 w-[50%] h-[50%] rounded-full bg-brand-primary/5 blur-[120px] pointer-events-none" 
      />
      <motion.div 
        style={{ x: glow2X, y: glow2Y }}
        className="absolute bottom-0 right-1/4 w-[50%] h-[50%] rounded-full bg-brand-secondary/5 blur-[120px] pointer-events-none" 
      />
      
      {/* Grid Pattern with slower parallax rate */}
      <motion.div 
        className="absolute inset-[-10%] opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
          x: gridX,
          y: gridY
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
          className="absolute w-1 h-1 bg-white rounded-full opacity-30 pointer-events-none"
        />
      ))}
    </div>
  );
}
