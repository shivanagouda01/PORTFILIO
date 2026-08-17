import { motion } from "motion/react";
import { useEffect } from "react";

export default function Company() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <section className="pt-32 pb-20 min-h-screen relative flex items-center justify-center px-6">
      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass rounded-[2.5rem] p-8 md:p-16 border border-white/10"
        >
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
            Webnixo AI
          </h1>
          <h2 className="text-xl text-brand-primary font-mono mb-8 tracking-wide uppercase">
            Founded by Shivanagouda Patil
          </h2>

          <div className="space-y-8 text-white/70 text-lg leading-relaxed">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <p>
                  <strong className="text-white">Founder:</strong> Shivanagouda Patil
                </p>
                <p>
                  <strong className="text-white">Founded:</strong> 2026
                </p>
                <p>
                  <strong className="text-white">Location:</strong> Vadodara, Gujarat
                </p>
              </div>
              <div className="space-y-4">
                <p>
                  <strong className="text-white">Official Website:</strong>{" "}
                  <a href="https://webnixo.in" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">
                    webnixo.in
                  </a>
                </p>
                <p>
                  <strong className="text-white">Contact:</strong>{" "}
                  <a href="mailto:shiva@webnixo.in" className="text-brand-primary hover:underline">
                    shiva@webnixo.in
                  </a>
                </p>
                <p>
                  <strong className="text-white">Social Profiles:</strong>{" "}
                  <a href="https://linkedin.com/in/shivanagouda-patil-8373a8369" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">
                    LinkedIn
                  </a>
                </p>
              </div>
            </div>

            <div className="mt-12 pt-12 border-t border-white/10">
              <h3 className="text-2xl font-bold text-white mb-4">What Webnixo Does</h3>
              <p className="mb-4">
                Webnixo AI is an intelligent business platform that combines cutting-edge artificial intelligence with modern web engineering. We build lightning-fast, scalable web applications integrated with predictive analytics, smart automation bots, and robust backend architectures.
              </p>
              <p>
                Our all-in-one AI platform also provides unified access to powerful models like ChatGPT, Gemini, Anthropic, Mistral, and Grok at half the price of a single subscription, enabling businesses to leverage state-of-the-art AI cost-effectively.
              </p>
            </div>
            
            <div className="mt-12 text-center">
               <a 
                 href="https://webnixo.in" 
                 target="_blank"
                 rel="noopener noreferrer"
                 className="inline-flex items-center gap-2 px-8 py-4 bg-brand-primary text-white font-bold rounded-xl hover:bg-brand-primary/90 transition-all shadow-lg shadow-brand-primary/20"
               >
                 Visit Webnixo AI Official Site
               </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
