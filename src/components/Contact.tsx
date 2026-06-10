import { motion, AnimatePresence } from "motion/react";
import { Mail, Instagram, Linkedin, ArrowUpRight, X, Send, CheckCircle, Loader2, MessageSquare } from "lucide-react";
import { useState, FormEvent } from "react";
import ThreeDTilt from "./ThreeDTilt";
import Animated3DText from "./Animated3DText";

export default function Contact() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus("error");
      return;
    }

    setSubmitStatus("loading");

    // Real world integration backup: Pre-compile mailto link to open email clients nicely
    const mailtoSubject = encodeURIComponent(formData.subject || "Collaboration Inquiry - Webnixo");
    const mailtoBody = encodeURIComponent(`Hi Shivanagouda,\n\nMy name is ${formData.name}. (${formData.email})\n\nMessage:\n${formData.message}\n\n--\nSent via Shivanagouda Patil's Portfolio.`);
    const mailtoLink = `mailto:shiva@webnixo.in?subject=${mailtoSubject}&body=${mailtoBody}`;

    // Simulate database write/transmission load
    setTimeout(() => {
      setSubmitStatus("success");
      // Open the mail client as action trigger so they can hit directly
      window.location.href = mailtoLink;
      
      // Reset after a delay
      setTimeout(() => {
        setFormData({ name: "", email: "", subject: "", message: "" });
        setSubmitStatus("idle");
        setIsFormOpen(false);
      }, 3500);
    }, 1200);
  };

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
                <Animated3DText text="Get in Touch" hoverZ={20} />
              </motion.h2>
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="text-5xl md:text-6xl font-display font-bold mb-8 leading-tight"
              >
                <Animated3DText text="Let's build something" hoverZ={30} />{" "}
                <span className="text-brand-primary">
                  <Animated3DText text="great." hoverZ={35} />
                </span>
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
                <motion.div
                  key={social.name}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + (index * 0.1), duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ThreeDTilt intensity={12} className="w-full">
                    <a
                      href={social.link}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center justify-between p-6 rounded-2xl glass border border-white/10 hover:border-brand-primary/20 transition-all active:scale-95 block h-full"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <div className="flex items-center gap-4" style={{ transformStyle: "preserve-3d" }}>
                        <div 
                          className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white/60 group-hover:text-brand-primary transition-colors"
                          style={{ transform: "translateZ(20px)" }}
                        >
                          {social.icon}
                        </div>
                        <div style={{ transform: "translateZ(15px)" }}>
                          <div className="text-xs text-white/40 uppercase tracking-widest font-bold">{social.name}</div>
                          <div className="text-lg font-medium">{social.handle}</div>
                        </div>
                      </div>
                      <ArrowUpRight 
                        className="text-white/20 group-hover:text-white transition-all" 
                        style={{ transform: "translateZ(10px)" }}
                      />
                    </a>
                  </ThreeDTilt>
                </motion.div>
              ))}
              
              <motion.button
                type="button"
                onClick={() => setIsFormOpen(true)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="w-full py-5 rounded-xl bg-brand-primary text-white font-bold text-xl hover:bg-brand-primary/90 transition-all shadow-lg shadow-brand-primary/20 active:scale-95 cursor-pointer flex items-center justify-center gap-3 hover:translate-y-[-2px]"
              >
                <MessageSquare size={20} />
                Send a Message
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Message Popup Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-[#030303]/90 backdrop-blur-md"
            onClick={() => setIsFormOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 25 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 25 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative max-w-xl w-full glass rounded-3xl overflow-hidden border border-white/10 shadow-2xl p-6 md:p-10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                type="button"
                className="absolute top-6 right-6 w-10 h-10 rounded-xl glass flex items-center justify-center hover:bg-white/10 transition-colors active:scale-95"
                onClick={() => setIsFormOpen(false)}
              >
                <X size={20} className="text-white/60 hover:text-white" />
              </button>

              <div className="mb-8">
                <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-4">
                  <MessageSquare size={24} />
                </div>
                <h3 className="text-2xl md:text-3xl font-display font-bold text-white">Send Message</h3>
                <p className="text-sm text-white/40 mt-1">
                  Fill in your details to pitch a project directly.
                </p>
              </div>

              {submitStatus === "success" ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-4"
                >
                  <div className="inline-flex w-16 h-16 rounded-full bg-brand-primary/10 text-brand-primary items-center justify-center animate-bounce">
                    <CheckCircle size={36} />
                  </div>
                  <h4 className="text-xl font-bold text-white">Message Compiled!</h4>
                  <p className="text-sm text-white/50 max-w-sm mx-auto">
                    Opening your default email client to finalize and transmit...
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-white/40 mb-2">Name</label>
                      <input 
                        required
                        type="text"
                        placeholder="John Doe"
                        className="w-full px-4 py-3 bg-white/5 rounded-xl border border-white/10 focus:border-brand-primary focus:bg-white/[0.08] text-white placeholder-white/20 outline-none text-sm font-medium transition-all"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (submitStatus === "error") setSubmitStatus("idle");
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-white/40 mb-2">Email</label>
                      <input 
                        required
                        type="email"
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 bg-white/5 rounded-xl border border-white/10 focus:border-brand-primary focus:bg-white/[0.08] text-white placeholder-white/20 outline-none text-sm font-medium transition-all"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (submitStatus === "error") setSubmitStatus("idle");
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-white/40 mb-2">Subject (Optional)</label>
                    <input 
                      type="text"
                      placeholder="UI/UX Redesign, Web-app Setup..."
                      className="w-full px-4 py-3 bg-white/5 rounded-xl border border-white/10 focus:border-brand-primary focus:bg-white/[0.08] text-white placeholder-white/20 outline-none text-sm font-medium transition-all"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-white/40 mb-2">Your Message</label>
                    <textarea 
                      required
                      rows={4}
                      placeholder="Tell me about your business goals and design requirements..."
                      className="w-full px-4 py-3 bg-white/5 rounded-xl border border-white/10 focus:border-brand-primary focus:bg-white/[0.08] text-white placeholder-white/20 outline-none text-sm font-medium transition-all resize-none"
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (submitStatus === "error") setSubmitStatus("idle");
                      }}
                    />
                  </div>

                  {submitStatus === "error" && (
                    <p className="text-red-400 text-xs font-bold">
                      Please satisfy all required fields (*Name, *Email, *Message) before launching submission.
                    </p>
                  )}

                  <button
                    disabled={submitStatus === "loading"}
                    type="submit"
                    className="w-full py-4 rounded-xl bg-brand-primary hover:bg-brand-primary/95 text-white font-bold select-none text-sm transition-all shadow-lg flex items-center justify-center gap-2 active:scale-95 disabled:scale-100 disabled:opacity-50 cursor-pointer"
                  >
                    {submitStatus === "loading" ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Transmitting Package...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Submit & Open Client
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
