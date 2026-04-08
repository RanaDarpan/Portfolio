import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-black/5 dark:border-white/5">
      <div className="absolute inset-0 mesh-gradient opacity-5 dark:opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="text-center md:text-left">
            <span className="text-xl font-bold font-display gradient-text">
              Rana Darpan
            </span>
            <p className="text-text-secondary text-sm mt-1">Full Stack Developer</p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-3">
            {[
              { Icon: Github, href: 'https://github.com/RanaDarpan/' },
              { Icon: Linkedin, href: 'https://www.linkedin.com/in/ranadarpan/' },
              { Icon: Mail, href: 'mailto:ranadarpan0@gmail.com' },
            ].map(({ Icon, href }, i) => (
              <motion.a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                className="p-2.5 rounded-xl glass text-text-secondary hover:text-text-primary transition-colors"
              >
                <Icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-text-secondary opacity-70 text-sm flex items-center gap-1">
            © {currentYear} Made with{' '}
            <Heart className="w-3.5 h-3.5 text-red-500 dark:text-red-400 fill-red-500 dark:fill-red-400" />
            by Rana Darpan
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
