import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Star, Tag, Eye, Lock } from 'lucide-react';
import { useData } from '../context/DataContext';
import type { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const { getImageUrl } = useData();
  const [showPreview, setShowPreview] = useState(false);
  // Lock body scroll when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [project]);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />

          {/* Modal Panel */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 16 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl shadow-2xl"
            style={{ background: 'var(--glass-strong-bg)', border: '1px solid var(--glass-border)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Hero Image / Preview */}
            <div className="relative bg-[#000000] rounded-t-3xl border-b border-white/5 p-1 pt-1.5 px-1.5">
              {showPreview && project.liveLink ? (
                <div className="w-full h-[65vh] md:h-[75vh] rounded-[1.2rem] overflow-hidden relative flex flex-col bg-[#1c1c1e] ring-1 ring-white/10 shadow-2xl">
                  {/* MacOS Header */}
                  <div className="h-10 w-full bg-[#f6f6f6] dark:bg-[#2d2d2f] border-b border-black/10 dark:border-white/10 flex items-center px-4 shrink-0 relative">
                    {/* Traffic Lights */}
                    <div className="flex gap-2 relative z-10">
                      <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e] cursor-pointer hover:bg-[#e0443e]" onClick={onClose} />
                      <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123] cursor-pointer hover:bg-[#dea123]" onClick={() => setShowPreview(false)} />
                      <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29] cursor-pointer hover:bg-[#1aab29]" />
                    </div>
                    {/* URL Bar */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="px-4 py-1 rounded-md bg-[#e5e5e5] dark:bg-[#1c1c1e] text-[11px] text-gray-600 dark:text-gray-300 font-medium font-mono border border-black/5 dark:border-white/5 flex items-center gap-2 max-w-[60%] truncate">
                        <Lock className="w-3 h-3 text-green-600 dark:text-green-400 shrink-0" />
                        <span className="truncate">{project.liveLink.replace(/^https?:\/\//, '')}</span>
                      </div>
                    </div>
                  </div>
                  {/* Browser Body */}
                  <div className="flex-1 w-full relative bg-white">
                    <iframe 
                      src={project.liveLink} 
                      className="absolute inset-0 w-full h-full border-0"
                      title={`${project.title} Interactive Preview`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              ) : (
                <>
                  <img
                    src={getImageUrl(project.image)}
                    alt={project.title}
                    className="w-full h-52 md:h-72 object-cover rounded-t-3xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent rounded-t-3xl pointer-events-none" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-none">
                    <h3 className="text-2xl md:text-3xl font-bold font-display text-white drop-shadow-lg">
                      {project.title}
                    </h3>
                  </div>
                </>
              )}

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2.5 rounded-xl bg-black/40 hover:bg-black/60 backdrop-blur-sm transition-all border border-white/10"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
              {/* Description */}
              <p className="text-text-secondary leading-relaxed mb-6 text-sm md:text-base">
                {project.longDescription || project.description}
              </p>

              {/* Features */}
              {project.features && project.features.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2"
                    style={{ color: 'var(--accent-primary)' }}>
                    <Star className="w-4 h-4" /> Key Features
                  </h4>
                  <ul className="space-y-2.5">
                    {project.features.map((feature, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-start gap-3"
                      >
                        <div
                          className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                          style={{ backgroundColor: 'var(--accent-primary)' }}
                        />
                        <span className="text-text-secondary text-sm leading-relaxed">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tech Tags */}
              {project.tags && project.tags.length > 0 && (
                <div className="mb-8">
                  <h4 className="text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2"
                    style={{ color: 'var(--accent-secondary)' }}>
                    <Tag className="w-4 h-4" /> Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-xs font-semibold rounded-full"
                        style={{
                          backgroundColor: 'rgba(99,102,241,0.12)',
                          color: 'var(--accent-primary)',
                          border: '1px solid rgba(99,102,241,0.2)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-2 border-t border-black/5 dark:border-white/10">
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all"
                    style={{
                      background: 'var(--glass-bg)',
                      border: '1px solid var(--glass-border)',
                      color: 'var(--text-primary)',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'var(--glass-strong-bg)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'var(--glass-bg)')}
                  >
                    <Github className="w-4 h-4" /> View Code
                  </a>
                )}
                {project.liveLink && (
                  <>
                    <button
                      onClick={() => setShowPreview(!showPreview)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all"
                      style={{
                        background: showPreview ? 'var(--glass-bg)' : 'linear-gradient(135deg, #0ea5e9, #6366f1)',
                        color: 'white',
                        border: showPreview ? '1px solid var(--glass-border)' : '1px solid transparent',
                      }}
                    >
                      {showPreview ? <><X className="w-4 h-4" /> Close Interactive Preview</> : <><Eye className="w-4 h-4" /> Interactive Preview</>}
                    </button>
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all hover:opacity-90 hover:shadow-lg"
                      style={{ 
                        background: showPreview ? 'var(--glass-bg)' : 'linear-gradient(135deg, #6366f1, #8b5cf6)', 
                        color: showPreview ? 'var(--text-primary)' : 'white', 
                        border: showPreview ? '1px solid var(--glass-border)' : '1px solid transparent' 
                      }}
                    >
                      <ExternalLink className="w-4 h-4" /> Open In Tab
                    </a>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;