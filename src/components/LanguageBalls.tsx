import { useEffect, useRef } from "react";
import Matter from "matter-js";

const languageData = [
  { name: "C", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg" },
  { name: "C++", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" },
  { name: "HTML5", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
  { name: "CSS3", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
  { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
  { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
];

export default function LanguageBalls() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef(Matter.Engine.create());
  const runnerRef = useRef<Matter.Runner | null>(null);
  const ballRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sceneRef.current) return;
    
    const container = sceneRef.current;
    const engine = engineRef.current;
    const world = engine.world;
    
    // Disable gravity to make the balls freely floating
    engine.gravity.y = 0;
    engine.gravity.x = 0;
    
    // Clear the world in case of re-renders
    Matter.World.clear(world, false);
    Matter.Engine.clear(engine);

    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);
    runnerRef.current = runner;

    let currentWidth = container.clientWidth;
    let currentHeight = container.clientHeight;

    // Create boundaries
    const wallOptions = { 
      isStatic: true, 
      render: { visible: false },
      friction: 0,
      restitution: 1
    };
    
    const ground = Matter.Bodies.rectangle(currentWidth / 2, currentHeight + 50, currentWidth * 2, 100, wallOptions);
    const leftWall = Matter.Bodies.rectangle(-50, currentHeight / 2, 100, currentHeight * 2, wallOptions);
    const rightWall = Matter.Bodies.rectangle(currentWidth + 50, currentHeight / 2, 100, currentHeight * 2, wallOptions);
    const ceiling = Matter.Bodies.rectangle(currentWidth / 2, -50, currentWidth * 2, 100, wallOptions);

    Matter.World.add(world, [ground, leftWall, rightWall, ceiling]);

    // Calculate dynamic ball size based on container width
    const minRadius = 35;
    const maxRadius = 55;
    const calculatedRadius = Math.max(minRadius, Math.min(currentWidth * 0.1, maxRadius));
    const ballRadius = calculatedRadius; // Used for physics and DOM

    const cols = currentWidth > 500 ? 3 : 2;
    const rows = Math.ceil(languageData.length / cols);
    const spacingX = ballRadius * 2.5;
    const spacingY = ballRadius * 2.5;
    const startX = currentWidth / 2 - ((cols - 1) * spacingX) / 2;
    const startY = currentHeight / 2 - ((rows - 1) * spacingY) / 2;

    // Create balls
    const bodies = languageData.map((_, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = startX + col * spacingX;
      const y = startY + row * spacingY;
      
      const body = Matter.Bodies.circle(x, y, ballRadius, {
        restitution: 1, // Perfect bounce
        friction: 0,
        frictionAir: 0,
        density: 0.05,
        render: { visible: false }
      });
      
      return body;
    });

    Matter.World.add(world, bodies);

    // Setup mouse interaction
    const mouse = Matter.Mouse.create(container);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    });

    Matter.World.add(world, mouseConstraint);

    // --- State Management for Resetting ---
    let mode: "floating" | "resetting" = "resetting";
    let idleTimer: ReturnType<typeof setTimeout>;

    const startIdleTimer = () => {
      clearTimeout(idleTimer);
      
      // After some time of floating/idling, line them up
      idleTimer = setTimeout(() => {
        mode = "resetting";
      }, 4000);
    };

    startIdleTimer();

    // Reset timers on interaction
    Matter.Events.on(mouseConstraint, "startdrag", () => {
      if (mode === "resetting") mode = "floating";
      startIdleTimer();
    });
    Matter.Events.on(mouseConstraint, "enddrag", () => {
      startIdleTimer();
    });

    // Hover repulsion effect
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      bodies.forEach((body) => {
        const dx = body.position.x - mouseX;
        const dy = body.position.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Repel distance
        if (dist < ballRadius + 40) {
          if (mode === "resetting") {
            mode = "floating";
            startIdleTimer();
          }
          
          // Add velocity pushing away from mouse
          Matter.Body.setVelocity(body, {
            x: body.velocity.x + (dx / dist) * 0.8,
            y: body.velocity.y + (dy / dist) * 0.8
          });
        }
      });
    };

    container.addEventListener("mousemove", handleMouseMove);

    // Sync DOM positions with physics engine
    let animationFrameId: number;
    const updateDOM = () => {
      
      if (mode === "resetting") {
        const cols = currentWidth > 500 ? 3 : 2;
        const rows = Math.ceil(languageData.length / cols);
        const spacingX = ballRadius * 2.5;
        const spacingY = ballRadius * 2.5;

        const startX = currentWidth / 2 - ((cols - 1) * spacingX) / 2;
        const startY = currentHeight / 2 - ((rows - 1) * spacingY) / 2;

        bodies.forEach((body, i) => {
          const col = i % cols;
          const row = Math.floor(i / cols);
          const targetX = startX + col * spacingX;
          const targetY = startY + row * spacingY;
          
          // Smoothly lerp towards target positions
          Matter.Body.setPosition(body, {
            x: body.position.x + (targetX - body.position.x) * 0.08,
            y: body.position.y + (targetY - body.position.y) * 0.08
          });
          
          // Smoothly upright the text
          // Normalize angle to the nearest multiple of 2PI for shortest rotation path
          const currentAngle = body.angle;
          const targetAngle = Math.round(currentAngle / (Math.PI * 2)) * (Math.PI * 2);
          Matter.Body.setAngle(body, currentAngle + (targetAngle - currentAngle) * 0.1);
          
          Matter.Body.setVelocity(body, { x: 0, y: 0 });
          Matter.Body.setAngularVelocity(body, 0);
        });
      }

      bodies.forEach((body, i) => {
        const el = ballRefs.current[i];
        if (el) {
          // Adjust position so the element's center aligns with the body's center
          const x = body.position.x - ballRadius;
          const y = body.position.y - ballRadius;
          // Apply position and rotation
          el.style.transform = `translate(${x}px, ${y}px) rotate(${body.angle}rad)`;
          el.style.width = `${ballRadius * 2}px`;
          el.style.height = `${ballRadius * 2}px`;
        }
      });
      animationFrameId = requestAnimationFrame(updateDOM);
    };

    updateDOM();

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      currentWidth = container.clientWidth;
      currentHeight = container.clientHeight;
      
      // Update walls
      Matter.Body.setPosition(ground, { x: currentWidth / 2, y: currentHeight + 50 });
      Matter.Body.setPosition(rightWall, { x: currentWidth + 50, y: currentHeight / 2 });
      Matter.Body.setPosition(ceiling, { x: currentWidth / 2, y: -50 });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(idleTimer);
      Matter.Runner.stop(runner);
      Matter.World.clear(world, false);
      Matter.Engine.clear(engine);
    };
  }, []);

  return (
    <div 
      ref={sceneRef} 
      className="w-full h-[350px] relative cursor-grab active:cursor-grabbing"
    >
      {/* Background Hint */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-20 select-none">
        <span className="font-display text-4xl md:text-5xl font-bold tracking-widest uppercase text-center">Hover, Drag & Throw</span>
        <span className="text-sm tracking-widest mt-2 uppercase font-bold text-center">Interactive Physics</span>
      </div>
      
      {/* Physics Balls */}
      {languageData.map((lang, i) => (
        <div
          key={lang.name}
          ref={(el) => { ballRefs.current[i] = el; }}
          className="absolute top-0 left-0 flex flex-col items-center justify-center rounded-full pointer-events-none"
          style={{
            willChange: "transform",
            background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, rgba(0,0,0,0.8) 100%)",
            boxShadow: "inset -10px -10px 20px rgba(0,0,0,0.5), inset 5px 5px 15px rgba(255,255,255,0.3), 0 10px 20px rgba(0,0,0,0.3)",
            border: "1px solid rgba(255,255,255,0.1)"
          }}
        >
          <img 
            src={lang.logo} 
            alt={lang.name} 
            className="w-[45%] h-[45%] object-contain drop-shadow-lg" 
            draggable={false}
          />
          <span className="text-[9px] md:text-[10px] font-bold text-white mt-1 uppercase tracking-wider select-none drop-shadow-md">
            {lang.name}
          </span>
        </div>
      ))}
    </div>
  );
}
