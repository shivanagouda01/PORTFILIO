import { motion, useMotionValue, useTransform, useSpring } from "motion/react";
import React, { useRef } from "react";

interface ThreeDTiltProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export default function ThreeDTilt({ children, className = "", intensity = 15 }: ThreeDTiltProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Capture position relative to card boundaries
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Create smooth springs for rotations
  const springX = useSpring(x, { stiffness: 200, damping: 25 });
  const springY = useSpring(y, { stiffness: 200, damping: 25 });

  // Map ranges to 3D rotation degrees
  const rotateX = useTransform(springY, [-0.5, 0.5], [intensity, -intensity]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-intensity, intensity]);

  // Create high-contrast light glare/shine effect
  const glareX = useTransform(springX, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(springY, [-0.5, 0.5], ["0%", "100%"]);
  const glareOpacity = useTransform(
    useSpring(useTransform(springX, (val) => Math.abs(val) * 2), { stiffness: 200, damping: 25 }),
    [0, 1],
    [0.1, 0.4]
  );

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Map pointer position to delta [-0.5, 0.5] from element center
    const relativeX = (e.clientX - rect.left) / width - 0.5;
    const relativeY = (e.clientY - rect.top) / height - 0.5;

    x.set(relativeX);
    y.set(relativeY);
  };

  const handlePointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: "1200px",
      }}
      className={`relative transition-shadow duration-300 ${className}`}
    >
      {/* Glare/Shine overlay layer */}
      <motion.div
        style={{
          background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 80%)`,
          opacity: glareOpacity,
          transform: "translateZ(1px)",
        }}
        className="absolute inset-0 pointer-events-none z-10 rounded-inherit"
      />
      
      {/* Target Content under 3D Preserve context */}
      <div style={{ transform: "translateZ(0px)", transformStyle: "preserve-3d" }} className="w-full h-full">
        {children}
      </div>
    </motion.div>
  );
}
