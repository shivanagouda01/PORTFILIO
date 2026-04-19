import { motion } from "motion/react";
import { GraduationCap, Calendar, MapPin } from "lucide-react";

const education = [
  {
    degree: "B.Tech in Computer Science (AI & ML)",
    institution: "Currently Pursuing",
    period: "Present",
    location: "Karnataka, India",
    desc: "Focusing on advanced algorithms, machine learning models, and modern software engineering principles."
  },
  {
    degree: "PUC (Pre-University)",
    institution: "SHREE VIDYANIKETAN PU COLLEGE",
    period: "Completed in 2025",
    location: "Hargibommanahalli, Karnataka",
    desc: "Science stream with a focus on core academic excellence and foundational computer science concepts."
  },
  {
    degree: "10th Grade",
    institution: "ST JOSEPH ENGLISH MEDIUM SCHOOL",
    period: "Completed in 2023",
    location: "TB Dam, Karnataka",
    desc: "Completed secondary education with a strong academic record."
  }
];

export default function Education() {
  return (
    <section id="education" className="py-24 px-6 bg-white/5">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-sm font-bold text-brand-primary uppercase tracking-widest mb-4"
          >
            Education
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-5xl font-display font-bold"
          >
            Academic Journey
          </motion.h3>
        </div>

        <div className="grid gap-8">
          {education.map((item, index) => (
            <motion.div
              key={item.degree}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.01 }}
              transition={{ delay: index * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="p-8 rounded-2xl border border-white/10 glass hover:border-brand-primary/30 transition-all group shadow-sm hover:shadow-brand-primary/10"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0">
                    <GraduationCap size={24} />
                  </div>
                  <div>
                    <h4 className="text-2xl font-display font-bold mb-2 group-hover:text-brand-primary transition-colors">{item.degree}</h4>
                    <div className="text-lg font-medium text-white/80 mb-2">{item.institution}</div>
                    <div className="flex flex-wrap gap-4 text-sm text-white/40">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        {item.period}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin size={14} />
                        {item.location}
                      </div>
                    </div>
                  </div>
                </div>
                <p className="md:max-w-xs text-white/60 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
