/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Download, 
  ChevronRight, 
  Code2, 
  BrainCircuit, 
  Database, 
  Layers, 
  Terminal, 
  FileText, 
  Presentation, 
  Target, 
  Menu, 
  X,
  Cpu,
  Workflow,
  CheckCircle2,
  Award,
  ArrowRight,
  Monitor,
  Smartphone,
  Tablet,
  Search,
  Phone
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import { PROJECTS, SKILLS, CERTIFICATIONS, Project } from './constants';
import { cn } from './lib/utils';

// --- Components ---

const GithubRepos = ({ username }: { username: string }) => {
  const [repos, setRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
        if (!response.ok) throw new Error('Failed to fetch repositories');
        const data = await response.json();
        setRepos(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, [username]);

  if (loading) return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map(i => (
        <div key={i} className="h-48 bg-zinc-100 animate-pulse rounded-2xl" />
      ))}
    </div>
  );

  if (error) return (
    <div className="p-8 text-center bg-red-50 text-red-600 rounded-2xl border border-red-100">
      <p className="font-bold">Error loading GitHub repositories</p>
      <p className="text-sm">{error}</p>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {repos.map(repo => (
        <motion.a
          key={repo.id}
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ y: -5 }}
          className="bg-white p-6 rounded-2xl border border-zinc-200 hover:border-emerald-500 transition-colors group"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-zinc-50 text-zinc-400 group-hover:text-emerald-600 rounded-lg transition-colors">
              <Github size={20} />
            </div>
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                {repo.language || 'Code'}
              </span>
            </div>
          </div>
          <h4 className="font-bold text-zinc-900 mb-2 group-hover:text-emerald-600 transition-colors truncate">
            {repo.name}
          </h4>
          <p className="text-sm text-zinc-500 line-clamp-2 mb-4 h-10">
            {repo.description || 'No description provided.'}
          </p>
          <div className="flex items-center gap-4 text-xs font-medium text-zinc-400">
            <span className="flex items-center gap-1">★ {repo.stargazers_count}</span>
            <span className="flex items-center gap-1">⑂ {repo.forks_count}</span>
          </div>
        </motion.a>
      ))}
    </div>
  );
};

const SectionHeading = ({ title, subtitle, light = false, id }: { title: string; subtitle?: string; light?: boolean; id?: string }) => (
  <div className="mb-12" id={id}>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        "text-3xl md:text-4xl font-bold mb-4",
        light ? "text-white" : "text-zinc-900"
      )}
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className={cn(
          "text-lg max-w-2xl",
          light ? "text-zinc-400" : "text-zinc-600"
        )}
      >
        {subtitle}
      </motion.p>
    )}
    <div className="h-1 w-20 bg-emerald-500 mt-4 rounded-full" />
  </div>
);

const ProjectCard = ({ project }: { project: Project }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div 
      layout
      className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-zinc-900">{project.title}</h3>
          <div className="flex gap-2">
            <a href={project.github} className="p-2 text-zinc-500 hover:text-emerald-600 transition-colors">
              <Github size={20} />
            </a>
            <a href={project.demo} className="p-2 text-zinc-500 hover:text-emerald-600 transition-colors">
              <ExternalLink size={20} />
            </a>
          </div>
        </div>
        
        <p className="text-zinc-600 mb-4 line-clamp-2">{project.businessProblem}</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {project.techStack.slice(0, 3).map(tech => (
            <span key={tech} className="px-3 py-1 bg-zinc-100 text-zinc-700 text-xs font-medium rounded-full">
              {tech}
            </span>
          ))}
          {project.techStack.length > 3 && (
            <span className="px-3 py-1 bg-zinc-100 text-zinc-700 text-xs font-medium rounded-full">
              +{project.techStack.length - 3} more
            </span>
          )}
        </div>

        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center text-emerald-600 font-semibold text-sm hover:gap-2 transition-all"
        >
          {isExpanded ? 'Show Less' : 'Deep Dive into Architecture'}
          <ChevronRight size={16} className={cn("ml-1 transition-transform", isExpanded && "rotate-90")} />
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-6 mt-6 border-t border-zinc-100 space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-zinc-900 uppercase tracking-wider mb-2">Dataset & Preprocessing</h4>
                  <p className="text-sm text-zinc-600 mb-2">{project.dataset}</p>
                  <ul className="list-disc list-inside text-sm text-zinc-600 space-y-1">
                    {project.preprocessing.map((step, i) => <li key={i}>{step}</li>)}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-zinc-900 uppercase tracking-wider mb-2">Model Architecture</h4>
                  <p className="text-sm text-zinc-600">{project.architecture}</p>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-zinc-900 uppercase tracking-wider mb-2">Performance Metrics</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(project.metrics).map(([key, val]) => (
                      <div key={key} className="bg-zinc-50 p-3 rounded-lg">
                        <p className="text-xs text-zinc-500 uppercase">{key}</p>
                        <p className="text-lg font-bold text-emerald-600">{val}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-emerald-50 p-4 rounded-xl">
                  <h4 className="text-sm font-bold text-emerald-900 uppercase tracking-wider mb-1">Business Impact</h4>
                  <p className="text-sm text-emerald-800">{project.impact}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const CertificationCard = ({ cert }: { cert: { title: string; issuer: string; date: string; verify: string } }) => (
  <motion.a
    href={cert.verify}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ y: -5 }}
    className="bg-white p-5 rounded-xl border border-zinc-200 hover:border-emerald-500 transition-all group flex flex-col justify-between h-full"
  >
    <div>
      <div className="flex justify-between items-start mb-3">
        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition-colors">
          <Award size={20} />
        </div>
        <ExternalLink size={14} className="text-zinc-300 group-hover:text-emerald-500 transition-colors" />
      </div>
      <h4 className="font-bold text-zinc-900 text-sm mb-1 group-hover:text-emerald-600 transition-colors leading-tight">
        {cert.title}
      </h4>
      <p className="text-xs text-zinc-500 mb-2">{cert.issuer}</p>
    </div>
    <div className="flex items-center justify-between mt-4 pt-4 border-t border-zinc-50">
      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">{cert.date}</span>
      <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">Verify</span>
    </div>
  </motion.a>
);

