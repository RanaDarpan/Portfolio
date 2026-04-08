import { useRef, useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Send, CheckCircle, Sparkles } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || '';

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    value: 'ranadarpan0@gmail.com',
    href: 'mailto:ranadarpan0@gmail.com',
    color: '#6366f1',
  },
  {
    icon: Phone,
    title: 'Phone',
    value: '+91 9727596141',
    href: 'tel:+919727596141',
    color: '#8b5cf6',
  },
  {
    icon: MapPin,
    title: 'Location',
    value: 'Ahmedabad, Gujarat, India',
    href: '#',
    color: '#06b6d4',
  },
];

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const formData = new FormData(formRef.current!);
      const payload = {
        name: formData.get('user_name'),
        email: formData.get('user_email'),
        message: formData.get('message'),
      };

      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setIsSubmitted(true);
    } catch {
      setError('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative section-padding overflow-hidden" id="contact">
      <div className="absolute inset-0 mesh-gradient opacity-10 dark:opacity-40" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="inline-block text-brand-500 dark:text-brand-400 font-semibold text-sm tracking-widest uppercase mb-4">
            Let's connect
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-display text-text-primary">
            Get In <span className="gradient-text">Touch</span>
          </h2>
        </motion.div>

        <div ref={ref} className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="glass rounded-2xl p-6 md:p-8 gradient-border">
              <h3 className="text-xl font-bold text-text-primary mb-6 font-display">
                Contact Information
              </h3>
              <div className="space-y-6">
                {contactInfo.map((info, i) => (
                  <motion.a
                    key={info.title}
                    href={info.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-center gap-4 group"
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                      style={{ background: `${info.color}15` }}
                    >
                      <info.icon className="w-5 h-5" style={{ color: info.color }} />
                    </div>
                    <div>
                      <p className="text-xs text-text-secondary uppercase tracking-wider mb-0.5">
                        {info.title}
                      </p>
                      <p className="text-text-primary font-medium group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                        {info.value}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass rounded-2xl p-8 md:p-12 gradient-border text-center"
              >
                <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-emerald-500 dark:text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-text-primary mb-3 font-display">
                  Thank You! 🎉
                </h3>
                <p className="text-text-secondary">
                  Your message has been sent successfully. I'll get back to you soon!
                </p>
              </motion.div>
            ) : (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="glass rounded-2xl p-6 md:p-8 gradient-border space-y-5"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-brand-500 dark:text-brand-400" />
                  <h3 className="text-lg font-bold text-text-primary font-display">
                    Send a Message
                  </h3>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-text-secondary uppercase tracking-wider mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="user_name"
                      placeholder="Your name"
                      required
                      className="admin-input"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-text-secondary uppercase tracking-wider mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="user_email"
                      placeholder="your@email.com"
                      required
                      className="admin-input"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-text-secondary uppercase tracking-wider mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="Tell me about your project or just say hi..."
                    required
                    className="admin-input resize-none"
                  />
                </div>

                {error && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-400 text-sm"
                  >
                    {error}
                  </motion.p>
                )}

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3.5 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all disabled:opacity-60"
                  style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Send Message <Send className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
