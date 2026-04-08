import { PortfolioData } from '../types';

export const defaultData: PortfolioData = {
  projects: [
    {
      id: 'proj-1',
      title: "Personal Portfolio Site",
      description: "A dynamic and interactive portfolio showcasing my skills as a Full Stack Developer with modern UI, animations, and a seamless user experience.",
      longDescription: "This portfolio highlights my expertise in full-stack development, featuring a clean and modern design with smooth animations. It includes sections for my personal details, social media links, and downloadable CV, all built with responsive design and attention to user experience.",
      image: "/src/Assets/portfolio.jpg",
      tags: ["React", "Tailwind", "Framer Motion", "EmailJS"],
      githubLink: "https://github.com/RanaDarpan/Fitplay",
      liveLink: "https://example.com",
      features: [
        "Interactive Design",
        "Responsive Layout",
        "Downloadable CV",
        "Feedback Integration",
        "Email-js"
      ]
    },
    {
      id: 'proj-2',
      title: "Fitplay",
      description: "A full-featured Fitplay Sport Application built using React and Firebase.",
      longDescription: "FitPlay is a web application designed to help users achieve their fitness goals through personalized workout plans, progress tracking, and rewards for completed tasks.",
      image: "/src/Assets/fitplay.jpg",
      tags: ["React", "Tailwind", "Firebase", "Cloud", "RapidAPI"],
      githubLink: "https://github.com/RanaDarpan/Fitplay",
      liveLink: "https://example.com",
      features: [
        "User authentication and authorization",
        "Profile Management",
        "Task Progress Tracking",
        "Reward Points",
        "AI generated Suggestions",
        "Social Interaction",
        "Responsive"
      ]
    },
    {
      id: 'proj-3',
      title: "Gemini-Clone",
      description: "A beautiful and intuitive Gemini-clone chatbot application",
      longDescription: "This is a Gemini Clone built using React and Vite. The project covers various modern web development techniques, including API integration, custom hooks, and responsive design.",
      image: "/src/Assets/Gemini-Clone.jpg",
      tags: ["React", "Tailwind", "Gemini API", "Vite"],
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
      id: 'proj-4',
      title: "Super Calculator",
      description: "A feature-rich Calculator with interactive UI and dynamic themes.",
      longDescription: "Super Calculator is a web-based calculator built using HTML, CSS, and JavaScript. It supports basic arithmetic operations and provides a user-friendly interface with colorful animations.",
      image: "/src/Assets/cal.jpg",
      tags: ["HTML5", "CSS3", "JavaScript"],
      githubLink: "https://github.com/RanaDarpan/Calculator",
      liveLink: "https://ranadarpan.github.io/Calculator/",
      features: [
        "Basic Operations: Addition, subtraction, multiplication, and division",
        "Clear Functionality",
        "Responsive Design",
        "Interactive UI",
        "Dynamic Color Changing Background"
      ]
    }
  ],
  certificates: [
    {
      id: 'cert-1',
      title: "IBM SkillsBuild - Machine Learning",
      issuer: "IBM",
      date: "2023",
      image: "",
      credentialLink: "#",
      description: "Gained hands-on experience in developing machine learning models, focusing on supervised learning techniques."
    },
    {
      id: 'cert-2',
      title: "Web Development Bootcamp",
      issuer: "Udemy",
      date: "2023",
      image: "",
      credentialLink: "#",
      description: "Comprehensive web development training covering HTML, CSS, JavaScript, and React."
    },
    {
      id: 'cert-3',
      title: "SSIP Grant - IoT Project",
      issuer: "GTU",
      date: "2023",
      image: "",
      credentialLink: "#",
      description: "Worked on IoT-based smart glasses for visually impaired individuals with NLP and ML integration."
    }
  ]
};
