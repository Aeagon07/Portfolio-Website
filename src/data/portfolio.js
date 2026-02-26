// ============================================================
// PORTFOLIO DATA — Edit this file to personalize your site!
// ============================================================

export const personal = {
  name: "Rushikesh Godase",
  firstName: "Rushikesh",
  lastName: "Godase",
  title: "MERN Stack Developer & DevOps Enthusiast",
  roles: ["Full Stack Developer", "UI/UX Designer", "Blockchain Developer", "GenAI Developer", "AI Systems Engineer"],
  tagline: "Building efficient systems and automating workflows.",
  bio: "I'm a passionate learner currently diving deep into DevOps while having a solid foundation in Data Structures & Algorithms and Web Development. I enjoy building efficient systems and automating workflows to improve development processes.",
  location: "India",
  email: "godaserushikesh07@gmail.com",
  resumeLink: "#", // Link to your resume PDF
  avatar: "/assets/avatar.png", // Set to image path or URL, null for generated avatar
};

export const social = {
  github: "https://github.com/Aeagon07",
  linkedin: "https://www.linkedin.com/in/rushikesh-vijay-godase07/",
};

export const skills = [
  {
    category: "Languages",
    items: [
      { name: "JavaScript", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "Python", level: 80 },
      { name: "HTML/CSS", level: 95 },
      { name: "C++", level: 70 },
    ],
  },
  {
    category: "Frameworks & Libraries",
    items: [
      { name: "React", level: 92 },
      { name: "Node.js", level: 85 },
      { name: "Next.js", level: 80 },
      { name: "Express.js", level: 80 },
      { name: "Tailwind CSS", level: 90 },
    ],
  },
  {
    category: "Tools & Platforms",
    items: [
      { name: "Git & GitHub", level: 90 },
      { name: "Docker", level: 72 },
      { name: "Figma", level: 75 },
      { name: "MongoDB", level: 80 },
      { name: "PostgreSQL", level: 75 },
    ],
  },
];

export const techBadges = [
  "React", "TypeScript", "Node.js", "Next.js", "Python",
  "MongoDB", "PostgreSQL", "Docker", "Git", "Tailwind CSS",
  "GraphQL", "REST APIs", "Figma", "AWS", "Linux",
];

