import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";

const skillPoints = [
  "Building responsive and modern websites using HTML, CSS, and JavaScript",
  "Strong foundation in C++ programming and logical problem solving",
  "Understanding of Data Structures and core programming concepts",
  "Knowledge of AI & Machine Learning fundamentals",
  "Experience in creating real-world web solutions",
  "Familiar with tools like GitHub and VS Code",
  "Focused on writing clean, efficient, and user-friendly code"
];

const languages = ["C", "C++", "HTML & CSS", "JavaScript", "Python"];

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-sm font-bold text-brand-primary uppercase tracking-widest mb-4"
          >
            Expertise
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-5xl font-display font-bold"
          >
            Technical Skills
          </motion.h3>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-6">
            {skillPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-start gap-4 p-4 rounded-2xl glass border border-white/5 hover:border-brand-primary/20 transition-all group"
              >
                <div className="mt-1 text-brand-primary shrink-0 group-hover:scale-110 transition-transform">
                  <CheckCircle2 size={20} />
                </div>
                <p className="text-white/70 leading-relaxed">{point}</p>
              </motion.div>
            ))}
          </div>

          <div className="space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="p-8 rounded-3xl glass border border-white/10"
            >
              <h4 className="text-2xl font-display font-bold mb-8 text-white">Languages Known</h4>
              <div className="flex flex-wrap gap-4">
                {languages.map((lang, index) => (
                  <motion.div
                    key={lang}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                    className="px-6 py-3 rounded-xl glass border border-white/10 text-brand-primary font-bold uppercase tracking-widest text-xs"
                  >
                    {lang}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="p-8 rounded-3xl glass border border-white/10 bg-brand-primary/5"
            >
              <h4 className="text-xl font-display font-bold mb-4 text-white">Continuous Learning</h4>
              <p className="text-white/50 text-sm leading-relaxed">
                Always exploring new technologies and methodologies to build better, more efficient digital products.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
