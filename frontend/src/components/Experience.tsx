import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase, GraduationCap } from 'lucide-react';

const experiences = [
  {
    title: 'Intern - IBM SkillsBuild',
    company: 'IBM',
    period: '14 Days',
    description: 'Gained hands-on experience in developing machine learning models, focusing on supervised learning techniques like spam detection and crop recommendation.',
  },
  {
    title: 'SSIP Grantee - IoT Project',
    company: 'GTU (SSIP Grant)',
    period: '1 Month Project',
    description: 'Worked on IoT-based smart glasses for visually impaired individuals, integrating NLP, real-world object detection using ML, and Raspberry Pi 4.',
  },
  {
    title: 'Hackathon Winner',
    company: 'College Level Hackathon',
    period: '2023',
    description: 'Won the competition by developing a Food Waste Management website using React, Tailwind CSS, and Firebase.',
  },
  {
    title: 'Intern - Udemy Web Development',
    company: 'Udemy',
    period: '21 Days',
    description: 'Built projects using advanced JavaScript concepts, including interactive and dynamic web pages.',
  },
  {
    title: 'Web Development Projects',
    company: 'Freelance',
    period: 'Ongoing',
    description: 'Developed web applications like a personal portfolio, FitPlay fitness website, and food waste management system.',
  },
];

const education = [
  {
    title: 'BE in Computer Engineering',
    institution: 'VGEC',
    period: '2024 (Pursuing)',
    description: '',
  },
  {
    title: 'Diploma in IT',
    institution: 'B&B Institute of Technology, Anand',
    period: '2021 - 2024',
    description: 'Graduated with a 9.75 CPI.',
  },
  {
    title: 'Secondary Education (10th)',
    institution: 'Shree Sarvajanik High School',
    period: '2021',
    description: 'Achieved 91.33%.',
  },
];

const Experience = () => {
  const [refExp, inViewExp] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [refEdu, inViewEdu] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section className="relative section-padding overflow-hidden" id="experience">
      <div className="absolute inset-0 mesh-gradient opacity-10 dark:opacity-40" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Experience */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inViewExp ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="inline-block text-brand-500 dark:text-brand-400 font-semibold text-sm tracking-widest uppercase mb-4">
            My journey
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-display text-text-primary">
            Experience & <span className="gradient-text">Achievements</span>
          </h2>
        </motion.div>

        <div ref={refExp} className="relative max-w-3xl mx-auto mb-24">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-brand-500/50 via-purple-500/30 to-transparent" />

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inViewExp ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className={`relative flex items-start mb-10 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Dot */}
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 mt-1 z-10">
                <div className="timeline-dot" />
              </div>

              {/* Card */}
              <div
                className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${
                  index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
                }`}
              >
                <div className="glass rounded-2xl p-5 md:p-6 gradient-border group hover:bg-black/5 dark:hover:bg-white/[0.08] hover:scale-[1.02] hover:-translate-y-1.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] hover:shadow-brand-500/20 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-3">
                    <Briefcase className="w-4 h-4 text-brand-500 dark:text-brand-400" />
                    <span className="text-xs text-text-secondary font-mono uppercase tracking-wider">
                      {exp.period}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-text-primary mb-1">{exp.title}</h3>
                  <p className="text-brand-600 dark:text-brand-400 text-sm font-medium mb-3">{exp.company}</p>
                  <p className="text-text-secondary text-sm leading-relaxed">{exp.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inViewEdu ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="inline-block text-cyan-500 dark:text-cyan-400 font-semibold text-sm tracking-widest uppercase mb-4">
            Academic background
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-display text-text-primary">
            <span className="gradient-text">Education</span>
          </h2>
        </motion.div>

        <div ref={refEdu} className="relative max-w-3xl mx-auto">
          <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-brand-500/30 to-transparent" />

          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inViewEdu ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className={`relative flex items-start mb-10 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 mt-1 z-10">
                <div className="w-4 h-4 rounded-full bg-gradient-to-br from-cyan-400 to-brand-500 shadow-lg shadow-cyan-500/20">
                  <div className="absolute -inset-1 rounded-full border-2 border-cyan-400/30" />
                </div>
              </div>

              <div
                className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${
                  index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
                }`}
              >
                <div className="glass rounded-2xl p-5 md:p-6 gradient-border group hover:bg-black/5 dark:hover:bg-white/[0.08] hover:scale-[1.02] hover:-translate-y-1.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] hover:shadow-cyan-500/20 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-3">
                    <GraduationCap className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
                    <span className="text-xs text-text-secondary font-mono uppercase tracking-wider">
                      {edu.period}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-text-primary mb-1">{edu.title}</h3>
                  <p className="text-cyan-600 dark:text-cyan-400 text-sm font-medium mb-3">{edu.institution}</p>
                  {edu.description && (
                    <p className="text-text-secondary text-sm leading-relaxed">{edu.description}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
