import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, Eye, LayoutGrid, ChevronLeft, ChevronRight } from 'lucide-react';
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
    if (data.filterTags && data.filterTags.length > 0) {
      return ['All', ...data.filterTags];
    }
    const tags = new Set<string>();
    data.projects.forEach(p => p.tags.forEach(tag => tags.add(tag)));
    return ['All', ...Array.from(tags)];
  }, [data.projects, data.filterTags]);

  const filteredProjects = useMemo(() => {
    return activeFilter === 'All'
      ? data.projects
      : data.projects.filter(p => p.tags.includes(activeFilter));
  }, [data.projects, activeFilter]);

  const handleFilterChange = (category: string) => {
    playClick();
    setActiveFilter(category);
  };

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
                onClick={() => handleFilterChange(category)}
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
          <motion.div 
            layout 
            className="flex flex-row gap-6 md:gap-10 overflow-x-auto pb-16 pt-8 px-4 sm:px-6 lg:px-8 snap-x snap-mandatory custom-scrollbar"
            style={{ scrollBehavior: 'smooth' }}
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.8, x: 100 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: -100 }}
                  transition={{ duration: 0.5, type: "spring", stiffness: 80 }}
                  key={project.id}
                  className="h-[65vh] min-h-[450px] max-h-[700px] w-[85vw] sm:w-[70vw] md:w-[60vw] lg:w-[45vw] xl:w-[40vw] shrink-0 snap-center group relative"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 via-purple-500/10 to-cyan-500/10 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
                  
                  <div
                    className="relative rounded-[2.5rem] overflow-hidden border border-white/10 dark:border-white/5 cursor-pointer h-full flex flex-col shadow-2xl group-hover:shadow-[0_20px_60px_-15px_rgba(99,102,241,0.3)] transition-all duration-700 bg-white/90 dark:bg-[#111115]/90 backdrop-blur-2xl group-hover:-translate-y-2 ring-1 ring-black/5 dark:ring-white/10"
                    onClick={() => {
                      playClick();
                      setSelectedProject(project);
                    }}
                  >
                    {/* Image Area - Cinematic Proportion */}
                    <div className="relative overflow-hidden h-[50%] p-3 md:p-4 pb-0 shrink-0">
                      <div className="relative w-full h-full rounded-t-[1.8rem] overflow-hidden shadow-inner group-hover:shadow-2xl transition-all duration-700">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 transition-opacity duration-500 group-hover:opacity-70" />
                        <img
                          src={getImageUrl(project.image)}
                          alt={project.title}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
                          loading="lazy"
                        />
                        
                        {/* Tags floating on image */}
                        <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2">
                          {project.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white text-xs font-semibold shadow-xl"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Top Right Action (View Details) */}
                        <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                           <div className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/20">
                             <Eye className="w-4 h-4" />
                           </div>
                        </div>

                        {/* Overlay actions (Bottom Links) */}
                        <div className={`absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between transition-all duration-500 ${hoveredIndex === index ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                          <div className="flex gap-2">
                            {project.githubLink && (
                              <motion.a
                                href={project.githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2.5 rounded-xl bg-black/60 backdrop-blur-xl text-white hover:bg-black/80 transition-all border border-white/20"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={(e: any) => {
                                  playClick();
                                  e.stopPropagation();
                                }}
                              >
                                <Github className="w-4 h-4" />
                              </motion.a>
                            )}
                            {project.liveLink && (
                              <motion.a
                                href={project.liveLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2.5 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 text-white hover:from-brand-400 hover:to-brand-500 transition-all border border-white/20 shadow-lg shadow-brand-500/30"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={(e: any) => {
                                  playClick();
                                  e.stopPropagation();
                                }}
                              >
                                <ExternalLink className="w-4 h-4" />
                              </motion.a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-6 md:p-8 flex-1 flex flex-col relative z-20 bg-gradient-to-b from-transparent to-black/5 dark:to-white/5">
                      <div className="flex-1">
                        <h3 className="text-2xl md:text-3xl font-bold font-display text-text-primary mb-3 group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-brand-500 group-hover:to-cyan-400 transition-all duration-500">
                          {project.title}
                        </h3>
                        <p className="text-text-secondary text-base leading-relaxed line-clamp-3 md:line-clamp-4 mb-6">
                          {project.description}
                        </p>
                      </div>
                      
                      {/* Swipe instruction visible only on hover desktop or default mobile */}
                      <div className="flex items-center justify-between text-brand-600 dark:text-brand-400 text-sm font-semibold opacity-80 group-hover:opacity-100 transition-opacity">
                         <span>View Details</span>
                         <div className="w-8 h-1 rounded-full bg-brand-500/30 overflow-hidden relative">
                           <div className="absolute top-0 left-0 h-full bg-brand-500 w-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out" />
                         </div>
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