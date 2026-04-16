import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, Linkedin, Mail, ChevronDown, ArrowRight, Code2, Terminal } from 'lucide-react';
import { Typewriter } from 'react-simple-typewriter';
import { useSound } from '../hooks/useSound';

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const { playClick } = useSound();

  return (
    <div
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Subtle grid overlay for tech feel */}
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04] z-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Main Content */}
      <motion.div
        className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col lg:flex-row items-center gap-12"
        style={{ y, opacity }}
      >
        {/* Left Side: Traditional Intro but stylized */}
        <div className="flex-1 text-center lg:text-left z-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 border border-brand-500/30 shadow-[0_0_15px_rgba(99,102,241,0.2)]"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm text-text-secondary font-medium tracking-wide">SYSTEM_ONLINE // Avail. for work</span>
          </motion.div>

          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl font-bold font-display leading-[1.1] mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <span className="text-text-primary">Hi, I'm</span>
            <br />
            <span className="text-brand-600 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-brand-500 dark:to-cyan-500 tracking-tight">Rana Darpan</span>
          </motion.h1>

          {/* Role */}
          <motion.div
            className="text-xl sm:text-2xl text-text-secondary font-mono mb-8 h-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <span className="text-brand-500 dark:text-brand-400">&gt; </span>
            <Typewriter
              words={['Full Stack Developer', 'React / Next.js Developer', 'Competitive Programmer']}
              loop={true}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={2000}
            />
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center lg:justify-start gap-4 mb-10"
          >
            <motion.a
              href="#projects"
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                playClick();
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white transition-all duration-300 relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              }}
              whileHover={{ scale: 1.05, y: -2, boxShadow: '0 10px 25px -5px rgba(99, 102, 241, 0.5)' }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
              <span className="relative z-10 flex items-center gap-2">
                Execute Projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.a>

            <motion.a
              href="https://drive.google.com/file/d/1tzHwm0cJdd09t8qs1baYtb5SflNZtV_w/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClick}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-text-secondary glass hover:bg-black/10 dark:hover:bg-white/10 hover:text-text-primary transition-all duration-300 border border-black/10 dark:border-slate-600/50 hover:border-brand-400/50"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Resume.pdf
            </motion.a>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex justify-center lg:justify-start gap-3"
          >
            {[
              { Icon: Github, href: 'https://github.com/RanaDarpan/', label: 'GitHub', color: 'hover:text-text-primary hover:border-black/20 dark:hover:border-white/20' },
              { Icon: Linkedin, href: 'https://www.linkedin.com/in/ranadarpan/', label: 'LinkedIn', color: 'hover:text-[#0077b5] hover:border-[#0077b5]' },
              { Icon: Code2, href: 'https://leetcode.com/u/Rana_Darpan/', label: 'LeetCode', color: 'hover:text-orange-400 hover:border-orange-400' },
              { Icon: Terminal, href: 'https://codeforces.com/profile/Error200', label: 'Codeforces', color: 'hover:text-blue-400 hover:border-blue-400' },
              { Icon: Mail, href: 'mailto:ranadarpan0@gmail.com', label: 'Email', color: 'hover:text-rose-400 hover:border-rose-400' },
            ].map(({ Icon, href, label, color }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                onClick={playClick}
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className={`p-3 rounded-xl glass text-text-secondary border border-transparent transition-all duration-300 ${color}`}
              >
                <Icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Right Side: IDE Simulator */}
        <motion.div
          className="flex-1 w-full max-w-lg z-20 hidden md:block"
          initial={{ opacity: 0, x: 50, rotateY: 15 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
        >
          <div className="rounded-2xl overflow-hidden glass-strong shadow-2xl border border-black/10 dark:border-slate-700/50 backdrop-blur-xl">
            {/* Window Header */}
            <div className="bg-slate-900/90 px-4 py-3 flex items-center gap-2 border-b border-slate-800">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
              </div>
              <div className="flex-1 text-center text-xs font-mono text-slate-400">
                developer.js— Portfolio
              </div>
            </div>

            {/* Editor Content */}
            <div className="p-6 font-mono text-sm sm:text-base leading-relaxed overflow-x-auto text-slate-300 bg-[#0d1117] h-[320px]">
              <div className="flex">
                <div className="text-slate-600 select-none pr-4 text-right border-r border-slate-800 mr-4 flex flex-col">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(n => <span key={n}>{n}</span>)}
                </div>
                <div className="flex-1 text-left whitespace-pre">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                  >
                    <span className="text-rose-400">const</span>{' '}
                    <span className="text-blue-400">developer</span>{' '}
                    <span className="text-slate-300">=</span>{' '}
                    <span className="text-amber-300">{"{"}</span>
                    <br />
                    {'  '}name: <span className="text-green-400">'Rana Darpan'</span>,
                    <br />
                    {'  '}role: <span className="text-green-400">'Full Stack Engineer'</span>,
                    <br />
                    {'  '}skills: <span className="text-purple-400">[</span>
                    <br />
                    {'    '}<span className="text-green-400">'React'</span>,{' '}
                    <span className="text-green-400">'Node.js'</span>,{' '}
                    <span className="text-green-400">'MongoDB'</span>,
                    <br />
                    {'    '}<span className="text-green-400">'Next js'</span>,{' '}
                    <span className="text-green-400">'Tailwind'</span>
                    <br />
                    {'  '}<span className="text-purple-400">]</span>,
                    <br />
                    {'  '}isCoding: <span className="text-orange-400">true</span>,
                    <br />
                    {'  '}drinkCoffee: <span className="text-blue-400">()</span> <span className="text-rose-400">=&gt;</span> <span className="text-amber-300">{"{"}</span>
                    <br />
                    {'    '}<span className="text-rose-400">return</span> <span className="text-green-400">'Code automatically generated'</span>;
                    <br />
                    {'  '}<span className="text-amber-300">{"}"}</span>
                    <br />
                    <span className="text-amber-300">{"}"}</span><span className="text-slate-300">;</span>
                  </motion.div>
                  <motion.div
                    className="inline-block w-2 bg-brand-400 h-5 align-middle ml-1"
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 cursor-pointer"
        onClick={() => {
          playClick();
          document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <div className="flex flex-col items-center gap-2 group">
          <span className="text-xs text-text-secondary font-mono uppercase tracking-widest group-hover:text-brand-500 dark:group-hover:text-brand-400 transition-colors">Scroll</span>
          <ChevronDown className="w-6 h-6 text-brand-500 dark:text-brand-400 group-hover:translate-y-1 transition-transform" />
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
