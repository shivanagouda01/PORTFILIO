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

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project, index) => (
            <motion.a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="group relative rounded-3xl overflow-hidden glass border border-white/10 hover:border-brand-primary/20 transition-all duration-500 block active:scale-[0.98]"
            >
              <div className="aspect-[16/10] overflow-hidden relative">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover md:group-hover:scale-105 transition-all duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030303]/80 via-transparent to-transparent opacity-60 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="absolute bottom-6 right-6 w-12 h-12 rounded-xl glass flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 shadow-xl">
                  <ExternalLink size={20} className="text-brand-primary" />
                </div>
              </div>
              <div className="p-8 lg:p-10">
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-white/5 text-[9px] font-bold text-white/50 uppercase tracking-widest border border-white/5">
                      {tag}
                    </span>
                  ))}
                </div>
                <h4 className="text-2xl lg:text-3xl font-display font-bold mb-4 group-hover:text-brand-primary transition-colors duration-300">
                  {project.title}
                </h4>
                <p className="text-white/40 text-sm lg:text-base leading-relaxed">
                  {project.desc}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
