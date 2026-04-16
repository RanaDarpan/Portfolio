import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Download, MessageCircle } from 'lucide-react';
import profile from '../Assets/profile.png';

const About = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const stats = [
    { label: 'Projects', value: '10+' },
    { label: 'Certifications', value: '5+' },
    { label: 'Technologies', value: '15+' },
    { label: 'CPI', value: '9.75' },
  ];

  return (
    <section className="relative section-padding overflow-hidden" id="about">
      <div className="absolute inset-0 mesh-gradient opacity-10 dark:opacity-40" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-brand-500 dark:text-brand-400 font-semibold text-sm tracking-widest uppercase mb-4">
            Get to know me
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-display text-text-primary">
            About <span className="gradient-text">Me</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative group">
              {/* Outer glow ring */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-brand-500/20 via-purple-500/20 to-cyan-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              {/* Decorative ring */}
              <motion.div
                className="absolute -inset-3 rounded-full border border-brand-500/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-brand-500" />
              </motion.div>

              {/* Image container */}
              <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden ring-2 ring-white/10">
                <img
                  src={profile}
                  alt="Rana Darpan"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-900/50 via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="text-text-secondary text-lg leading-relaxed mb-6">
              I am <span className="text-text-primary font-semibold">Rana Darpan</span>, a passionate web developer with experience in modern web technologies like React, JavaScript, and Tailwind CSS. I have worked on diverse projects, including fitness tracking, food waste management, and AI/ML models like crop recommendation and stock price prediction.
            </p>
            <p className="text-text-secondary leading-relaxed mb-10">
              I am driven by a curiosity to learn and create innovative solutions in technology. Currently pursuing BE in Computer Engineering at VGEC, I strive to build impactful digital experiences.
            </p>

            {/* Stats grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="text-center p-4 rounded-2xl glass gradient-border"
                >
                  <div className="text-2xl font-bold gradient-text mb-1">{stat.value}</div>
                  <div className="text-xs text-text-secondary uppercase tracking-wider">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <motion.a
                href="https://drive.google.com/file/d/1tzHwm0cJdd09t8qs1baYtb5SflNZtV_w/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all"
                style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
              >
                <Download className="w-4 h-4" /> Resume
              </motion.a>
              <motion.a
                href="#contact"
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-text-secondary glass hover:bg-black/10 dark:hover:bg-white/10 transition-all"
              >
                <MessageCircle className="w-4 h-4" /> Contact
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
