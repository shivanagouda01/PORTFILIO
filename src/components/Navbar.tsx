import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Github, Linkedin, Instagram } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { name: "About", href: "/#about" },
  { name: "Skills", href: "/#skills" },
  { name: "Projects", href: "/#projects" },
  { name: "Education", href: "/#education" },
  { name: "Company", href: "/company" },
  { name: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when a link is clicked
  const handleNavLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "py-3 glass shadow-lg" : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="text-2xl font-display font-bold tracking-tighter flex items-center gap-3 group">
          <img
            src="https://lh3.googleusercontent.com/d/1ih-ub465tBjOwVP2JIe7T21zPhZGk4FP"
            alt="Shivanagouda Patil"
            className="w-10 h-10 rounded-xl object-cover shadow-lg shadow-brand-primary/20 group-hover:scale-110 transition-transform border border-white/10"
          />
          <span className="hidden sm:inline bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">Shivanagouda</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
             const isActive = link.href.startsWith("/#") 
               ? location.pathname === "/" && location.hash === link.href.substring(1)
               : location.pathname === link.href;

              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`text-sm font-semibold transition-all relative group ${isActive ? 'text-brand-primary' : 'text-white/60 hover:text-white'}`}
                >
                  {link.name}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-brand-primary transition-all ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </Link>
              )
          })}
          <div className="w-px h-4 bg-white/10" />
          <div className="flex items-center gap-5">
            <a href="https://linkedin.com/in/shivanagouda-patil-8373a8369" target="_blank" rel="noreferrer" className="text-white/60 hover:text-brand-primary transition-colors hover:scale-110">
              <Linkedin size={20} />
            </a>
            <a href="https://instagram.com/shivanagouda.01" target="_blank" rel="noreferrer" className="text-white/60 hover:text-brand-primary transition-colors hover:scale-110">
              <Instagram size={20} />
            </a>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden w-12 h-12 flex items-center justify-center text-white glass rounded-xl active:scale-95 transition-transform"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute top-full left-0 right-0 glass border-t border-white/10 overflow-hidden md:hidden shadow-2xl"
          >
            <div className="flex flex-col p-6 gap-2">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Link
                    to={link.href}
                    onClick={handleNavLinkClick}
                    className="block text-xl font-bold py-4 px-4 rounded-xl hover:bg-white/5 text-white/70 hover:text-white transition-all border border-transparent hover:border-white/5"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-6 mt-4 border-t border-white/5 flex items-center justify-around">
                <a href="https://linkedin.com/in/shivanagouda-patil-8373a8369" target="_blank" rel="noreferrer" className="p-4 rounded-2xl glass text-brand-primary">
                  <Linkedin size={24} />
                </a>
                <a href="https://instagram.com/shivanagouda.01" target="_blank" rel="noreferrer" className="p-4 rounded-2xl glass text-brand-primary">
                  <Instagram size={24} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
