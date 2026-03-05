export interface Project {
  title: string;
  businessProblem: string;
  dataset: string;
  preprocessing: string[];
  featureEngineering: string[];
  architecture: string;
  training: string;
  metrics: Record<string, string>;
  results: string;
  impact: string;
  techStack: string[];
  github: string;
  demo: string;
  future: string[];
}

export const PROJECTS: Project[] = [
  {
    title: "EduGenius",
    businessProblem: "Lack of accessible, high-quality educational resources for remote learners.",
    dataset: "Curated educational content and user interaction logs.",
    preprocessing: ["Text normalization", "Content categorization", "User behavior analysis"],
    featureEngineering: ["Topic modeling", "Difficulty scoring", "Personalization vectors"],
    architecture: "Full-stack web application with a recommendation engine backend.",
    training: "Collaborative filtering and content-based filtering algorithms.",
    metrics: { "User Engagement": "+45%", "Retention Rate": "68%" },
    results: "Successfully launched a platform that provides personalized learning paths.",
    impact: "Improved learning outcomes for over 500 active students.",
    techStack: ["React", "Node.js", "PostgreSQL", "Python"],
    github: "https://github.com/Zinhle2016",
    demo: "https://edu-genius-ecru.vercel.app",
    future: ["Mobile app development", "AI-powered tutoring", "Gamification features"]
  },
  {
    title: "EduGuide",
    businessProblem: "Students struggling to navigate complex career paths and educational requirements.",
    dataset: "Career path data, university requirements, and student profiles.",
    preprocessing: ["Data scraping", "Schema mapping", "Profile anonymization"],
    featureEngineering: ["Skill gap analysis", "Career trajectory mapping"],
    architecture: "Interactive guidance system with a decision-tree logic core.",
    training: "Rule-based systems combined with predictive career modeling.",
    metrics: { "Guidance Accuracy": "94%", "User Satisfaction": "4.8/5" },
    results: "Created a comprehensive tool for educational and career planning.",
    impact: "Helped hundreds of students make informed decisions about their future.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Firebase"],
    github: "https://github.com/Zinhle2016",
    demo: "https://eduguide-six.vercel.app",
    future: ["Integration with job boards", "Mentorship matching", "Scholarship alerts"]
  },
  {
    title: "EmotiView",
    businessProblem: "Businesses unable to accurately gauge customer sentiment from unstructured feedback.",
    dataset: "50k+ customer reviews and social media mentions.",
    preprocessing: ["Tokenization", "Stop-word removal", "Lemmatization"],
    featureEngineering: ["TF-IDF", "Word2Vec", "Sentiment polarity scoring"],
    architecture: "NLP pipeline with a real-time visualization dashboard.",
    training: "Bidirectional GRU model trained on multi-class sentiment data.",
    metrics: { "Accuracy": "89%", "F1-Score": "0.87" },
    results: "High-performance sentiment analysis engine with real-time processing.",
    impact: "Enabled marketing teams to react to customer feedback 3x faster.",
    techStack: ["Python", "TensorFlow", "Flask", "D3.js"],
    github: "https://github.com/Zinhle2016",
    demo: "https://emoti-view-pink.vercel.app",
    future: ["Multi-language support", "Aspect-based sentiment analysis", "Voice-to-text integration"]
  },
  {
    title: "ResumeCraft",
    businessProblem: "Job seekers failing to pass ATS filters due to poorly formatted resumes.",
    dataset: "ATS-friendly templates and successful resume samples.",
    preprocessing: ["PDF parsing", "Keyword extraction", "Layout analysis"],
    featureEngineering: ["ATS score calculation", "Keyword density optimization"],
    architecture: "Dynamic resume builder with real-time ATS feedback.",
    training: "Heuristic-based scoring engine with NLP keyword matching.",
    metrics: { "ATS Pass Rate": "+75%", "Interview Invites": "+30%" },
    results: "A tool that empowers job seekers to create high-impact resumes.",
    impact: "Assisted numerous candidates in securing interviews at top tech firms.",
    techStack: ["React", "Vite", "Tailwind CSS", "Lucide Icons"],
    github: "https://github.com/Zinhle2016",
    demo: "https://resumecraftagj6.vercel.app",
    future: ["AI-powered bullet point generation", "LinkedIn profile sync", "Cover letter builder"]
  }
];

export const SKILLS = {
  programming: ["Python (Expert)", "SQL", "R", "Bash"],
  ml: ["Scikit-learn", "XGBoost", "LightGBM", "Supervised/Unsupervised Learning"],
  dl: ["TensorFlow", "Keras", "PyTorch", "CNNs", "RNNs/LSTMs"],
  nlp: ["HuggingFace Transformers", "NLTK", "Spacy", "BERT", "Word Embeddings"],
  data: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Tableau"],
  deployment: ["Docker", "Flask", "FastAPI", "Streamlit", "MLflow"],
  cloud: ["AWS (S3, EC2, SageMaker)", "Google Cloud Platform", "Git/GitHub"],
  it_proficiencies: ["Operating systems", "Hardware and software support", "Networking fundamentals", "Technical support", "Cloud and tools", "Data and applications"],
  soft_skills: ["Communication", "Problem solving", "Time management", "Strategic thinking", "Professional development"]
};

