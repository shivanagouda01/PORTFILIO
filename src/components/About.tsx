import { motion } from "motion/react";
import ThreeDTilt from "./ThreeDTilt";
import Animated3DText from "./Animated3DText";

export default function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-sm font-bold text-brand-primary uppercase tracking-widest mb-4">
              <Animated3DText text="About Me" hoverZ={20} />
            </h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold mb-8 leading-tight">
              <Animated3DText text="Building the future of" hoverZ={30} />{" "}
              <span className="text-brand-primary">
                <Animated3DText text="digital experiences." hoverZ={35} />
              </span>
            </h3>
            <p className="text-xl text-white/60 leading-relaxed mb-8">
              I am a Computer Science (AI & ML) student and founder of Webnixo. I build modern, fast, and user-friendly websites for businesses and startups.
            </p>
            <p className="text-xl text-white/60 leading-relaxed mb-12">
              I focus on creating real-world solutions that help businesses grow online. My goal is to bridge the gap between complex technology and intuitive user interfaces.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-16 p-8 rounded-3xl glass border border-white/5">
              {[
                { label: "Founder", value: "Webnixo" },
                { label: "CS Student", value: "AI & ML Focus" },
                { label: "50+", value: "Projects Completed" },
                { label: "100%", value: "Commitment" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + (index * 0.1), duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ThreeDTilt intensity={20} className="w-full h-full rounded-2xl">
                    <div 
                      className="p-4 rounded-2xl transition-colors hover:bg-white/5 cursor-default h-full flex flex-col justify-center"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <div 
                        className="text-2xl md:text-3xl font-display font-bold text-white mb-1"
                        style={{ transform: "translateZ(30px)" }}
                      >
                        <Animated3DText text={stat.label} hoverZ={15} />
                      </div>
                      <div 
                        className="text-[10px] md:text-sm text-white/45 uppercase tracking-wider font-bold"
                        style={{ transform: "translateZ(15px)" }}
                      >
                        <Animated3DText text={stat.value} hoverZ={10} />
                      </div>
                    </div>
                  </ThreeDTilt>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