export const projects = [
  {
    id: 1,
    title: "Imaginify - AI SaaS Platform",
    category: "AI Platform",
    description: "Build a REAL Software-as-a-Service app with AI features and payments & credits system.",
    features: [
      "User Authentication: Secure login/signup with Clerk",
      "Image Generation: AI-powered tools via Cloudinary APIs",
      "User Dashboard: Personalized space to view and manage generated images",
      "Subscription Plans: Purchase premium access using Stripe",
      "Server-side Rendering: Optimized performance and SEO via Next.js"
    ],
    image: "/assets/projects/imaginify.png",
    tags: ["Next.js 14", "MongoDB", "Cloudinary AI", "Stripe", "React", "TypeScript"],
    githubLink: "https://github.com/Aeagon07/Imaginify_Ai_Platform.git",
    liveLink: "https://ai-saas-app-five-ashen.vercel.app/",
    featured: true,
    themeColor: "#8b5cf6", // Purple
    color: "purple",
  },
  {
    id: 2,
    title: "Portfolio Engine",
    category: "Creative Portfolio",
    description: "Award-winning portfolio builder with cinematic parallax effects and smooth scrolling animations.",
    features: [
      "Cinematic parallax scrolling",
      "Drag-and-drop interface",
      "Dynamic content management",
      "Custom theme builder",
      "SEO optimization built-in"
    ],
    image: null,
    tags: ["Vite", "Framer Motion", "Lenis", "Tailwind CSS"],
    githubLink: "https://github.com/Aeagon07/Portfolio-Website.git",
    liveLink: "https://yourproject.netlify.app",
    featured: true,
    themeColor: "#f59e0b", // Orange/Gold
    color: "gold",
  },
  {
    id: 3,
    title: "AI SaaS Platform",
    category: "Web Application",
    description: "A cutting-edge SaaS platform powered by GPT-4 with real-time analytics and intelligent workflows.",
    features: [
      "AI-powered content generation",
      "Real-time analytics dashboard",
      "Intelligent workflow automation",
      "WebGL 3D visualizations",
      "Seamless API integrations"
    ],
    image: null,
    tags: ["Next.js", "TypeScript", "Three.js", "Tailwind CSS", "OpenAI"],
    githubLink: "https://github.com/yourusername/ai-platform",
    liveLink: "https://ai-saas-platform.vercel.app",
    featured: true,
    themeColor: "#ec4899", // Pink
    color: "pink",
  },
  {
    id: 4,
    title: "Cloud DevOps Hub",
    category: "DevOps Tool",
    description: "Centralized dashboard for monitoring infrastructure health, CI/CD pipelines, and resource allocation.",
    features: [
      "Kubernetes cluster monitoring",
      "Automated pipeline triggers",
      "Real-time log aggregation",
      "Cost optimization insights",
      "Multi-cloud support"
    ],
    image: null,
    tags: ["Docker", "Kubernetes", "AWS", "Go", "Prometheus"],
    githubLink: "https://github.com/yourusername/devops-hub",
    liveLink: "https://devops-dashboard.cloud",
    featured: true,
    themeColor: "#22c55e", // Green
    color: "green",
  },
  {
    id: 5,
    title: "Task Management System",
    category: "SaaS",
    description: "A collaborative project management tool with Kanban boards, real-time updates, and team workflows.",
    features: [
      "Kanban board visualization",
      "Real-time team collaboration",
      "Notification system",
      "File attachment support"
    ],
    image: null,
    tags: ["React", "Firebase", "Redux", "Material UI"],
    githubLink: "https://github.com/yourusername/taskmanager",
    liveLink: "https://yourtaskapp.vercel.app",
    featured: false,
    themeColor: "#14b8a6", // Teal
    color: "teal",
  },
  {
    id: 6,
    title: "AI Chat Application",
    category: "AI",
    description: "Real-time chat application powered by OpenAI API with support for multiple conversations.",
    features: [
      "Multi-model AI support",
      "Context-aware conversations",
      "Real-time streaming responses",
      "Markdown rendering"
    ],
    image: null,
    tags: ["Next.js", "OpenAI", "Socket.IO", "TypeScript"],
    githubLink: "https://github.com/yourusername/ai-chat",
    liveLink: null,
    featured: false,
    themeColor: "#3b82f6", // Blue
    color: "blue",
  },
];

export const leetcodeStats = {
  totalSolved: 241,
  totalQuestions: 3251, // Based on the screenshot aggregate
  rank: 587148,
  badges: 2,
  reputation: 1,
  categories: [
    { name: "Easy", solved: 113, total: 927, beats: 75, color: "var(--accent-cyan)" },
    { name: "Medium", solved: 107, total: 1614, beats: 68, color: "var(--accent-green)" },
    { name: "Hard", solved: 21, total: 710, beats: 45, color: "var(--accent-red)" },
  ]
};

export const githubStats = {
  grade: "A+", // Inferred from 201 contributions and active profile
  stars: 11,
  commits: 220,
  prs: 20,
  issues: 10,
  contributedTo: 23,
  languages: [
    { name: "JavaScript", percentage: 30, color: "#f7df1e" },
    { name: "Python", percentage: 20, color: "#3776ab" },
    { name: "TypeScript", percentage: 10, color: "#3178c6" },
    { name: "Jupyter Notebook", percentage: 20, color: "#12d86bff" },
    { name: "Java", percentage: 15, color: "#d8118cff" },
    { name: "HTML/CSS", percentage: 5, color: "#c93f1dff" },
  ]
};

export const education = [
  {
    id: 1,
    title: "B.Tech, Artificial Intelligence and Data Science",
    institution: "VIT Pune",
    duration: "2023-2027",
    result: "Secured 8.3 CGPA",
    icon: "graduation-cap",
  },
  {
    id: 2,
    title: "Higher Secondary",
    institution: "Ligade Patil Junior College, Karad",
    duration: "2021-2023",
    result: [
      "Secured **83%** in HSC",
      "JEE Main 2024: **93%ile**",
      "JEE Advanced 2024: **AIR 17,207**",
      "CET 2023 : **97.98%ile**",
    ],
    icon: "school",
  },
  {
    id: 3,
    title: "Secondary Education",
    institution: "SKP Jr. College of Nazare, Solapur",
    duration: "2016-2021",
    result: "Secured 98%",
    icon: "book-open",
  },
];

