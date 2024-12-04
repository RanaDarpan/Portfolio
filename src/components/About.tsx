import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import profile from '../Assets/profile.png'; // Importing the profile image

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const deltaX = (clientX - centerX) * 0.1;
    const deltaY = (clientY - centerY) * 0.1;

    const photo = document.querySelector('.photo');
    if (photo) {
      photo.style.transform = `perspective(600px) rotateY(${deltaX}deg) rotateX(${-deltaY}deg) scale(1.1)`;
    }
  };

  const handleMouseLeave = () => {
    const photo = document.querySelector('.photo');
    if (photo) {
      photo.style.transform = `perspective(600px) rotateY(0deg) rotateX(0deg) scale(1)`;
    }
  };

  return (
    <section className="py-20 bg-gray-800" id="about">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-6">About Me</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            I am Rana Darpan, a passionate web developer with experience in modern web technologies like React, JavaScript, and Tailwind CSS. I have worked on diverse projects, including fitness tracking, food waste management, and AI/ML models like crop recommendation and stock price prediction. I am driven by a curiosity to learn and create innovative solutions in technology.
          </p>
        </motion.div>

        {/* Profile Photo */}
        <motion.div
          className="relative flex justify-center items-center mb-16"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="photo w-48 h-48 rounded-full overflow-hidden bg-gray-300 shadow-lg transition-all duration-300 ease-in-out"
          >
            <img
              src={profile}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Buttons */}
        <motion.div
          className="flex justify-center gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <motion.a
            href="src/Assets/Resume.pdf"
            target="_blank"
            className="px-8 py-3 bg-cyan-400 text-white rounded-full shadow-lg transition-transform transform hover:scale-110"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Resume
          </motion.a>
          <motion.a
            href="#contact"
            className="px-8 py-3 bg-gray-700 text-white rounded-full shadow-lg transition-transform transform hover:scale-110"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
