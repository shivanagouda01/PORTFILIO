import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Certificates from "../components/Certificates";
import Education from "../components/Education";
import Contact from "../components/Contact";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "motion/react";

export default function Home() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [hash]);

  const sectionVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } 
    }
  };

  const SectionWrapper = ({ children }: { children: React.ReactNode }) => (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={sectionVariants}
    >
      {children}
    </motion.div>
  );

  return (
    <main>
      <Hero />
      <SectionWrapper>
        <About />
      </SectionWrapper>
      <SectionWrapper>
        <Skills />
      </SectionWrapper>
      <SectionWrapper>
        <Projects />
      </SectionWrapper>
      <SectionWrapper>
        <Certificates />
      </SectionWrapper>
      <SectionWrapper>
        <Education />
      </SectionWrapper>
      <SectionWrapper>
        <Contact />
      </SectionWrapper>
    </main>
  );
}
