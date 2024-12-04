import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase } from 'lucide-react';

const experiences = [
  {
    title: "Intern - IBM SkillsBuild",
    company: "IBM",
    period: "14 Days",
    description:
      "Gained hands-on experience in developing machine learning models, focusing on supervised learning techniques like span detection and crop recommendation.",
  },
  {
    title: "SSIP Grantee - IoT Project",
    company: "GTU (SSIP Grant)",
    period: "1 Month Project",
    description:
      "Worked on IoT-based smart glasses for visually impaired individuals, integrating natural language processing, real-world object detection using machine learning, and Raspberry Pi 4.",
  },
  {
    title: "Hackathon Winner",
    company: "College Level Hackathon",
    period: "2023",
    description:
      "Won the competition by developing a Food Waste Management website using React, Tailwind CSS, and Firebase.",
  },
  {
    title: "Intern - Udemy Web Development",
    company: "Udemy",
    period: "21 Days",
    description:
      "Built projects using advanced JavaScript concepts, including interactive and dynamic web pages.",
  },
  {
    title: "Web Development Projects",
    company: "Freelance",
    period: "Ongoing",
    description:
      "Developed web applications like a personal portfolio, FitPlay fitness website, and food waste management system using React, Tailwind CSS, PHP, and Firebase.",
  },
];

const education = [
  {
    title: "BE in Computer Engineering",
    institution: "VGEC",
    period: "2024(pursing)",
    description: "",
  },
  {
    title: "Diploma in IT",
    institution: "B&B Institute of Technology, Anand",
    period: "2021 - 2024",
    description: "Graduating with a 9.75 CPI.",
  },
  {
    title: "Secondary Education (10th)",
    institution: "Shree Sarvajanik High School",
    period: "2021",
    description: "Achieved 91.33%.",
  },
];

const Experience = () => {
  const [refExp, inViewExp] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [refEdu, inViewEdu] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 bg-gray-900 text-white" id="experience">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inViewExp ? { opacity: 1, y: 0 } : {}}
          className="text-4xl font-bold text-center mb-16"
        >
          Experience & Achievements
        </motion.h2>

        <div ref={refExp} className="relative">
          <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gray-700" />

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={inViewExp ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.3, type: "spring", stiffness: 50 }}
              className={`relative flex items-center mb-12 ${
                index % 2 === 0 ? 'justify-end' : ''
              }`}
            >
              <div
                className={`w-5/12 ${
                  index % 2 === 0 ? 'text-right pr-8' : 'pl-8'
                }`}
              >
                <div className="bg-gray-800 p-6 rounded-lg shadow-xl hover:shadow-cyan-400 transition-shadow duration-300">
                  <h3 className="text-xl font-bold text-cyan-400">{exp.title}</h3>
                  <p className="text-gray-400 mb-2">{exp.company}</p>
                  <p className="text-sm text-gray-500 mb-4">{exp.period}</p>
                  <p className="text-gray-300">{exp.description}</p>
                </div>
              </div>

              <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-12 h-12 rounded-full bg-cyan-400 flex items-center justify-center shadow-lg">
                  <Briefcase className="w-6 h-6 text-gray-900" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inViewEdu ? { opacity: 1, y: 0 } : {}}
          className="text-4xl font-bold text-center mt-20 mb-16"
        >
          Education
        </motion.h2>

        <div ref={refEdu} className="relative">
          <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gray-700" />

          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={inViewEdu ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.3, type: "spring", stiffness: 50 }}
              className={`relative flex items-center mb-12 ${
                index % 2 === 0 ? 'justify-end' : ''
              }`}
            >
              <div
                className={`w-5/12 ${
                  index % 2 === 0 ? 'text-right pr-8' : 'pl-8'
                }`}
              >
                <div className="bg-gray-800 p-6 rounded-lg shadow-xl hover:shadow-cyan-400 transition-shadow duration-300">
                  <h3 className="text-xl font-bold text-cyan-400">{edu.title}</h3>
                  <p className="text-gray-400 mb-2">{edu.institution}</p>
                  <p className="text-sm text-gray-500 mb-4">{edu.period}</p>
                  <p className="text-gray-300">{edu.description}</p>
                </div>
              </div>

              <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-12 h-12 rounded-full bg-cyan-400 flex items-center justify-center shadow-lg">
                  <Briefcase className="w-6 h-6 text-gray-900" />
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
