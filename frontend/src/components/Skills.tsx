import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MonitorSmartphone, Database, Wrench, Brain } from 'lucide-react';
import { useSound } from '../hooks/useSound';

const skillCategories = [
  {
    id: 'frontend',
    title: 'Frontend',
    icon: MonitorSmartphone,
    color: '#6366f1',
    description: 'UI & Web',
    skills: [
      { name: 'HTML5', level: 90 },
      { name: 'CSS3', level: 85 },
      { name: 'React', level: 70 },
      { name: 'Tailwind CSS', level: 80 },
      { name: 'JavaScript (ES6+)', level: 80 },
      { name: 'TypeScript', level: 75 },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    icon: Database,
    color: '#8b5cf6',
    description: 'Server & API',
    skills: [
      { name: 'Node.js', level: 75 },
      { name: 'Express', level: 70 },
      { name: 'Python', level: 70 },
      { name: 'PHP', level: 60 },
    ],
  },
  {
    id: 'database',
    title: 'DB & Tools',
    icon: Wrench,
    color: '#06b6d4',
    description: 'Data & DevOps',
    skills: [
      { name: 'MongoDB', level: 80 },
      { name: 'Firebase', level: 75 },
      { name: 'MySQL', level: 60 },
      { name: 'Git/GitHub', level: 88 },
      { name: 'VS Code', level: 90 },
    ],
  },
  {
    id: 'other',
    title: 'Other',
    icon: Brain,
    color: '#ec4899',
    description: 'AI & Problem Solving',
    skills: [
      { name: 'AI/ML Basics', level: 60 },
      { name: 'Data Visualization', level: 78 },
      { name: 'Problem Solving', level: 95 },
    ],
  },
];

const Skills = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [activeCategory, setActiveCategory] = useState(skillCategories[0].id);
  const { playClick } = useSound();

  const activeCategoryData = skillCategories.find(c => c.id === activeCategory);

  return (
    <section className="relative section-padding overflow-hidden" id="skills">
      <div className="absolute inset-0 mesh-gradient opacity-10 dark:opacity-30" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <span className="inline-block text-brand-500 dark:text-brand-400 font-semibold text-sm tracking-widest uppercase mb-4">
            Technical Arsenal
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-display text-text-primary">
            Skills & <span className="gradient-text">Expertise</span>
          </h2>
        </motion.div>

        <div ref={ref} className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">

          {/* ── MOBILE: 2×2 Icon Grid ── */}
          <div className="w-full md:hidden grid grid-cols-2 gap-3">
            {skillCategories.map((category) => {
              const Icon = category.icon;
              const isActive = activeCategory === category.id;
              return (
                <motion.button
                  key={category.id}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => {
                    if (!isActive) playClick();
                    setActiveCategory(category.id);
                  }}
                  className="relative flex flex-col items-center justify-center gap-2 p-4 rounded-2xl transition-all duration-300 overflow-hidden"
                  style={{
                    background: isActive
                      ? `linear-gradient(135deg, ${category.color}22, ${category.color}10)`
                      : 'var(--glass-bg)',
                    border: isActive
                      ? `2px solid ${category.color}60`
                      : '2px solid transparent',
                    boxShadow: isActive
                      ? `0 0 18px ${category.color}30, inset 0 0 12px ${category.color}08`
                      : 'none',
                  }}
                >
                  {/* Glow dot indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="mobile-active-indicator"
                      className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full"
                      style={{ backgroundColor: category.color, boxShadow: `0 0 6px ${category.color}` }}
                    />
                  )}

                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{
                      background: isActive ? `${category.color}20` : 'rgba(150,150,150,0.1)',
                    }}
                  >
                    <Icon
                      className="w-6 h-6 transition-all duration-300"
                      style={{ color: isActive ? category.color : 'var(--text-muted)' }}
                    />
                  </div>

                  {/* Label */}
                  <div className="text-center">
                    <p
                      className="text-sm font-bold font-display leading-tight"
                      style={{ color: isActive ? category.color : 'var(--text-primary)' }}
                    >
                      {category.title}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                      {category.description}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* ── DESKTOP: Left Sidebar List ── */}
          <div className="hidden md:flex w-full md:w-1/3 flex-col gap-3">
            {skillCategories.map((category) => {
              const Icon = category.icon;
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => {
                    if (!isActive) playClick();
                    setActiveCategory(category.id);
                  }}
                  className={`flex items-center gap-3 w-full text-left p-4 rounded-2xl transition-all duration-300 group ${
                    isActive
                      ? 'border-l-4 shadow-sm dark:shadow-lg dark:shadow-brand-500/10'
                      : 'hover:bg-black/5 dark:hover:bg-white/5 text-text-secondary hover:text-text-primary border-l-4 border-transparent'
                  }`}
                  style={isActive ? {
                    background: `linear-gradient(90deg, ${category.color}18, transparent)`,
                    borderLeftColor: category.color,
                  } : {}}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${isActive ? '' : 'grayscale opacity-60'}`}
                    style={{ background: isActive ? `${category.color}20` : 'rgba(150,150,150,0.1)' }}
                  >
                    <Icon className="w-5 h-5" style={{ color: isActive ? category.color : 'currentColor' }} />
                  </div>
                  <span className={`font-semibold font-display tracking-wide ${isActive ? 'text-text-primary' : ''}`}>
                    {category.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ── Skills Detail Panel ── */}
          <div className="w-full md:w-2/3 glass-strong rounded-3xl p-6 md:p-8 lg:p-10 min-h-[320px] md:min-h-[400px] border border-black/5 dark:border-white/10 relative overflow-hidden">
            {/* Color glow orb */}
            <AnimatePresence>
              {activeCategoryData && (
                <motion.div
                  key={`glow-${activeCategoryData.id}`}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 0.1,
                    background: `radial-gradient(circle at 100% 0%, ${activeCategoryData.color}, transparent 55%)`,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 z-0 pointer-events-none"
                />
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {activeCategoryData && (
                <motion.div
                  key={activeCategoryData.id}
                  initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -16, filter: 'blur(8px)' }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="space-y-6 relative z-10"
                >
                  {/* Panel Header */}
                  <div className="flex items-center gap-4 pb-5 border-b border-black/10 dark:border-white/10">
                    <div
                      className="p-3 rounded-2xl flex-shrink-0"
                      style={{ backgroundColor: `${activeCategoryData.color}18` }}
                    >
                      <activeCategoryData.icon className="w-6 h-6 md:w-7 md:h-7" style={{ color: activeCategoryData.color }} />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold font-display text-text-primary tracking-tight">
                        {activeCategoryData.title}
                      </h3>
                      <p className="text-text-secondary text-xs md:text-sm font-medium mt-0.5">
                        Core proficiencies & technologies
                      </p>
                    </div>
                  </div>

                  {/* Skill Bars */}
                  <div className="space-y-5">
                    {activeCategoryData.skills.map((skill, index) => {
                      const profLabel =
                        skill.level >= 85 ? 'Expert' :
                        skill.level >= 70 ? 'Advanced' :
                        skill.level >= 55 ? 'Proficient' : 'Familiar';
                      const dots = skill.level >= 85 ? 5 : skill.level >= 70 ? 4 : skill.level >= 55 ? 3 : 2;

                      return (
                        <div key={skill.name} className="group/skill">
                          <div className="flex justify-between mb-2 items-center">
                            <span className="text-sm font-semibold text-text-primary tracking-wide">
                              {skill.name}
                            </span>
                            <div className="flex items-center gap-1.5">
                              {/* Dots */}
                              <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map(d => (
                                  <motion.div
                                    key={d}
                                    initial={{ scale: 0 }}
                                    animate={inView ? { scale: 1 } : {}}
                                    transition={{ delay: index * 0.08 + d * 0.04, type: 'spring' }}
                                    className="w-1.5 h-1.5 rounded-full"
                                    style={{
                                      backgroundColor: d <= dots
                                        ? activeCategoryData.color
                                        : 'rgba(150,150,150,0.2)',
                                      boxShadow: d <= dots ? `0 0 4px ${activeCategoryData.color}70` : 'none',
                                    }}
                                  />
                                ))}
                              </div>
                              {/* Badge */}
                              <span
                                className="text-xs font-semibold px-1.5 py-0.5 rounded-full"
                                style={{
                                  backgroundColor: `${activeCategoryData.color}15`,
                                  color: activeCategoryData.color,
                                }}
                              >
                                {profLabel}
                              </span>
                            </div>
                          </div>
                          {/* Progress bar */}
                          <div
                            className="w-full rounded-full h-1.5 overflow-hidden"
                            style={{ backgroundColor: 'rgba(150,150,150,0.12)' }}
                          >
                            <motion.div
                              initial={{ width: 0 }}
                              animate={inView ? { width: `${skill.level}%` } : {}}
                              transition={{
                                duration: 1.2,
                                delay: index * 0.08,
                                ease: [0.23, 1, 0.32, 1],
                              }}
                              className="h-full rounded-full relative overflow-hidden group-hover/skill:brightness-110 transition-all duration-300"
                              style={{
                                background: `linear-gradient(90deg, ${activeCategoryData.color}aa, ${activeCategoryData.color})`,
                              }}
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite]" />
                            </motion.div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Skills;