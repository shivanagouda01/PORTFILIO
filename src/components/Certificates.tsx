import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { ExternalLink, X, Award, Filter } from "lucide-react";

const categories = ["All", "Web Development", "Programming"];

const certificates = [
  {
    id: 1,
    title: "HTML and CSS Certificate",
    issuer: "Coursera",
    category: "Web Development",
    image: "https://lh3.googleusercontent.com/d/1b8wVavZh_zB97MHSeuR7xkApaEVQt0Vd",
    desc: "Comprehensive certification covering modern HTML5, CSS3, and responsive design principles."
  },
  {
    id: 2,
    title: "Web Designing",
    issuer: "Udemy",
    category: "Web Development",
    image: "https://lh3.googleusercontent.com/d/1NrAB9ZvLIhi3l9znH4QFSWVaGdAKOZ9H",
    desc: "Advanced web design course focusing on UI/UX principles, layout design, and visual hierarchy."
  },
  {
    id: 3,
    title: "AI & ML FUNDEMENTALS",
    issuer: "Google",
    category: "Programming",
    image: "https://lh3.googleusercontent.com/d/1bHuyzP91TUik0MG-UYDeG1KenWW39Fap",
    desc: "Foundational certification in Artificial Intelligence and Machine Learning concepts, algorithms, and real-world applications."
  }
];

export default function Certificates() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCert, setSelectedCert] = useState<typeof certificates[0] | null>(null);

  const filteredCerts = selectedCategory === "All" 
    ? certificates 
    : certificates.filter(cert => cert.category === selectedCategory);

  return (
    <section id="certificates" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-sm font-bold text-brand-primary uppercase tracking-widest mb-4"
          >
            Credentials
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-5xl font-display font-bold mb-8"
          >
            Professional Certifications
          </motion.h3>

          {/* Filters */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                  selectedCategory === cat 
                    ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/20" 
                    : "glass hover:bg-white/10 text-white/60"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredCerts.map((cert, index) => (
              <motion.div
                key={cert.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => setSelectedCert(cert)}
              >
                <div className="relative rounded-2xl overflow-hidden glass border border-white/10 aspect-[4/3]">
                  <img 
                    src={cert.image} 
                    alt={cert.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-2 text-brand-primary mb-2">
                      <Award size={16} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">{cert.issuer}</span>
                    </div>
                    <h4 className="text-xl font-display font-bold text-white mb-2">{cert.title}</h4>
                    <button className="flex items-center gap-2 text-xs font-bold text-white/60 group-hover:text-white transition-colors">
                      View Certificate <ExternalLink size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#030303]/95 backdrop-blur-sm"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-5xl w-full glass rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors"
                onClick={() => setSelectedCert(null)}
              >
                <X size={20} />
              </button>

              <div className="grid md:grid-cols-[1.5fr_1fr]">
                <div className="aspect-[4/3] md:aspect-auto">
                  <img 
                    src={selectedCert.image} 
                    alt={selectedCert.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-brand-primary mb-4">
                    <Award size={20} />
                    <span className="text-xs font-bold uppercase tracking-widest">{selectedCert.issuer}</span>
                  </div>
                  <h3 className="text-3xl font-display font-bold mb-6">{selectedCert.title}</h3>
                  <p className="text-white/60 leading-relaxed mb-8">
                    {selectedCert.desc}
                  </p>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between py-4 border-y border-white/5">
                      <span className="text-white/40 text-sm">Category</span>
                      <span className="text-white font-bold">{selectedCert.category}</span>
                    </div>
                    <a 
                      href={selectedCert.image} 
                      target="_blank" 
                      rel="noreferrer"
                      className="w-full py-4 rounded-xl bg-brand-primary text-white font-bold text-center hover:bg-brand-primary/90 transition-all shadow-lg shadow-brand-primary/20"
                    >
                      Download Certificate
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