export const CERTIFICATIONS = {
  ai: [
    { title: "Generative AI with Large Language Models", issuer: "DeepLearning.AI & AWS", date: "Nov 2025", verify: "https://coursera.org/verify/XLTJ982VSIMQ" },
    { title: "Artificial Intelligence on Microsoft Azure", issuer: "Microsoft", date: "Dec 2025", verify: "https://coursera.org/verify/Z73I4TFDCSUM" },
    { title: "Trustworthy AI: Managing Bias, Ethics, and Accountability", issuer: "Johns Hopkins University", date: "Dec 2025", verify: "https://coursera.org/verify/Z5LDVOQ5MNV4" },
    { title: "Python for Data Science, AI & Development", issuer: "IBM", date: "Nov 2025", verify: "https://coursera.org/verify/Y7XCPJGGHBE0" },
    { title: "Introduction to Generative AI", issuer: "Google Cloud", date: "Nov 2025", verify: "https://coursera.org/verify/OD815B439VVS" },
    { title: "Introduction to Responsible AI", issuer: "Google Cloud", date: "Nov 2025", verify: "https://coursera.org/verify/G9HPRAG645OV" },
    { title: "Building AI Powered Chatbots Without Programming", issuer: "IBM", date: "Nov 2025", verify: "https://coursera.org/verify/3NZA3CHJ5FPF" },
    { title: "AI For Everyone", issuer: "DeepLearning.AI", date: "Nov 2025", verify: "https://coursera.org/verify/V3VBKKS58HNS" },
    { title: "Generative AI for Everyone", issuer: "DeepLearning.AI", date: "Nov 2025", verify: "https://coursera.org/verify/ZBRGCKJPSSD7" },
    { title: "Introduction to Artificial Intelligence (AI)", issuer: "IBM", date: "Nov 2025", verify: "https://coursera.org/verify/83NHY75AUJY1" },
    { title: "AI Essentials", issuer: "Intel", date: "Nov 2025", verify: "https://coursera.org/verify/9AX73ZEGGXM7" }
  ],
  professional: [
    { title: "Emotional Intelligence", issuer: "Arizona State University", date: "Dec 2025", verify: "https://coursera.org/verify/3QZGEWVMUT0N" },
    { title: "Verbal Communications and Presentation Skills", issuer: "Starweaver", date: "Dec 2025", verify: "https://coursera.org/verify/MW021VAZ9K5M" },
    { title: "Negotiation skills: Negotiate and resolve conflict", issuer: "Macquarie University", date: "Jan 2026", verify: "https://coursera.org/verify/HBAGY0IZBQAH" },
    { title: "Work Smarter, Not Harder: Time Management", issuer: "UC Irvine", date: "Dec 2025", verify: "https://coursera.org/verify/IZM19YBRL9ID" },
    { title: "Positive Psychology: Resilience Skills", issuer: "University of Pennsylvania", date: "Jan 2026", verify: "https://coursera.org/verify/GW0FPON5G708" },
    { title: "Leading with Impact: Team Dynamics, Strategy and Ethics", issuer: "Starweaver", date: "Dec 2025", verify: "https://coursera.org/verify/PBZ85EPEV0P9" },
    { title: "Active Listening: Enhancing Communication Skills", issuer: "Starweaver", date: "Dec 2025", verify: "https://coursera.org/verify/SIHS37M55L6T" },
    { title: "Developing Interpersonal Skills", issuer: "IBM", date: "Dec 2025", verify: "https://coursera.org/verify/TE2ZW69MLMZ3" },
    { title: "Finding Your Professional Voice: Confidence & Impact", issuer: "University of London", date: "Dec 2025", verify: "https://coursera.org/verify/J7JGE09SPXC1" },
    { title: "Managing Conflicts with Cultural and Emotional Intelligence", issuer: "University of Maryland", date: "Jan 2026", verify: "https://coursera.org/verify/JTOFDR8W8GEL" },
    { title: "Introduction to Personal Branding", issuer: "University of Virginia", date: "Dec 2025", verify: "https://coursera.org/verify/H24Z50JEYYRZ" },
    { title: "Write Professional Emails in English", issuer: "Georgia Institute of Technology", date: "Nov 2025", verify: "https://coursera.org/verify/3ZQ35BHPWI24" },
    { title: "Preparation for Job Interviews", issuer: "Coursera", date: "Jan 2026", verify: "https://coursera.org/verify/G853MXS9DF4D" },
    { title: "Psychology of the Self", issuer: "American Psychological Association", date: "Jan 2026", verify: "https://coursera.org/verify/CSRH9HAZ7CZK" },
    { title: "Financial Planning for Young Adults", issuer: "University of Illinois", date: "Jan 2026", verify: "https://coursera.org/verify/5RNQQL330IES" }
  ]
};
