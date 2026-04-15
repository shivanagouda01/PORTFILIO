import { motion } from "motion/react";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "Webnixo Business Website",
    desc: "A professional business website for offering web development services. Built with modern tech for maximum performance.",
    image: "https://lh3.googleusercontent.com/d/1ANBGDSHJgH329bbFfYogmMmxPV6WUlQK",
    tags: ["React", "Tailwind", "Motion"],
    link: "https://webnixo.in"
  },
  {
    title: "QR Menu Website",
    desc: "Digital menu system for restaurants using QR codes. Streamlining the ordering process for modern dining.",
    image: "https://lh3.googleusercontent.com/d/1GPFtM5_lMJO46IZuVxDCIMrjK9ZEO92z",
    tags: ["Next.js", "Firebase", "QR"],
    link: "https://www.webnixo.in"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-sm font-bold text-brand-primary uppercase tracking-widest mb-4"
            >
              Selected Work
            </motion.h2>
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-5xl font-display font-bold"
            >
              Featured Projects
            </motion.h3>
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-md text-white/40"
          >
            A collection of projects that demonstrate my ability to build functional, beautiful, and business-ready solutions.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="group relative rounded-3xl overflow-hidden glass border border-white/10 hover:border-brand-primary/20 transition-colors duration-500"
            >
              <div className="aspect-[16/10] overflow-hidden relative">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030303]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="p-10">
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-4 py-1.5 rounded-full bg-white/5 text-[10px] font-bold text-white/60 uppercase tracking-widest border border-white/5">
                      {tag}
                    </span>
                  ))}
                </div>
                <h4 className="text-3xl font-display font-bold mb-4 group-hover:text-brand-primary transition-colors duration-300">
                  {project.title}
                </h4>
                <p className="text-white/50 text-base leading-relaxed mb-8">
                  {project.desc}
                </p>
                <div className="flex items-center gap-6">
                  <a 
                    href={project.link} 
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-sm font-bold text-white hover:text-brand-primary transition-colors group/link"
                  >
                    View Project 
                    <ExternalLink size={16} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