export const achievements = [
  {
    id: 1,
    title: "Appian Hackathon 1st Runner-Up",
    institution: "IIT Madras",
    duration: "2025-26",
    description: "We built Intelligent knowledge retrieval for complex case management",
  },
  {
    id: 2,
    title: "Internal Smart India Hackathon Finalist",
    institution: "VIT Pune",
    duration: "2024",
    description: "Developed a prototype Automated Security Policy Configuration System Using CIS Guidelines",
  },
];

export const experience = [
  {
    id: 1,
    type: "work",
    company: "Flux Academy",
    role: "UI/UX Design Intern",
    duration: "Jul 2024 – Sep 2024",
    location: "Remote",
    description: [
      "Designed responsive web interfaces using Figma and Webflow for educational platforms",
      "Improved user engagement by restructuring navigation and layout hierarchy",
      "Conducted user research and usability testing to refine design flows",
      "Collaborated with developers to implement pixel-perfect UI components"
    ],
    logo: null,
  },
  {
    id: 2,
    type: "work",
    company: "Freelance",
    role: "Full Stack Developer",
    duration: "Sep 2024 - Jan 2025",
    location: "Remote",
    description: [
      "Developed responsive websites and landing pages for pizza outlets and coffee shops",
      "Designed modern UI/UX interfaces for small businesses",
      "Optimized website performance and SEO for better reach and ranking"
    ],
    skills: ["Node.js", "Tailwind", "NoSQL", "React", "Express.js", "MongoDB"],
    logo: null,
  },
  {
    id: 3,
    type: "Learning",
    company: "Personal Project",
    role: "AI & Systems Developer",
    duration: "2024 – Present",
    location: "Pune, India",
    description: [
      "Built an AVL Tree-based Stock Price Management System handling real-time insertions and deletions",
      "Designed C++ based Disk Optimization Tool with defragmentation and health monitoring",
      "Developed a Hospital Management System using java swing",
      "Developing a Blockchain-based Certificate Verification System using Ethereum and React",

    ],
    skills: ["React", "Java", "C++", "Solidity", "JavaScript", "DSA"],
    logo: null,
  },
];

export const certificates = [
  {
    id: 1,
    title: "Foundations of Cybersecurity",
    issuer: "Google",
    date: "Feb 2026",
    link: "https://coursera.org/share/419570dd3bc13cb23636abe3e790f0be",
    color: "teal",
    icon: "cloud",
  },
  {
    id: 2,
    title: "Generative AI with Diffusion Models",
    issuer: "NVIDIA",
    date: "Nov 2025",
    link: "https://learn.nvidia.com/certificates?id",
    color: "gold",
    icon: "code-2",
  },
  {
    id: 3,
    title: "Certified in Low Level Design & Object-Oriented Design",
    issuer: "Scaler",
    date: "Apr 2025",
    link: "https://moonshot.scaler.com/s/sl/PF5Kiml6R-",
    color: "blue",
    icon: "layers",
  },
  {
    id: 4,
    title: "Full Stack Development Program",
    issuer: "Scaler",
    date: "Aug 2025",
    link: "https://moonshot.scaler.com/s/sl/mX-FbPfsZK",
    color: "crimson",
    icon: "palette",
  },
  {
    id: 5,
    title: "Applications of AI for Anomaly Detection",
    issuer: "NVIDIA",
    date: "Nov 2025",
    link: "https://learn.nvidia.com/certificates?id",
    color: "gold",
    icon: "code-2",
  },
  {
    id: 6,
    title: "GenAI Bootcamp",
    issuer: "LinkedIn",
    date: "Dec 2024",
    link: "https://www.linkedin.com/in/rushikesh-vijay-godase07/details/certifications/",
    color: "teal",
    icon: "palette",
  },
  {
    id: 7,
    title: "SOLID Design Principle and Cloud Infrastructure",
    issuer: "Scaler",
    date: "Apr 2025",
    link: "https://moonshot.scaler.com/s/sl/-lWFZRqzor",
    color: "green",
    icon: "layers",
  },
];

export const stats = [
  { label: "Projects Built", value: "20+" },
  { label: "GitHub Stars", value: "150+" },
  { label: "Cups of Coffee", value: "999+" },
  { label: "Open Source PRs", value: "30+" },
];
