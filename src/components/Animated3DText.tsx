import { motion } from "motion/react";
import React from "react";

interface Animated3DTextProps {
  text: string;
  className?: string;
  hoverZ?: number;
  hoverRotate?: number;
}

export default function Animated3DText({
  text,
  className = "",
  hoverZ = 35,
  hoverRotate = 15,
}: Animated3DTextProps) {
  // Split words first to keep spacing perfect, then split letters
  const words = text.split(" ");

  return (
    <span 
      className={`inline-flex flex-wrap cursor-default select-none ${className}`}
      style={{ 
        perspective: "1000px",
        transformStyle: "preserve-3d"
      }}
    >
      {words.map((word, wordIndex) => (
        <span 
          key={wordIndex} 
          className="inline-flex mr-[0.3em] last:mr-0"
          style={{ transformStyle: "preserve-3d" }}
        >
          {word.split("").map((letter, letterIndex) => {
            // Give each letter a slightly different, organic spring behavior
            const randomDelay = (wordIndex * 3 + letterIndex) * 0.03;
            
            return (
              <motion.span
                key={letterIndex}
                className="inline-block relative origin-center"
                style={{ 
                  display: "inline-block",
                  transformStyle: "preserve-3d",
                }}
                initial={{ opacity: 0, y: 15, rotateX: -45, z: -30 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0, z: 0 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 140,
                  damping: 12,
                  delay: randomDelay,
                }}
                whileHover={{
                  z: hoverZ,
                  rotateX: [0, hoverRotate, -hoverRotate, 0],
                  rotateY: [0, -hoverRotate, hoverRotate, 0],
                  color: "var(--color-brand-primary, #3b82f6)",
                  transition: {
                    duration: 0.45,
                    ease: "easeOut",
                  }
                }}
              >
                {/* 3D text extrusion shadow underneath for extreme depth */}
                <span 
                  className="absolute inset-0 text-black/40 blur-[1px] select-none pointer-events-none"
                  style={{ 
                    transform: "translateZ(-8px) scale(0.95)",
                    content: `"${letter}"`
                  }}
                  aria-hidden="true"
                >
                  {letter}
                </span>

                {/* Main letter */}
                <span className="relative z-10">{letter}</span>
              </motion.span>
            );
          })}
        </span>
      ))}
    </span>
  );
}
