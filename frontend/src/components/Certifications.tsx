import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, ExternalLink, Calendar } from 'lucide-react';
import { useData } from '../context/DataContext';

const Certifications = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const { data } = useData();

  return (
    <section className="relative section-padding overflow-hidden" id="certifications">
      <div className="absolute inset-0 mesh-gradient opacity-10 dark:opacity-40" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="inline-block text-brand-400 font-semibold text-sm tracking-widest uppercase mb-4">
            Credentials
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-display text-text-primary">
            Certifications & <span className="gradient-text">Awards</span>
          </h2>
        </motion.div>

        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {data.certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              className="card-3d"
            >
              <div className="glass rounded-2xl p-6 md:p-7 gradient-border h-full flex flex-col group hover:bg-white/[0.06] transition-all duration-300">
                {/* Header */}
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-brand-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-text-primary mb-1 font-display leading-tight">
                      {cert.title}
                    </h3>
                    <p className="text-brand-600 dark:text-brand-400 text-sm font-medium">{cert.issuer}</p>
                  </div>
                </div>

                {/* Date */}
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="w-3.5 h-3.5 text-text-secondary" />
                  <span className="text-xs text-text-secondary font-mono">{cert.date}</span>
                </div>

                {/* Description */}
                <p className="text-text-secondary text-sm leading-relaxed mb-6 flex-1">
                  {cert.description}
                </p>

                {/* Link */}
                {cert.credentialLink && cert.credentialLink !== '#' && (
                  <motion.a
                    href={cert.credentialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-brand-600 dark:text-brand-400 hover:text-brand-500 dark:hover:text-brand-300 transition-colors font-medium"
                    whileHover={{ x: 4 }}
                  >
                    View Credential <ExternalLink className="w-3.5 h-3.5" />
                  </motion.a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {data.certificates.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Award className="w-16 h-16 text-slate-700 mx-auto mb-4" />
            <p className="text-slate-500 text-lg">No certifications added yet.</p>
            <p className="text-slate-600 text-sm mt-2">
              Add your first certificate from the admin panel.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Certifications;
