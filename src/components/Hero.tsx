import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, Linkedin, Mail, ChevronDown } from 'lucide-react';
import { Typewriter } from 'react-simple-typewriter';

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-hidden">
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ y, opacity }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/90" />
      </motion.div>

      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at center, rgba(31, 41, 55, 0.6), rgba(15, 23, 42, 1))',
        }}
        animate={{
          backgroundPosition: ['50% 50%', '0% 100%', '100% 0%', '50% 50%'],
          backgroundSize: ['100% 100%', '110% 110%', '100% 100%'],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />


      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 rounded-full bg-cyan-400/50"
            initial={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              scale: 0.5,
            }}
            animate={{
              top: ['0%', '100%', '0%'],
              left: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              scale: [0.5, 1, 0.5],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: Math.random() * 10 + 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-4 min-h-screen flex items-center relative z-10">
        <div className="grid md:grid-cols-1 gap-12 items-center w-full">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-6xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Hi, I'm{' '}
              <span className="text-cyan-400">
                <Typewriter
                  words={['Rana Darpan']}
                  loop={true}
                  cursor
                  cursorStyle="|"
                  typeSpeed={120}
                  deleteSpeed={80}
                  delaySpeed={2000}
                />
              </span>
            </motion.h1>

            <motion.h2
              className="text-2xl text-gray-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Typewriter
                words={['Full Stack Developer']}
                loop={true}
                cursor
                cursorStyle="|"
                typeSpeed={120}
                deleteSpeed={80}
                delaySpeed={2000}
              />
            </motion.h2>

            <motion.p
              className="text-gray-400 mb-8 text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Crafting beautiful and functional web experiences with modern technologies.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex gap-6 mb-12"
            >
              {[
                { Icon: Github, href: 'https://github.com/RanaDarpan/' },
                { Icon: Linkedin, href: 'https://www.linkedin.com/in/ranadarpan/' },
                { Icon: Mail, href: 'https://ranadarpan0@gmail.com' },
              ].map(({ Icon, href }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors"
                >
                  <Icon className="w-6 h-6" />
                </motion.a>
              ))}
            </motion.div>

            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="flex justify-center mt-8"
            >
              <motion.a
                href="src/Assets/Resume.pdf"
                download
                className="inline-block relative group"
              >
                <motion.button
                  href="src/Assets/Resume.pdf"
                  className="px-6 py-3 text-lg font-semibold text-white bg-transparent border-2 border-cyan-400 rounded-lg transition-all duration-300 ease-in-out transform group-hover:scale-105 group-hover:bg-cyan-400 group-hover:text-gray-900 hover:shadow-2xl"
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: '#06b6d4', 
                    color: '#111827', 
                  }}
                  transition={{
                    duration: 0.3,
                    type: 'spring',
                    stiffness: 300,
                  }}
                >
                  Download CV
                  <span className="absolute inset-0 w-full h-full border-2 border-cyan-400 rounded-lg opacity-0 group-hover:opacity-100 transition-all" />
                </motion.button>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <ChevronDown className="w-8 h-8 text-cyan-400" />
      </motion.div>
    </div>
  );
};

export default Hero;