const SkillCategory = ({ title, skills, icon: Icon }: { title: string; skills: string[]; icon: any }) => (
  <div className="bg-white p-6 rounded-2xl border border-zinc-200">
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
        <Icon size={20} />
      </div>
      <h3 className="font-bold text-zinc-900">{title}</h3>
    </div>
    <div className="flex flex-wrap gap-2">
      {skills.map(skill => (
        skill.toLowerCase().includes('github') ? (
          <a 
            key={skill} 
            href="https://github.com/Zinhle2016" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-3 py-1 bg-emerald-50 text-emerald-600 text-sm rounded-md border border-emerald-100 hover:bg-emerald-100 transition-colors flex items-center gap-1"
          >
            <Github size={14} />
            {skill}
          </a>
        ) : (
          <span key={skill} className="px-3 py-1 bg-zinc-50 text-zinc-600 text-sm rounded-md border border-zinc-100">
            {skill}
          </span>
        )
      ))}
    </div>
  </div>
);

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState<'portfolio' | 'career'>('portfolio');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleDownload = () => {
    // In a real app, this would be a link to a PDF file.
    // For this demo, we'll trigger the print dialog for the resume content
    // or provide a simulated download experience.
    const resumeElement = document.getElementById('resume-content');
    if (resumeElement) {
      setActiveTab('career');
      setTimeout(() => {
        window.print();
      }, 500);
    } else {
      // Fallback: scroll to career hub
      const el = document.getElementById('career-hub');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        setActiveTab('career');
      }
    }
  };

  const navItems = [
    { id: 'portfolio', label: 'Portfolio', icon: Code2, type: 'tab' },
    { id: 'career', label: 'Career Strategy', icon: Target, type: 'tab' },
    { id: 'github', label: 'GitHub', icon: Github, type: 'link', href: '#projects' },
  ];

  const handleNavClick = (item: any) => {
    if (item.type === 'tab') {
      setActiveTab(item.id);
    } else if (item.id === 'github') {
      if (activeTab !== 'portfolio') {
        setActiveTab('portfolio');
      }
      // Small delay to allow tab switch before scrolling
      setTimeout(() => {
        const el = document.getElementById('projects');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900 selection:bg-emerald-100 selection:text-emerald-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-bottom border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold">
                AI
              </div>
              <span className="font-bold text-xl tracking-tight">Career Architect</span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className={cn(
                    "flex items-center gap-2 text-sm font-medium transition-colors",
                    (activeTab === item.id || (item.id === 'github' && activeTab === 'portfolio')) ? "text-emerald-600" : "text-zinc-500 hover:text-zinc-900"
                  )}
                >
                  <item.icon size={18} />
                  {item.label}
                </button>
              ))}
              <a 
                href="#contact" 
                className="bg-zinc-900 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-zinc-800 transition-colors"
              >
                Contact Me
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-20 px-4 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className="flex items-center gap-4 text-2xl font-bold text-zinc-900"
                >
                  <item.icon size={28} />
                  {item.label}
                </button>
              ))}
              <a 
                href="#contact" 
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-4 text-2xl font-bold text-zinc-900"
              >
                <Mail size={28} />
                Contact Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-16">
        {activeTab === 'portfolio' ? (
          <PortfolioView handleDownload={handleDownload} setActiveTab={setActiveTab} />
        ) : (
          <CareerView />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-zinc-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center gap-6 mb-8">
            <a href="https://github.com/Zinhle2016" className="p-3 bg-zinc-800 rounded-full hover:bg-emerald-600 transition-colors"><Github size={24} /></a>
            <a href="https://www.linkedin.com/in/nosipho-zinhle-ndebele-20a5021a2" target="_blank" rel="noopener noreferrer" className="p-3 bg-zinc-800 rounded-full hover:bg-emerald-600 transition-colors"><Linkedin size={24} /></a>
            <a href="mailto:nosipho.ndebele@capaciti.org.za" className="p-3 bg-zinc-800 rounded-full hover:bg-emerald-600 transition-colors"><Mail size={24} /></a>
          </div>
          <p className="text-zinc-500 text-sm">© 2026 AI Career Architect. Built for the next generation of ML Engineers.</p>
        </div>
      </footer>
    </div>
  );
}

