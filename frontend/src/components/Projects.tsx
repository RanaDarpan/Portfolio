import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, Eye, LayoutGrid } from 'lucide-react';
import { useData } from '../context/DataContext';
import ProjectModal from './ProjectModal';
import { useSound } from '../hooks/useSound';
import type { Project } from '../types';

const Projects = () => {
  const { data, getImageUrl } = useData();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const { playClick } = useSound();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const categories = useMemo(() => {
    const tags = new Set<string>();
    data.projects.forEach(p => p.tags.forEach(tag => tags.add(tag)));
    return ['All', ...Array.from(tags).slice(0, 4)];
  }, [data.projects]);

  const filteredProjects = useMemo(() => {
    return activeFilter === 'All'
      ? data.projects
      : data.projects.filter(p => p.tags.includes(activeFilter));
  }, [data.projects, activeFilter]);

  return (
    <>
      <section className="relative section-padding overflow-hidden z-10" id="projects">
        <div className="absolute inset-0 mesh-gradient opacity-10 dark:opacity-40" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 relative z-20"
          >
            <div className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-brand-500/10 border border-brand-500/20 mb-6 shadow-[0_0_15px_rgba(99,102,241,0.15)]">
              <LayoutGrid className="w-5 h-5 text-brand-500 dark:text-brand-400" />
              <span className="text-brand-500 dark:text-brand-400 font-bold text-sm tracking-widest uppercase">
                Portfolio Showcase
              </span>
            </div>
            {/* Extremely solid layout for the title to prevent clipping bugs */}
            <h2 className="text-5xl md:text-6xl font-bold font-display text-text-primary mb-6 tracking-tight drop-shadow-sm">
              Featured <span className="text-brand-600 dark:text-brand-400">Projects</span>
            </h2>
            <p className="max-w-2xl mx-auto text-text-secondary text-lg">
              Here are some of my most recent works. These projects showcase my expertise in building scalable, real-world applications using modern tech stacks.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  playClick();
                  setActiveFilter(category);
                }}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border ${
                  activeFilter === category
                    ? 'bg-brand-500 text-white border-brand-500 shadow-lg shadow-brand-500/25'
                    : 'glass text-text-secondary border-black/5 dark:border-white/5 hover:text-text-primary hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* AnimatePresence for layout shuffling */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
                  key={project.id}
                  className="card-3d h-full group"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div
                    className="glass rounded-3xl overflow-hidden gradient-border cursor-pointer h-full flex flex-col shadow-[0_8px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)] group-hover:shadow-[0_20px_40px_rgba(99,102,241,0.15)] transition-shadow duration-500"
                    onClick={() => {
                      playClick();
                      setSelectedProject(project);
                    }}
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden aspect-video">
                      <div className="absolute inset-0 bg-brand-500/10 group-hover:bg-transparent transition-colors z-10 custom-blend-overlay" />
                      <img
                        src={getImageUrl(project.image)}
                        alt={project.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                        loading="lazy"
                      />
                      
                      {/* Overlay actions */}
                      <div className={`absolute inset-0 bg-bg-primary/80 backdrop-blur-sm z-20 flex items-center justify-center gap-4 transition-opacity duration-300 ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'}`}>
                        <motion.a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative z-10 p-3.5 rounded-xl glass text-text-primary hover:bg-black/10 dark:hover:bg-white/20 transition-all border border-black/10 dark:border-white/10"
                          whileHover={{ scale: 1.15, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e: any) => {
                            playClick();
                            e.stopPropagation();
                          }}
                        >
                          <Github className="w-5 h-5" />
                        </motion.a>
                        <motion.button
                          className="relative z-10 p-3.5 rounded-xl bg-brand-500 text-white hover:bg-brand-400 transition-all shadow-[0_0_20px_rgba(99,102,241,0.5)] border border-brand-400/50"
                          whileHover={{ scale: 1.15, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e: any) => {
                            e.stopPropagation();
                            playClick();
                            setSelectedProject(project);
                          }}
                        >
                          <Eye className="w-5 h-5" />
                        </motion.button>
                        <motion.a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative z-10 p-3.5 rounded-xl glass text-text-primary hover:bg-black/10 dark:hover:bg-white/20 transition-all border border-black/10 dark:border-white/10"
                          whileHover={{ scale: 1.15, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e: any) => {
                            playClick();
                            e.stopPropagation();
                          }}
                        >
                          <ExternalLink className="w-5 h-5" />
                        </motion.a>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 md:p-8 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold font-display text-text-primary mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                        {project.description}
                      </p>
                      <div className="mt-auto flex flex-wrap gap-2">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-semibold"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 3 && (
                          <span className="px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 text-text-secondary text-xs font-medium border border-glass-border">
                            +{project.tags.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Project details modal */}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => {
            playClick();
            setSelectedProject(null);
          }} 
        />
      )}
    </>
  );
};

export default Projects;