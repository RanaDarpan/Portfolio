import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code2, Database, Github, Brain } from 'lucide-react';

const skillCategories = [
  {
    title: "Frontend Development",
    icon: Code2,
    skills: [
      { name: "HTML5", level: 90 },
      { name: "CSS3", level: 85 },
      { name: "React", level: 70 },
      { name: "Tailwind CSS", level: 80 },
      { name: "JavaScript (ES6+)", level: 80 }
    ]
  },
  {
    title: "Backend Development",
    icon: Database,
    skills: [
      { name: "Python", level: 70 },
      { name: "PHP", level: 60 }
    ]
  },
  {
    title: "Database & Tools",
    icon: Github,
    skills: [
      { name: "Firebase", level: 75 },
      { name: "MySQL", level: 60 },
      { name: "Git/GitHub", level: 88 },
      { name: "VS Code", level: 90 }
    ]
  },
  {
    title: "Other Skills",
    icon: Brain,
    skills: [
      { name: "AI/ML Basics", level: 60 },
      { name: "Data Visualization", level: 78 }
    ]
  }
];

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="py-20 bg-gray-900" id="skills">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-4xl font-bold text-white text-center mb-16"
        >
          Skills & Expertise
        </motion.h2>

        <div ref={ref} className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-gray-800 p-6 rounded-lg"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-cyan-400 rounded-lg flex items-center justify-center mr-4">
                    <Icon className="w-6 h-6 text-gray-900" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{category.title}</h3>
                </div>

                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex}>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-300">{skill.name}</span>
                        <span className="text-cyan-400">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${skill.level}%` } : {}}
                          transition={{ duration: 1, delay: skillIndex * 0.1 }}
                          className="bg-cyan-400 h-2 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;