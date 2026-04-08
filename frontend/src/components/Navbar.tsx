import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Code2, Sun, Moon } from 'lucide-react';
import { useSound } from '../hooks/useSound';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { playClick } = useSound();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['About', 'Skills', 'Experience', 'Projects', 'Certifications', 'Contact'];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className={`fixed w-full z-50 transition-all duration-300 top-0 sm:top-4 flex justify-center`}
    >
      {/* Floating Pill Container (Max Width Limits it so it's a pill) */}
      <div 
        className={`w-full sm:w-11/12 md:max-w-4xl transition-all duration-500 ease-in-out ${
          isScrolled 
            ? 'glass-strong shadow-[0_8px_32px_rgba(0,0,0,0.4)] sm:rounded-full px-4 sm:px-6 py-2' 
            : 'bg-transparent px-4 sm:px-6 py-4'
        }`}
      >
        <div className="flex items-center justify-between h-12">
          {/* Logo Area */}
          <motion.a
            href="#"
            onClick={playClick}
            className="flex items-center space-x-3 group"
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-brand-500/20 border border-brand-400/30 group-hover:bg-brand-500/30 transition-colors">
              <Code2 className="w-6 h-6 text-brand-400" />
            </div>
            <span className="text-xl font-bold font-display text-text-primary tracking-wide hidden sm:block">
              Darpan<span className="text-brand-400">.</span>
            </span>
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={playClick}
                className="relative px-3 py-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-300 group rounded-full"
                whileHover={{ backgroundColor: 'rgba(99,102,241,0.05)' }}
                whileTap={{ scale: 0.95 }}
              >
                {item}
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-1 bg-brand-500 group-hover:w-1/2 transition-all duration-300 rounded-full opacity-0 group-hover:opacity-100" />
              </motion.a>
            ))}

            {/* Theme Toggle Desktop */}
            <motion.button
              onClick={() => {
                playClick();
                toggleTheme();
              }}
              className="ml-4 p-2 rounded-full glass hover:bg-brand-500/10 transition-colors text-text-primary"
              whileHover={{ scale: 1.1, rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              {theme === 'dark' ? <Sun size={18} className="text-amber-300" /> : <Moon size={18} className="text-indigo-600" />}
            </motion.button>
          </div>

          {/* Mobile Right Side (Toggle + Hamburger) */}
          <div className="md:hidden flex items-center gap-3">
            <motion.button
              onClick={() => {
                playClick();
                toggleTheme();
              }}
              className="p-2 rounded-full glass hover:bg-brand-500/10 transition-colors text-text-primary"
              whileTap={{ scale: 0.9 }}
            >
              {theme === 'dark' ? <Sun size={18} className="text-amber-300" /> : <Moon size={18} className="text-indigo-600" />}
            </motion.button>
            <motion.button
              onClick={() => {
                playClick();
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              className="p-2 text-text-secondary hover:text-text-primary transition-colors rounded-full glass border border-glass-border"
              whileTap={{ scale: 0.9 }}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Flyout Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden w-full absolute left-0 top-full mt-2 sm:px-0"
            >
              <div className="mx-4 sm:mx-0 p-4 space-y-1 glass-strong border border-white/10 rounded-2xl shadow-2xl backdrop-blur-2xl">
                {navItems.map((item, i) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="block px-4 py-3 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-brand-500/10 rounded-xl transition-all duration-300"
                    onClick={() => {
                      playClick();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {item}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
