import { motion } from "motion/react";
import { Mail, Instagram, Linkedin, ArrowUpRight } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-3xl glass p-12 md:p-20 relative overflow-hidden border border-white/10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="text-sm font-bold text-brand-primary uppercase tracking-widest mb-6"
              >
                Get in Touch
              </motion.h2>
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="text-5xl md:text-6xl font-display font-bold mb-8 leading-tight"
              >
                Let's build something <span className="text-brand-primary">great</span>.
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="text-lg text-white/40 mb-12 max-w-md"
              >
                Have a project in mind? Looking for a partner to bring your digital vision to life? I'm always open to new opportunities.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-wrap gap-6"
              >
                <a 
                  href="mailto:shiva@webnixo.in" 
                  className="flex items-center gap-3 px-6 py-3 rounded-xl glass border border-white/10 hover:bg-white/5 transition-all text-lg font-medium"
                >
                  <Mail size={20} className="text-brand-primary" />
                  shiva@webnixo.in
                </a>
              </motion.div>
            </div>

            <div className="space-y-6">
              {[
                { name: "LinkedIn", handle: "shivanagouda-patil", icon: <Linkedin />, link: "https://www.linkedin.com/in/shivanagouda-patil-8373a8369" },
                { name: "Instagram", handle: "@shivanagouda.01", icon: <Instagram />, link: "https://instagram.com/shivanagouda.01" },
              ].map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.link}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + (index * 0.1), duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex items-center justify-between p-6 rounded-2xl glass border border-white/10 hover:border-brand-primary/30 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white/60 group-hover:text-brand-primary transition-colors">
                      {social.icon}
                    </div>
                    <div>
                      <div className="text-xs text-white/40 uppercase tracking-widest font-bold">{social.name}</div>
                      <div className="text-lg font-medium">{social.handle}</div>
                    </div>
                  </div>
                  <ArrowUpRight className="text-white/20 group-hover:text-white transition-all" />
                </motion.a>
              ))}
              
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="w-full py-5 rounded-xl bg-brand-primary text-white font-bold text-xl hover:bg-brand-primary/90 transition-all shadow-lg shadow-brand-primary/20"
              >
                Send a Message
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