function PortfolioView({ handleDownload, setActiveTab }: { handleDownload: () => void, setActiveTab: (tab: 'portfolio' | 'career') => void }) {
  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white py-24 md:py-32">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#10b981 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-sm font-semibold mb-6"
            >
              <BrainCircuit size={16} />
              AI & Machine Learning Developer
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-7xl font-bold text-zinc-900 tracking-tight mb-8"
            >
              Hi, I'm <span className="text-emerald-600">Nosipho Zinhle Ndebele</span>. Building Intelligent Systems for Real-World Impact.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-zinc-600 mb-10 leading-relaxed"
            >
              Bootcamp graduate specialized in end-to-end Machine Learning pipelines. 
              From data wrangling to cloud deployment, I transform raw data into actionable intelligence.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <a href="#projects" className="bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 flex items-center gap-2">
                <Github size={20} /> GitHub Projects
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-12 w-full max-w-4xl"
            >
              <div className="bg-white rounded-3xl shadow-2xl border border-zinc-200 overflow-hidden text-left">
                <div className="bg-[#1a2b4b] p-6 text-white flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <FileText className="text-emerald-400" />
                    <span className="font-bold tracking-tight">RESUME_PREVIEW_2026.PDF</span>
                  </div>
                  <button 
                    onClick={handleDownload}
                    className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg font-bold transition-colors flex items-center gap-2"
                  >
                    <Download size={14} /> Download Full Version
                  </button>
                </div>
                
                <div className="p-8 grid md:grid-cols-3 gap-8 bg-zinc-50/50">
                  <div className="md:col-span-1 space-y-6">
                    <div>
                      <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-3">Contact</h4>
                      <div className="space-y-2 text-xs text-zinc-600 font-medium">
                        <p className="flex items-center gap-2"><Mail size={12} className="text-emerald-500" /> nosipho.ndebele@capaciti.org.za</p>
                        <p className="flex items-center gap-2"><Phone size={12} className="text-emerald-500" /> 076 773 9731</p>
                        <p className="flex items-center gap-2"><Linkedin size={12} className="text-emerald-500" /> linkedin.com/in/nosipho-zinhle</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-3">Top Skills</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {SKILLS.it_proficiencies.slice(0, 4).map(s => (
                          <span key={s} className="px-2 py-1 bg-white border border-zinc-200 rounded text-[10px] font-bold text-zinc-700">{s}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2 space-y-6">
                    <div>
                      <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2">Professional Summary</h4>
                      <p className="text-xs text-zinc-600 leading-relaxed line-clamp-3">
                        Strategic IT professional specializing in lifecycle management, cross-platform technical architecture, and high-availability end-user support. Expert in diagnosing complex hardware/software dependencies and optimizing network performance to minimize downtime.
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2">Latest Education</h4>
                        <p className="text-[11px] font-bold text-zinc-900">Cybersecurity Skills Programme</p>
                        <p className="text-[10px] text-zinc-500">Progressive School of Business • 2025</p>
                      </div>
                      <div>
                        <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2">Experience</h4>
                        <p className="text-[11px] font-bold text-zinc-900">Homemark</p>
                        <p className="text-[10px] text-zinc-500">Call center Agent • 2015-2016</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-white border-t border-zinc-100 flex justify-center">
                  <button 
                    onClick={() => {
                      setActiveTab('career');
                      setTimeout(() => {
                        const el = document.getElementById('career-hub');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                  >
                    View Full Interactive Resume <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeading 
              title="About Me" 
              subtitle="Bridging the gap between complex algorithms and business value."
            />
            <div className="space-y-6 text-zinc-600 leading-relaxed">
              <p>
                I am a dedicated AI/ML Developer with a background in intensive technical training and a passion for solving high-stakes problems. 
                My journey into AI began with a fascination for how data can predict the future, leading me to complete one of the industry's most rigorous bootcamps and earn over 25 global certifications.
              </p>
              <p>
                I specialize in building scalable ML pipelines, focusing on Generative AI, NLP, and Predictive Analytics. 
                My approach is rooted in Agile methodologies, ensuring that every model I build is not just technically sound, but aligned with business objectives.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="text-emerald-500" size={20} />
                  <span className="font-medium">Agile Practitioner</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="text-emerald-500" size={20} />
                  <span className="font-medium">Cloud Deployment</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="text-emerald-500" size={20} />
                  <span className="font-medium">NLP Specialist</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="text-emerald-500" size={20} />
                  <span className="font-medium">Data Storyteller</span>
                </div>
              </div>
              <div className="pt-8">
                <a 
                  href="#projects" 
                  className="inline-flex items-center gap-2 text-emerald-600 font-bold hover:text-emerald-700 transition-colors group"
                >
                  Explore My Projects
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square bg-emerald-100 rounded-3xl overflow-hidden">
               <img 
                src="https://picsum.photos/seed/ai-dev/800/800" 
                alt="Profile" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
            <a href="#certifications" className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border border-zinc-100 max-w-[240px] hover:shadow-2xl transition-all group">
              <div className="flex items-center gap-3 mb-2">
                <Award className="text-emerald-600 group-hover:scale-110 transition-transform" />
                <span className="font-bold">Certified Professional</span>
              </div>
              <p className="text-xs text-zinc-500">25+ Global AI & Professional Development Credentials</p>
            </a>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="bg-zinc-900 py-24">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading 
            title="Technical Arsenal" 
            subtitle="A comprehensive stack for building, training, and deploying intelligent systems."
            light
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SkillCategory title="Programming" skills={SKILLS.programming} icon={Terminal} />
            <SkillCategory title="Machine Learning" skills={SKILLS.ml} icon={BrainCircuit} />
            <SkillCategory title="Deep Learning" skills={SKILLS.dl} icon={Cpu} />
            <SkillCategory title="NLP" skills={SKILLS.nlp} icon={Layers} />
            <SkillCategory title="Data Analysis" skills={SKILLS.data} icon={Database} />
            <SkillCategory title="Deployment & MLOps" skills={SKILLS.deployment} icon={Workflow} />
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="max-w-7xl mx-auto px-4">
        <SectionHeading 
          title="Global Certifications" 
          subtitle="A specialized collection of AI, Machine Learning, and Professional Development credentials."
        />
        
        <div className="space-y-12">
          <div>
            <h3 className="text-xl font-bold text-zinc-900 mb-6 flex items-center gap-2">
              <div className="w-2 h-8 bg-emerald-600 rounded-full" />
              AI & Technical Excellence
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {CERTIFICATIONS.ai.map((cert, idx) => (
                <CertificationCard key={idx} cert={cert} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-zinc-900 mb-6 flex items-center gap-2">
              <div className="w-2 h-8 bg-zinc-400 rounded-full" />
              Professional & Leadership Development
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {CERTIFICATIONS.professional.map((cert, idx) => (
                <CertificationCard key={idx} cert={cert} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GitHub Activity Section */}
      <section id="projects" className="max-w-7xl mx-auto px-4">
        <SectionHeading 
          title="My GitHub Projects" 
          subtitle="Real-time pulse of my latest code contributions and open-source work."
        />
        <GithubRepos username="Zinhle2016" />
      </section>

      {/* Capstone Deep Dive */}
      <section className="bg-emerald-900 py-24 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <Workflow size={600} className="translate-x-1/4 -translate-y-1/4" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-bold mb-8">Capstone Showcase: End-to-End Pipeline</h2>
            <p className="text-emerald-100 text-lg mb-12">
              My final project involved building a production-ready system that integrates data ingestion, 
              automated training, and a scalable API endpoint.
            </p>
            
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-emerald-800 rounded-full flex items-center justify-center font-bold border border-emerald-700">01</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Automated Data Pipeline</h3>
                  <p className="text-emerald-200">Continuous ingestion from S3 with automated cleaning and validation using Great Expectations.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-emerald-800 rounded-full flex items-center justify-center font-bold border border-emerald-700">02</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Model Versioning</h3>
                  <p className="text-emerald-200">Utilizing MLflow for experiment tracking and model registry to ensure reproducibility.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-emerald-800 rounded-full flex items-center justify-center font-bold border border-emerald-700">03</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Scalable Deployment</h3>
                  <p className="text-emerald-200">Containerized with Docker and deployed on AWS ECS with auto-scaling capabilities.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="max-w-7xl mx-auto px-4 text-center">
        <div className="bg-white border border-zinc-200 rounded-3xl p-12 md:p-24 shadow-sm">
          <h2 className="text-4xl font-bold mb-6">Ready to build something intelligent?</h2>
          <p className="text-zinc-600 text-xl mb-10 max-w-2xl mx-auto">
            I am currently open to Junior ML Engineer and AI Developer roles worldwide. 
            Let's discuss how I can add value to your team.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <a href="mailto:nosipho.ndebele@capaciti.org.za" className="bg-emerald-600 text-white px-10 py-4 rounded-xl font-bold hover:bg-emerald-700 transition-all flex items-center justify-center gap-2">
              <Mail size={20} /> Email Me
            </a>
            <a href="tel:0767739731" className="bg-white border border-zinc-200 text-zinc-900 px-10 py-4 rounded-xl font-bold hover:bg-zinc-50 transition-all flex items-center justify-center gap-2">
              <Phone size={20} /> 076 773 9731
            </a>
            <a href="https://github.com/Zinhle2016" className="bg-zinc-900 text-white px-10 py-4 rounded-xl font-bold hover:bg-zinc-800 transition-all flex items-center justify-center gap-2">
              <Github size={20} /> GitHub
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function CareerView() {
  const [activeSubTab, setActiveSubTab] = useState<'resume' | 'linkedin' | 'readme' | 'presentation' | 'strategy'>('resume');

  const tabs = [
    { id: 'resume', label: 'ATS Resume', icon: FileText },
    { id: 'linkedin', label: 'LinkedIn Optimization', icon: Linkedin },
    { id: 'readme', label: 'README Template', icon: Github },
    { id: 'presentation', label: 'Presentation Slides', icon: Presentation },
    { id: 'strategy', label: 'Job Strategy', icon: Target },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <SectionHeading 
        title="Career Hub" 
        subtitle="A collection of professional assets designed to pass ATS filters and impress hiring managers."
      />

      <div className="flex overflow-x-auto no-scrollbar gap-2 mb-12 p-1 bg-zinc-100 rounded-xl w-full md:w-fit">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id as any)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap",
              activeSubTab === tab.id 
                ? "bg-white text-emerald-600 shadow-sm" 
                : "text-zinc-500 hover:text-zinc-900"
            )}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      <div id="career-hub" className="bg-white border border-zinc-200 rounded-2xl p-8 md:p-12 shadow-sm min-h-[600px]">
        {activeSubTab === 'resume' && <div id="resume-content"><ResumeContent /></div>}
        {activeSubTab === 'linkedin' && <LinkedInContent />}
        {activeSubTab === 'readme' && <ReadmeContent />}
        {activeSubTab === 'presentation' && <PresentationContent />}
        {activeSubTab === 'strategy' && <StrategyContent />}
      </div>
    </div>
  );
}

// --- Career Hub Sub-Components ---

const ResumeContent = () => (
  <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-none md:rounded-3xl overflow-hidden border-x-0 md:border border-zinc-200">
    <div className="flex flex-col md:flex-row">
      {/* Sidebar - Dark Blue as per PDF */}
      <div className="md:w-80 bg-[#1a2b4b] text-white p-6 md:p-8 space-y-10">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold leading-tight">Nosipho Zinhle Ndebele</h1>
          <p className="text-emerald-400 font-bold text-sm uppercase tracking-wider">Strategic IT Professional</p>
        </div>

        <section>
          <h2 className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-4 border-b border-white/10 pb-2">Personal Details</h2>
          <div className="space-y-4 text-sm text-zinc-300">
            <div>
              <span className="text-white font-bold block mb-1">Age</span>
              33 years
            </div>
            <div>
              <span className="text-white font-bold block mb-1">Location</span>
              33 11th Street, Orange Grove, 2192
            </div>
            <div>
              <span className="text-white font-bold block mb-1">Languages</span>
              English, Isizulu, Sotho
            </div>
            <div>
              <span className="text-white font-bold block mb-1">Driver's License</span>
              C1 with PDP
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-4 border-b border-white/10 pb-2">Online Presence</h2>
          <div className="space-y-3 text-sm">
            <a href="https://www.linkedin.com/in/nosipho-zinhle-ndebele-20a5021a2" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-zinc-300 hover:text-white transition-colors">
              <Linkedin size={14} /> LinkedIn Profile
            </a>
            <a href="https://github.com/Zinhle2016" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-zinc-300 hover:text-white transition-colors">
              <Github size={14} /> GitHub Portfolio
            </a>
            <a href="mailto:nosipho.ndebele@capaciti.org.za" className="flex items-center gap-2 text-zinc-300 hover:text-white transition-colors">
              <Mail size={14} /> nosipho.ndebele@capaciti.org.za
            </a>
          </div>
        </section>

        <section>
          <h2 className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-4 border-b border-white/10 pb-2">Technical Proficiencies</h2>
          <ul className="space-y-2 text-sm text-zinc-300">
            {SKILLS.it_proficiencies.map((skill, i) => (
              <li key={i} className="flex items-start gap-2">
                <div className="w-1 h-1 bg-emerald-400 rounded-full mt-1.5" />
                {skill}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-4 border-b border-white/10 pb-2">Soft Skills</h2>
          <ul className="space-y-2 text-sm text-zinc-300">
            {SKILLS.soft_skills.map((skill, i) => (
              <li key={i} className="flex items-start gap-2">
                <div className="w-1 h-1 bg-zinc-400 rounded-full mt-1.5" />
                {skill}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-4 border-b border-white/10 pb-2">Interests</h2>
          <p className="text-sm text-zinc-300">Learning about new technology and IT systems. Technical problem solving and user support. Continuous professional development.</p>
        </section>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-16 space-y-12">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-zinc-900 rounded-lg flex items-center justify-center text-white font-black text-xl flex-shrink-0">C</div>
             <div>
               <h2 className="text-2xl font-black tracking-tighter text-zinc-900">CAPACITI</h2>
               <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-[0.2em]">Tech Talent Incubator</p>
             </div>
          </div>
          <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-zinc-900 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-zinc-800 transition-all">
            <Download size={16} /> Export PDF
          </button>
        </div>

        <section>
          <p className="text-zinc-700 leading-relaxed text-lg font-medium italic border-l-4 border-emerald-500 pl-6">
            "Strategic IT professional specializing in lifecycle management, cross-platform technical architecture, and high-availability end-user support. Expert in diagnosing complex hardware/software dependencies and optimizing network performance to minimize downtime."
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-zinc-900 mb-8 flex items-center gap-3">
            <div className="w-8 h-1 bg-emerald-500 rounded-full" />
            Education
          </h2>
          <div className="space-y-8">
            {[
              { title: "Cybersecurity Skills Programme", school: "Progressive School of Business and Engineering", date: "2025" },
              { title: "System Support Skills Programme", school: "Training Force", date: "2020" },
              { title: "Project management NQF Level 4", school: "Prime serve", date: "2019" },
              { title: "IT technical support NQF level 4", school: "Skills Development Cooperate", date: "2018" },
              { title: "Grade 12", school: "Mahlabathini High School", date: "2009" }
            ].map((edu, i) => (
              <div key={i} className="relative pl-8 border-l border-zinc-100">
                <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white" />
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-1">
                  <h3 className="font-bold text-zinc-900">{edu.title}</h3>
                  <span className="text-emerald-600 font-bold text-xs bg-emerald-50 text-emerald-600 px-2 py-1 rounded-md">{edu.date}</span>
                </div>
                <p className="text-zinc-500 text-sm">{edu.school}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-zinc-900 mb-8 flex items-center gap-3">
            <div className="w-8 h-1 bg-emerald-500 rounded-full" />
            Work Experience
          </h2>
          <div className="bg-zinc-50 p-8 rounded-2xl border border-zinc-100">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-zinc-900">Homemark</h3>
                <p className="text-emerald-600 font-bold">Call center Agent</p>
              </div>
              <span className="text-zinc-400 text-sm font-medium">Feb 2015 – Aug 2016</span>
            </div>
            <p className="text-zinc-600 leading-relaxed">
              Provided high-quality customer support and technical assistance in a fast-paced environment. Specialized in user support and technical problem solving.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-zinc-900 mb-8 flex items-center gap-3">
            <div className="w-8 h-1 bg-emerald-500 rounded-full" />
            Achievements & Key Projects
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PROJECTS.map((project, i) => (
              <a 
                key={i} 
                href={project.demo} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-6 bg-white border border-zinc-200 rounded-2xl hover:border-emerald-500 hover:shadow-xl transition-all group"
              >
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-bold text-zinc-900 group-hover:text-emerald-600 transition-colors">{project.title}</h4>
                  <ExternalLink size={14} className="text-zinc-400 group-hover:text-emerald-500" />
                </div>
                <p className="text-xs text-zinc-500 line-clamp-2">{project.businessProblem}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.techStack.slice(0, 2).map((tech, j) => (
                    <span key={j} className="text-[10px] bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded-full font-medium">{tech}</span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  </div>
);

const LinkedInContent = () => (
  <div className="space-y-12">
    <div className="bg-zinc-50 p-6 rounded-xl border border-zinc-200">
      <h3 className="font-bold text-zinc-900 mb-2">Headline Suggestions</h3>
      <div className="space-y-3">
        <div className="p-3 bg-white border border-zinc-200 rounded-lg text-sm">
          AI & Machine Learning Developer | Building Scalable Intelligent Systems | Python • TensorFlow • Scikit-learn
        </div>
        <div className="p-3 bg-white border border-zinc-200 rounded-lg text-sm">
          Junior ML Engineer | Bootcamp Graduate | NLP & Predictive Analytics Specialist | Passionate about Data-Driven Impact
        </div>
      </div>
    </div>

    <div>
      <h3 className="font-bold text-zinc-900 mb-4">About Section (Story-Driven)</h3>
      <div className="bg-zinc-50 p-6 rounded-xl border border-zinc-200 text-sm text-zinc-700 leading-relaxed whitespace-pre-wrap">
{`I don't just build models; I solve business problems with data.

My journey into Artificial Intelligence started with a simple question: How can we make sense of the noise? After completing an intensive AI/ML bootcamp, I've dedicated myself to building systems that don't just predict, but perform.

What I bring to the table:
🚀 End-to-End ML Pipelines: From raw ingestion to production deployment.
🧠 Deep Learning Expertise: CNNs for vision, RNNs/LSTMs for sequence data.
🛠️ Modern Tech Stack: Python, TensorFlow, PyTorch, Docker, and AWS.
🤝 Agile Mindset: Collaborative, iterative, and focused on business value.

I’ve built predictive maintenance tools that save thousands in operational costs and NLP engines that understand the nuance of human sentiment. 

Currently looking for my next challenge in the AI space. Let's connect!

#MachineLearning #AI #DataScience #MLEngineer`}
      </div>
    </div>

    <div>
      <h3 className="font-bold text-zinc-900 mb-4">Weekly Content Strategy</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { day: 'Monday', topic: 'Project Spotlight', desc: 'Share a technical challenge you solved in a recent project.' },
          { day: 'Wednesday', topic: 'Learning Log', desc: 'Discuss a new paper or tool you explored this week.' },
          { day: 'Friday', topic: 'AI for Business', desc: 'Case study on how AI is transforming a specific industry.' }
        ].map(item => (
          <div key={item.day} className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
            <span className="text-xs font-bold text-emerald-600 uppercase">{item.day}</span>
            <h4 className="font-bold text-zinc-900 mt-1">{item.topic}</h4>
            <p className="text-xs text-zinc-600 mt-2">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ReadmeContent = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h3 className="font-bold text-zinc-900">Standardized GitHub README Template</h3>
      <button className="text-sm text-emerald-600 font-bold">Copy Markdown</button>
    </div>
    <div className="bg-zinc-900 text-zinc-300 p-6 rounded-xl font-mono text-xs overflow-x-auto">
<pre>{`# Project Title: [Name]

![License](https://img.shields.io/badge/license-MIT-green)
![Python](https://img.shields.io/badge/python-3.9+-blue)
![TensorFlow](https://img.shields.io/badge/framework-TensorFlow-orange)

## 📌 Project Overview
A brief 2-3 sentence summary of what this project does and why it matters.

## 💼 Business Problem
What specific problem is this model solving? Who are the stakeholders?

## 📊 Dataset Description
- **Source:** [Link to dataset]
- **Size:** [Number of rows/columns]
- **Features:** [Key features used]

## 🛠️ Technical Pipeline
1. **Data Cleaning:** Handling nulls, outliers, and encoding.
2. **Feature Engineering:** [Specific techniques used].
3. **Model Selection:** Why did you choose this architecture?
4. **Training:** Hyperparameters and optimization strategy.

## 📈 Results & Insights
- **Metric A:** [Value]
- **Metric B:** [Value]
- **Key Insight:** What did the model reveal about the data?

## 🚀 Deployment
- **Stack:** [Streamlit/Flask/Docker]
- **Cloud:** [AWS/GCP/Heroku]
- **Live Demo:** [Link]

## 💻 How to Run Locally
\`\`\`bash
git clone [repo-url]
pip install -r requirements.txt
python app.py
\`\`\`

## 🔮 Future Improvements
- [ ] List item 1
- [ ] List item 2`}</pre>
    </div>
  </div>
);

const PresentationContent = () => (
  <div className="space-y-8">
    <h3 className="font-bold text-zinc-900">10-Minute Capstone Showcase Structure</h3>
    <div className="space-y-6">
      {[
        { slide: '01: Introduction', content: 'Personal background, bootcamp journey, and project motivation.', notes: 'Hook the audience with a personal story about why you chose this problem.' },
        { slide: '02: The Problem', content: 'Clear definition of the business pain point and impact.', notes: 'Use data to show the scale of the problem you are solving.' },
        { slide: '03: Data & EDA', content: 'Dataset overview and key exploratory insights.', notes: 'Show one powerful visualization that explains the data distribution.' },
        { slide: '04: Architecture', content: 'Deep dive into the model structure and pipeline.', notes: 'Explain WHY you chose this specific model over others.' },
        { slide: '05: Performance', content: 'Metrics, confusion matrix, and error analysis.', notes: 'Be honest about where the model fails and how you addressed it.' },
        { slide: '06: Live Demo', content: 'Walkthrough of the deployed application.', notes: 'Keep it snappy. Show the input, the prediction, and the confidence score.' },
        { slide: '07: Business Value', content: 'Translating metrics into dollars or hours saved.', notes: 'This is what hiring managers care about most.' },
        { slide: '08: Q&A', content: 'Closing thoughts and future roadmap.', notes: 'Prepare for questions about scalability and data drift.' }
      ].map((item, i) => (
        <div key={i} className="flex gap-6 p-4 border border-zinc-100 rounded-xl hover:bg-zinc-50 transition-colors">
          <div className="flex-shrink-0 w-10 h-10 bg-zinc-100 rounded-lg flex items-center justify-center font-bold text-zinc-400">{i+1}</div>
          <div>
            <h4 className="font-bold text-zinc-900">{item.slide}</h4>
            <p className="text-sm text-zinc-600 mb-2">{item.content}</p>
            <div className="p-3 bg-emerald-50 rounded-lg text-xs text-emerald-800 italic">
              <strong>Speaker Note:</strong> {item.notes}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const StrategyContent = () => (
  <div className="space-y-12">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h3 className="font-bold text-zinc-900 flex items-center gap-2">
          <Target className="text-emerald-600" size={20} /> Target Roles
        </h3>
        <ul className="space-y-2 text-sm text-zinc-600">
          <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> Junior Machine Learning Engineer</li>
          <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> AI Developer / NLP Engineer</li>
          <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> Data Scientist (Entry-Level)</li>
          <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> MLOps Associate</li>
        </ul>
      </div>
      <div className="space-y-6">
        <h3 className="font-bold text-zinc-900 flex items-center gap-2">
          <Search className="text-emerald-600" size={20} /> Target Industries
        </h3>
        <ul className="space-y-2 text-sm text-zinc-600">
          <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> FinTech (Fraud & Risk)</li>
          <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> HealthTech (Diagnostics)</li>
          <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> E-commerce (Personalization)</li>
          <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> Manufacturing (Predictive Maint.)</li>
        </ul>
      </div>
    </div>

    <div className="bg-zinc-900 text-white p-8 rounded-2xl">
      <h3 className="text-xl font-bold mb-6">90-Day Roadmap to Hired</h3>
      <div className="space-y-6">
        <div className="flex gap-4">
          <div className="w-1 h-auto bg-emerald-500 rounded-full" />
          <div>
            <h4 className="font-bold">Days 1-30: Foundation & Portfolio</h4>
            <p className="text-sm text-zinc-400">Finalize 4 projects, deploy to cloud, and optimize LinkedIn/Resume for ATS keywords.</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-1 h-auto bg-emerald-500 rounded-full" />
          <div>
            <h4 className="font-bold">Days 31-60: Outreach & Interview Prep</h4>
            <p className="text-sm text-zinc-400">Start networking with 5 recruiters/day. Practice LeetCode (Easy/Medium) and ML Theory.</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-1 h-auto bg-emerald-500 rounded-full" />
          <div>
            <h4 className="font-bold">Days 61-90: Active Interviewing</h4>
            <p className="text-sm text-zinc-400">Mock interviews, technical take-homes, and salary negotiation practice.</p>
          </div>
        </div>
      </div>
    </div>

    <div>
      <h3 className="font-bold text-zinc-900 mb-4">Recruiter Outreach Template</h3>
      <div className="bg-zinc-50 p-6 rounded-xl border border-zinc-200 text-sm text-zinc-700 italic">
        "Hi [Name], I've been following [Company]'s work in [Industry] and was particularly impressed by your recent [Project/News]. I'm a Junior ML Engineer with a focus on [Specialization] and have built several production-ready tools using [Tech Stack]. I'd love to learn more about how my skills could contribute to your team. Do you have 10 minutes for a brief chat?"
      </div>
    </div>
  </div>
);
