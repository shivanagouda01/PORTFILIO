import { motion, AnimatePresence } from "motion/react";
import { X, ShieldAlert, Scale, CheckCircle } from "lucide-react";

interface PolicyModalProps {
  type: "privacy" | "terms" | null;
  onClose: () => void;
}

export default function PolicyModal({ type, onClose }: PolicyModalProps) {
  const isPrivacy = type === "privacy";

  return (
    <AnimatePresence>
      {type && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-[#030303]/90 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative max-w-3xl w-full max-h-[85vh] glass rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 md:p-8 border-b border-white/5 flex items-center justify-between shrink-0 bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                  {isPrivacy ? <ShieldAlert size={20} /> : <Scale size={20} />}
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-display font-bold text-white">
                    {isPrivacy ? "Privacy Policy" : "Terms of Service"}
                  </h3>
                  <p className="text-xs text-white/40 font-mono mt-0.5">
                    Last Updated: June 2026
                  </p>
                </div>
              </div>
              <button
                className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:bg-white/10 transition-colors active:scale-95"
                onClick={onClose}
                aria-label="Close dialog"
              >
                <X size={20} className="text-white/60 hover:text-white" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 md:p-8 overflow-y-auto space-y-6 text-white/70 text-sm md:text-base leading-relaxed scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {isPrivacy ? (
                <>
                  <p>
                    Welcome to the portfolio and business website of <strong>Shivanagouda Patil</strong>, founder of <strong>Webnixo</strong>. Your privacy is of paramount importance to us. This Privacy Policy outlines how we collect, use, and safeguard your personal details when you interact with our services, website, or direct touchpoints.
                  </p>

                  <div className="space-y-3">
                    <h4 className="text-lg font-display font-bold text-white flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                      1. Information We Collect
                    </h4>
                    <p className="pl-4">
                      We only request personal information when we truly need it to provide a service to you. This includes:
                    </p>
                    <ul className="list-disc pl-8 space-y-2 text-white/60">
                      <li><strong>Contact Information:</strong> Your name, email address, website URL, and connection messages entered in our contact form or sent via direct email.</li>
                      <li><strong>Usage Metrics:</strong> Anonymous browsing data, IP address range, device specs, and interaction behavior with our user interface elements to optimize future loads.</li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-lg font-display font-bold text-white flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                      2. How We Use Your Data
                    </h4>
                    <p className="pl-4">
                      All collected information is treated with highest confidentiality. It is used strictly to:
                    </p>
                    <ul className="list-disc pl-8 space-y-2 text-white/60">
                      <li>Answer project queries, deliver consulting scopes, and maintain ongoing startup accounts under Webnixo services.</li>
                      <li>Diagnose, maintain, and optimize technical aspects of this website and connected server layers.</li>
                      <li>Follow legal regulations and enforce corresponding user-facing agreements.</li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-lg font-display font-bold text-white flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                      3. Data Protection & Security
                    </h4>
                    <p className="pl-4">
                      We store all collected information within highly secure, cloud-hosted systems protected by authentication rules. We do not share any personally identifying information publicly or with third-parties, except when required to by local laws or to execute contract fulfillment with your explicit authorization.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-lg font-display font-bold text-white flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                      4. Your Direct Rights
                    </h4>
                    <p className="pl-4">
                      You are always free to refuse our request for your personal information, with the understanding that we may be unable to provide you with some of your desired experience or project details. You retain the right to query the active record of details we persist, or demand immediate database purge by contacting us.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-lg font-display font-bold text-white flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                      5. Contact Us
                    </h4>
                    <p className="pl-4">
                      For any inquiries regarding personal information care, security, or data handling, write directly to:
                      <br />
                      <span className="text-brand-primary font-mono select-all">shiva@webnixo.in</span>
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <p>
                    By accessing or interacting with this portfolio or the startup workspace of <strong>Webnixo</strong> (owned/operated by <strong>Shivanagouda Patil</strong>), you agree to be bound by these Terms of Service, all applicable laws and regulations, and agree that you are responsible for compliance with any local jurisdictions.
                  </p>

                  <div className="space-y-3">
                    <h4 className="text-lg font-display font-bold text-white flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary" />
                      1. Use License & Guidelines
                    </h4>
                    <p className="pl-4">
                      Permission is granted to temporarily view the digital resources, graphics, projects, and portfolio summaries on this website for personal, non-commercial transitory viewing only. Under this license, you may not:
                    </p>
                    <ul className="list-disc pl-8 space-y-2 text-white/60">
                      <li>Modify or duplicate any of our underlying engineering blueprints, code lines, or design mockups without direct permission.</li>
                      <li>Use our proprietary corporate materials for commercial distribution, or public display of any form.</li>
                      <li>Attempt to decompile, reverse engineer, or crack database indices of any software contained here or on Webnixo servers.</li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-lg font-display font-bold text-white flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary" />
                      2. Professional Services Limitation
                    </h4>
                    <p className="pl-4">
                      The materials, digital outputs, and services provided by Shivanagouda Patil and the Webnixo startup team are delivered on an "as is" and "as available" basis. While we commit to the highest industry standards of uptime, response speeds, and engineering craftsmanship, we make no guarantees regarding uninterrupted execution of delivered beta features without custom support agreements.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-lg font-display font-bold text-white flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary" />
                      3. Limitation of Liability
                    </h4>
                    <p className="pl-4">
                      In no event shall Shivanagouda Patil, Webnixo, or its verified suppliers be liable for any damages (including, without limitation, damages for loss of business profit, data corruption, or operational interruption) arising out of the use or inability to use the digital services.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-lg font-display font-bold text-white flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary" />
                      4. Revisions, Updates & Errata
                    </h4>
                    <p className="pl-4">
                      The materials appearing on our website could include technical, typographical, or photographic errors. We reserve the absolute right to refine, modify, or update these terms and our website features at any time without prior public notice.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-lg font-display font-bold text-white flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary" />
                      5. Governing Law
                    </h4>
                    <p className="pl-4">
                      Any claim relating to this website or Webnixo services shall be governed by the laws of Karnataka, India, without regard to its conflict of law provisions.
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 md:p-8 border-t border-white/5 flex items-center justify-end shrink-0 bg-white/[0.01]">
              <button
                className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 active:scale-95 text-white text-sm font-bold transition-all border border-white/5 flex items-center gap-2"
                onClick={onClose}
              >
                <CheckCircle size={16} className="text-brand-primary" />
                I Understand
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
