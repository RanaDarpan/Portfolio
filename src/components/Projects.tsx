import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github } from 'lucide-react';
import ProjectModal from './ProjectModal';

const projects = [
  {
    title: "Personal Portfolio Site ",
    description: "A dynamic and interactive portfolio showcasing my skills as a Full Stack Developer with modern UI, animations, and a seamless user experience.",
    longDescription: "This portfolio highlights my expertise in full-stack development, featuring a clean and modern design with smooth animations. It includes sections for my personal details, social media links, and downloadable CV, all built with responsive design and attention to user experience. The website reflects my skills in React,Framer motion , Taiwind CSS, and modern web technologies, ensuring a visually appealing and functional interface.",
    image: "src/Assets/portfolio .jpg",
    tags: ["React", "Tailwind", "Framer motion ","Emailjs"],
    githubLink: "https://github.com/RanaDarpan/Fitplay",
    liveLink: "https://example.com",
    features: [
      "Interactive Design",
      "Responsive Layout",
      "Downloadable CV",
      "Feedback integartion ",
      "Email-js"
    ]
  },
  {
    title: "Fitplay",
    description: "A full-featured online Fitplay Sport Application buit using the react snd firebase.",
    longDescription: "FitPlay is a web application designed to help users achieve their fitness goals through personalized workout plans, progress tracking, and rewards for completed tasks. This app is built using modern technologies to offer a seamless user experience and real-time fitness insights.",
    image: "src/Assets/fitplay.jpg",
    tags: ["React", "Tailwind", "Firebase-Authentication","Firebase-File_storage", "Cloud","RapidAPI"],
    githubLink: "https://github.com/RanaDarpan/Fitplay",
    liveLink: "https://example.com",
    features: [
      "User authentication and authorization",
      "Profile Management",
      "Task Progress Tracking:",
      "Reward Points",
      "AI generated Suggestions ",
      "Social Interaction",
      "Responsive"
    ]
  },
  {
    title: "Gemini-Clone",
    description: "A beautiful and intuitive Gemini-clone chatbot application",
    longDescription: "This is a Gemini Clone built using React and Vite. The project was created as a learning exercise and covers various modern web development techniques, including API integration, custom hooks, and responsive design.",
    image: "src/Assets/Gemini-Clone.jpg",
    tags: ["React", "Taiwind", "Gemini API","Vite"],
    githubLink: "https://github.com/RanaDarpan/Gemini-Clone",
    liveLink: "https://geminiclone-rana.vercel.app/",
    features: [
      "Gemini API integration",
      "Light and Dark Themes",
      "Responsive Design",
      "User Prompt Sidebar",
      "Text Formatting"
    ]
  },
  {
    title: "Super Calculator",
    description: "It's simple Calculator for revising the concepts of the JS and frontend.",
    longDescription: "Super Calculator is a web-based calculator built using HTML, CSS, and JavaScript. It supports basic arithmetic operations and provides a user-friendly interface with colorful animations. The application is designed to be interactive and responsive, making it suitable for both desktop and mobile use.",
    image: "src/Assets/cal.jpg",
    tags: ["HTML5", "CSS3", "JS"],
    githubLink: "https://github.com/RanaDarpan/Calculator",
    liveLink: " https://ranadarpan.github.io/Calculator/ ",
    features: [
      "Basic Operations: Addition, subtraction, multiplication, and division.",
      "Clear Functionality",
      "Responsive Design",
      "Interactive UI",
      "Dynamic Color Changing Background"
    ]
  }
];

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  return (
    <>
      <section className="py-20 bg-gray-900" id="projects">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-4xl font-bold text-white text-center mb-16"
          >
            Featured Projects
          </motion.h2>

          <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative group">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github className="w-8 h-8 text-white" />
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink className="w-8 h-8 text-white" />
                    </motion.div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 bg-cyan-400/10 text-cyan-400 text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ProjectModal
        project={selectedProject!}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
};

export default Projects;