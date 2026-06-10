import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useState, useRef } from "react";

export default function ThreeDCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [magneticTarget, setMagneticTarget] = useState<HTMLElement | null>(null);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  // Keep track of the last client position for scrolled updates
  const lastXRef = useRef(0);
  const lastYRef = useRef(0);

  // Position of the lead mouse dot
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Position of the outer ring target (snaps/attracts to elements)
  const ringTargetX = useMotionValue(0);
  const ringTargetY = useMotionValue(0);

  // Smooth springs for fluid, slightly lagging track
  const springX = useSpring(mouseX, { stiffness: 220, damping: 28 });
  const springY = useSpring(mouseY, { stiffness: 220, damping: 28 });

  // Spring coordinates for outer ring with heavier dampening for cool lagging effect
  const ringX = useSpring(ringTargetX, { stiffness: 140, damping: 20 });
  const ringY = useSpring(ringTargetY, { stiffness: 140, damping: 20 });

  // Size and shape properties of the outer ring
  const [ringProps, setRingProps] = useState({
    width: 48,
    height: 48,
    borderRadius: "9999px",
  });

  // Velocity values to calculate 3D rotation based on mouse speed
  const velX = useMotionValue(0);
  const velY = useMotionValue(0);

  // 3D rotation mappings based on mouse velocities
  const springVelX = useSpring(velX, { stiffness: 150, damping: 20 });
  const springVelY = useSpring(velY, { stiffness: 150, damping: 20 });

  // Distort & rot 3D according to speeds
  const rotateX = useTransform(springVelY, [-30, 30], [-35, 35]);
  const rotateY = useTransform(springVelX, [-30, 30], [35, -35]);
  const skewX = useTransform(springVelX, [-30, 30], [-10, 10]);

  useEffect(() => {
    let lastTime = Date.now();

    const updateCoordinates = (clientX: number, clientY: number, targetEl: HTMLElement | null) => {
      lastXRef.current = clientX;
      lastYRef.current = clientY;
      setIsVisible(true);

      const clickable = targetEl ? (
        targetEl.closest("a") || 
        targetEl.closest("button") || 
        targetEl.closest(".cursor-pointer") || 
        targetEl.tagName === "INPUT" || 
        targetEl.tagName === "TEXTAREA"
      ) as HTMLElement | null : null;

      if (clickable) {
        setIsHovered(true);
        setMagneticTarget(clickable);
        const rect = clickable.getBoundingClientRect();
        
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Attraction: the real mouse/dot is slightly drawn toward center as well (20% attraction)
        const dx = clientX - centerX;
        const dy = clientY - centerY;
        
        mouseX.set(clientX - dx * 0.2);
        mouseY.set(clientY - dy * 0.2);
        
        // Outer ring magnetically snaps to center plus a tiny 10% lean towards real position for feedback
        ringTargetX.set(centerX + dx * 0.1);
        ringTargetY.set(centerY + dy * 0.1);

        const computedStyling = window.getComputedStyle(clickable);
        const bRadius = computedStyling.borderRadius;
        
        // Hug the item, slightly larger with some padding
        setRingProps({
          width: rect.width + 12,
          height: rect.height + 12,
          borderRadius: bRadius && bRadius !== "0px" ? bRadius : "12px",
        });
      } else {
        setIsHovered(false);
        setMagneticTarget(null);
        
        mouseX.set(clientX);
        mouseY.set(clientY);
        
        ringTargetX.set(clientX);
        ringTargetY.set(clientY);

        setRingProps({
          width: 48,
          height: 48,
          borderRadius: "9999px",
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      const dt = now - lastTime;
      if (dt > 10) {
        const dx = e.clientX - lastXRef.current;
        const dy = e.clientY - lastYRef.current;
        // Clamp velocities to prevent endless extreme warping
        const vx = Math.max(Math.min((dx / dt) * 10, 30), -30);
        const vy = Math.max(Math.min((dy / dt) * 10, 30), -30);

        velX.set(vx);
        velY.set(vy);
        lastTime = now;
      }

      updateCoordinates(e.clientX, e.clientY, e.target as HTMLElement | null);
    };

    const handleScroll = () => {
      // If we currently have a magnetic target, keep snapping smoothly
      if (magneticTarget) {
        updateCoordinates(lastXRef.current, lastYRef.current, magneticTarget);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseDown = () => {
      setIsClicked(true);
      const newRipple = {
        id: Date.now() + Math.random(),
        x: lastXRef.current,
        y: lastYRef.current,
      };
      setRipples((prev) => [...prev, newRipple]);
    };
    const handleMouseUp = () => setIsClicked(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [mouseX, mouseY, ringTargetX, ringTargetY, velX, velY, magneticTarget]);

  // Hide on mobile or touch-only devices
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  useEffect(() => {
    const checkTouch = () => {
      // Check if the primary input is a fine precision cursor (mouse/stylus).
      // This prevents false positives on touchscreen laptops/Chromebooks.
      const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
      setIsTouchDevice(!hasFinePointer);
    };
    checkTouch();
    
    // Listen to changes (e.g. if plug/unplug or screen orientation changes)
    const mediaQuery = window.matchMedia("(pointer: fine)");
    const handler = (e: MediaQueryListEvent) => setIsTouchDevice(!e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Dynamically toggle body class so cursor is hidden only when custom cursor is active
  useEffect(() => {
    if (isVisible && !isTouchDevice) {
      document.documentElement.classList.add("has-custom-cursor");
    } else {
      document.documentElement.classList.remove("has-custom-cursor");
    }
    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [isVisible, isTouchDevice]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] select-none">
      {/* Click Animations / Expanding Rings */}
      {ripples.map((ripple) => (
        <div key={ripple.id}>
          {/* Main fast expanding glow ring */}
          <motion.div
            style={{
              left: ripple.x,
              top: ripple.y,
              translateX: "-50%",
              translateY: "-50%",
            }}
            className="absolute rounded-full border border-brand-primary pointer-events-none z-[9998] shadow-[0_0_15px_rgba(59,130,246,0.5)]"
            initial={{ width: 12, height: 12, scale: 0.4, opacity: 1 }}
            animate={{ width: 80, height: 80, scale: 2.4, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            onAnimationComplete={() => {
              setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
            }}
          />
          {/* Subtle slow secondary echo ring */}
          <motion.div
            style={{
              left: ripple.x,
              top: ripple.y,
              translateX: "-50%",
              translateY: "-50%",
            }}
            className="absolute rounded-full border border-white/30 pointer-events-none z-[9998]"
            initial={{ width: 8, height: 8, scale: 0.5, opacity: 0.8 }}
            animate={{ width: 64, height: 64, scale: 1.8, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.04 }}
          />
        </div>
      ))}

      {/* Outer 3D Holographic Pointer Ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          rotateX,
          rotateY,
          skewX,
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
        className="absolute border border-brand-primary/40 flex items-center justify-center"
        animate={{
          width: ringProps.width,
          height: ringProps.height,
          borderRadius: ringProps.borderRadius,
          scale: isClicked ? 0.88 : 1,
          backgroundColor: isHovered ? "rgba(59, 130, 246, 0.12)" : "rgba(255, 255, 255, 0)",
          borderColor: isHovered ? "rgba(59, 130, 246, 0.9)" : "rgba(59, 130, 246, 0.45)",
        }}
        transition={{
          type: "spring",
          stiffness: 180,
          damping: 22,
          mass: 0.8,
        }}
      >
        {/* Holographic glowing background ring inside the 3D cell */}
        <div 
          className="absolute inset-[10%] rounded-full border border-brand-secondary/30 border-dashed animate-spin"
          style={{ 
            animationDuration: isHovered ? "2s" : "8s",
            transform: "translateZ(8px)",
          }}
        />

        {/* 3D secondary outer accent ticks */}
        {isHovered && (
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute -inset-1.5 rounded-full border border-white/20 select-none pb-0"
            style={{ 
              transform: "translateZ(-4px)",
              borderRadius: ringProps.borderRadius,
            }}
          />
        )}
      </motion.div>

      {/* Inner Solid Tech Dot */}
      <motion.div
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="absolute w-2 h-2 rounded-full bg-white shadow-lg mix-blend-difference"
        animate={{
          scale: isClicked ? 1.4 : isHovered ? 0.3 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
    </div>
  );
}
