import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import projectRoutes from './routes/projects.js';
import certificateRoutes from './routes/certificates.js';
import contactRoutes from './routes/contact.js';
import Project from './models/Project.js';
import Certificate from './models/Certificate.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/projects', projectRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/contact', contactRoutes);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Seed default data
const seedData = async () => {
  try {
    const projectCount = await Project.countDocuments();
    const certCount = await Certificate.countDocuments();

    if (projectCount === 0) {
      console.log('📦 Seeding default projects...');
      await Project.insertMany([
        {
          title: 'Personal Portfolio Site',
          description:
            'A dynamic and interactive portfolio showcasing my skills as a Full Stack Developer with modern UI, animations, and a seamless user experience.',
          longDescription:
            'This portfolio highlights my expertise in full-stack development, featuring a clean and modern design with smooth animations. It includes sections for my personal details, social media links, and downloadable CV, all built with responsive design and attention to user experience.',
          image: '/assets/projects/portfolio.jpg',
          tags: ['React', 'Tailwind', 'Framer Motion', 'EmailJS'],
          githubLink: 'https://github.com/RanaDarpan/Fitplay',
          liveLink: 'https://example.com',
          features: [
            'Interactive Design',
            'Responsive Layout',
            'Downloadable CV',
            'Feedback Integration',
            'Email-js',
          ],
        },
        {
          title: 'Fitplay',
          description:
            'A full-featured Fitplay Sport Application built using React and Firebase.',
          longDescription:
            'FitPlay is a web application designed to help users achieve their fitness goals through personalized workout plans, progress tracking, and rewards for completed tasks.',
          image: '/assets/projects/fitplay.jpg',
          tags: ['React', 'Tailwind', 'Firebase', 'Cloud', 'RapidAPI'],
          githubLink: 'https://github.com/RanaDarpan/Fitplay',
          liveLink: 'https://example.com',
          features: [
            'User authentication and authorization',
            'Profile Management',
            'Task Progress Tracking',
            'Reward Points',
            'AI generated Suggestions',
            'Social Interaction',
            'Responsive',
          ],
        },
        {
          title: 'Gemini-Clone',
          description: 'A beautiful and intuitive Gemini-clone chatbot application',
          longDescription:
            'This is a Gemini Clone built using React and Vite. The project covers various modern web development techniques, including API integration, custom hooks, and responsive design.',
          image: '/assets/projects/Gemini-Clone.jpg',
          tags: ['React', 'Tailwind', 'Gemini API', 'Vite'],
          githubLink: 'https://github.com/RanaDarpan/Gemini-Clone',
          liveLink: 'https://geminiclone-rana.vercel.app/',
          features: [
            'Gemini API integration',
            'Light and Dark Themes',
            'Responsive Design',
            'User Prompt Sidebar',
            'Text Formatting',
          ],
        },
        {
          title: 'Super Calculator',
          description:
            'A feature-rich Calculator with interactive UI and dynamic themes.',
          longDescription:
            'Super Calculator is a web-based calculator built using HTML, CSS, and JavaScript. It supports basic arithmetic operations and provides a user-friendly interface with colorful animations.',
          image: '/assets/projects/cal.jpg',
          tags: ['HTML5', 'CSS3', 'JavaScript'],
          githubLink: 'https://github.com/RanaDarpan/Calculator',
          liveLink: 'https://ranadarpan.github.io/Calculator/',
          features: [
            'Basic Operations: Addition, subtraction, multiplication, and division',
            'Clear Functionality',
            'Responsive Design',
            'Interactive UI',
            'Dynamic Color Changing Background',
          ],
        },
      ]);
      console.log('✅ Projects seeded');
    }

    if (certCount === 0) {
      console.log('📦 Seeding default certificates...');
      await Certificate.insertMany([
        {
          title: 'IBM SkillsBuild - Machine Learning',
          issuer: 'IBM',
          date: '2023',
          image: '',
          credentialLink: '#',
          description:
            'Gained hands-on experience in developing machine learning models, focusing on supervised learning techniques.',
        },
        {
          title: 'Web Development Bootcamp',
          issuer: 'Udemy',
          date: '2023',
          image: '',
          credentialLink: '#',
          description:
            'Comprehensive web development training covering HTML, CSS, JavaScript, and React.',
        },
        {
          title: 'SSIP Grant - IoT Project',
          issuer: 'GTU',
          date: '2023',
          image: '',
          credentialLink: '#',
          description:
            'Worked on IoT-based smart glasses for visually impaired individuals with NLP and ML integration.',
        },
      ]);
      console.log('✅ Certificates seeded');
    }
  } catch (error) {
    console.error('Seeding error:', error.message);
  }
};

// Start server
const startServer = async () => {
  await connectDB();
  await seedData();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📡 API available at http://localhost:${PORT}/api`);
  });
};

startServer();
