import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Mail, Github, Linkedin, Twitter, ExternalLink, Code2, Palette, Rocket, Menu, X, ArrowUpRight } from 'lucide-react';

const App = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState('Plusmed');
  const [activeSection, setActiveSection] = useState('home');
  const [visibleSections, setVisibleSections] = useState(new Set(['home']));
  const [scrollProgress, setScrollProgress] = useState(0);

  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const worksRef = useRef(null);
  const contactRef = useRef(null);

  const projects = [
    { 
      name: 'Plusmed', 
      description: 'Healthcare management platform',
      tech: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Hugging Face API'],
      link: 'https://plusmed.vercel.app/',
      image: '/plusmed.png'
    },
    { 
      name: 'Langner', 
      description: 'Language learning application',
      tech: ['Next.js', 'TypeScript', 'Tailwind'],
      link: 'https://langner.vercel.app/',
      image: '/Langner.png'
    },
    { 
      name: 'Funiro', 
      description: 'E-commerce furniture store',
      tech: ['React', 'Redux', 'Firebase'],
      link: 'https://funiro-three.vercel.app/',
      image: '/funiro.png'
    },
    { 
      name: 'Taskbolt', 
      description: 'Project management tool',
      tech: ['React', 'Express'],
      link: 'https://taskbolt.vercel.app/login',
      image: '/taskbolt.png'
    },
  ];

  const highlights = [
    'Open for full-time remote roles',
    '2+ years of experience',
    'Proficient in React, Next.js, and Tailwind CSS',
    'Experience with Node.js and Express',
    'Skilled in building responsive UIs',
    'Familiar with RESTful APIs and GraphQL',
    'Strong understanding of version control (Git)',
    'Excellent problem-solving skills',
    'Effective communicator and team player',
    'Based in Lagos, Nigeria',
    'Open for freelance'
  ];

  const skills = [
    { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux'] },
    { category: 'Backend', items: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'REST APIs', 'GraphQL'] },
    { category: 'Tools', items: ['Git', 'Docker', 'Webpack', 'Vite', 'Figma', 'VS Code'] },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxScroll) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observers = [];
    const sections = [
      { ref: homeRef, id: 'home' },
      { ref: aboutRef, id: 'about' },
      { ref: worksRef, id: 'works' },
      { ref: contactRef, id: 'contact' },
    ];

    sections.forEach(({ ref, id }) => {
      if (ref.current) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setActiveSection(id);
                setVisibleSections(prev => new Set([...prev, id]));
              }
            });
          },
          { threshold: 0.3, rootMargin: '-50px' }
        );
        observer.observe(ref.current);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const selectedProjectData = projects.find(p => p.name === selectedProject);

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-[60] bg-gray-200">
        <div 
          className="h-full bg-black transition-all duration-200 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        activeSection !== 'home' ? 'bg-white/90 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div 
              className="flex items-center space-x-3 cursor-pointer group"
              onClick={() => scrollToSection('home')}
            >
              <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-white text-sm font-bold" style={{ fontFamily: "'Inter', sans-serif" }}>YD</span>
              </div>
              <span className="text-base font-semibold tracking-tight" style={{ fontFamily: "'Inter', sans-serif" }}>yomidev.</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-10">
              {['home', 'about', 'works', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-sm capitalize transition-all duration-300 relative group ${
                    activeSection === section 
                      ? 'text-black font-semibold' 
                      : 'text-gray-600 hover:text-black'
                  }`}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {section}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-black transition-all duration-300 ${
                    activeSection === section ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden fixed inset-x-0 top-20 bg-white/95 backdrop-blur-lg shadow-2xl transition-all duration-500 ${
          mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
        }`}>
          <div className="px-6 py-6 space-y-2">
            {['home', 'about', 'works', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="block text-base text-gray-700 capitalize w-full text-left p-3 rounded-lg hover:bg-gray-100 transition-colors"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {section}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Home Section with Parallax */}
      <section 
        id="home" 
        ref={homeRef}
        className="min-h-screen flex flex-col lg:flex-row pt-20 lg:px-10 relative"
      >
        <div className={`flex-1 px-6 lg:px-12 py-12 lg:py-24 flex flex-col justify-center transition-all duration-1000 transform ${
          visibleSections.has('home') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="max-w-2xl">
            <h1 
              className="text-5xl lg:text-7xl font-bold leading-tight mb-8"
              style={{ 
                fontFamily: "'Inter', sans-serif",
                animation: visibleSections.has('home') ? 'fadeInUp 0.8s ease-out' : 'none'
              }}
            >
              I'm Abayomi<br />Adeniyi.
            </h1>
            <p 
              className="text-xl lg:text-2xl text-gray-700 leading-relaxed"
              style={{ 
                fontFamily: "'Inter', sans-serif",
                animation: visibleSections.has('home') ? 'fadeInUp 0.8s ease-out 0.2s backwards' : 'none'
              }}
            >
              I'm a frontend developer; my specialty is creating scalable, high-performing web apps that increase user engagement and boost productivity. Available for work.
            </p>
            <div 
              className="mt-8 flex flex-wrap gap-4"
              style={{ animation: visibleSections.has('home') ? 'fadeInUp 0.8s ease-out 0.4s backwards' : 'none' }}
            >
              <button 
                onClick={() => scrollToSection('works')}
                className="px-8 py-4 bg-black text-white rounded-xl hover:bg-gray-800 hover:scale-105 transition-all duration-300 flex items-center gap-2 shadow-xl hover:shadow-2xl"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                View Works <ArrowRight size={18} />
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="px-8 py-4 border-2 border-black text-black rounded-xl hover:bg-black hover:text-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Get in Touch
              </button>
            </div>
          </div>
        </div>

        <div className="lg:w-96 px-6 lg:px-8 py-12 lg:py-24 bg-gradient-to-br from-gray-50 to-white lg:from-transparent lg:to-transparent">
          <h3 
            className={`text-xs uppercase tracking-wider text-gray-500 mb-6 transition-all duration-1000 ${
              visibleSections.has('home') ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Selected Projects
          </h3>
          <div className="space-y-1">
            {projects.map((project, index) => (
              <a
                key={project.name}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setSelectedProject(project.name)}
                className={`group flex items-center justify-between py-4 px-4 transition-all duration-300 border-b-2 rounded-lg ${
                  selectedProject === project.name 
                    ? 'border-black bg-gray-50 shadow-md' 
                    : 'border-gray-100 hover:border-black hover:bg-gray-50'
                }`}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  animationDelay: `${index * 100}ms`,
                  animation: visibleSections.has('home') ? 'slideInRight 0.6s ease-out backwards' : 'none'
                }}
              >
                <div className="flex-1">
                  <span className={`font-semibold transition-all duration-200 ${
                    selectedProject === project.name
                      ? 'text-black translate-x-1'
                      : 'text-gray-700 group-hover:text-black group-hover:translate-x-1'
                  }`}>{project.name}</span>
                  <p className="text-xs text-gray-500 mt-1">{project.description}</p>
                </div>
                <ArrowUpRight
                  size={18} 
                  strokeWidth={2.5}
                  className={`transition-all duration-200 ${
                    selectedProject === project.name
                      ? 'translate-x-1 -translate-y-1 text-black'
                      : 'text-gray-400 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-black'
                  }`}
                />
              </a>
            ))}
          </div>
          
          {/* Preview Card */}
          {selectedProjectData && (
            <div className="mt-6 p-4 bg-black text-white rounded-xl shadow-xl">
              <p className="text-xs opacity-70 mb-2">Currently viewing:</p>
              <p className="font-semibold">{selectedProjectData.name}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {selectedProjectData.tech.slice(0, 3).map((tech) => (
                  <span key={tech} className="text-xs px-2 py-1 bg-white/10 rounded">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* About Section with Overlap Effect */}
      <section 
        id="about" 
        ref={aboutRef}
        className="min-h-screen flex items-center py-20 px-6 lg:px-12 bg-gradient-to-br from-gray-50 to-white relative z-10"
        style={{ marginTop: '-100px', paddingTop: '150px' }}
      >
        <div className={`max-w-6xl mx-auto w-full transition-all duration-1000 transform ${
          visibleSections.has('about') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}>
          <h2 className="text-4xl lg:text-5xl font-bold mb-12" style={{ fontFamily: "'Inter', sans-serif" }}>About Me</h2>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                I'm a passionate frontend developer with over 2 years of experience building modern web applications. 
                I specialize in creating intuitive user interfaces that deliver exceptional user experiences.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                My journey in web development started with a curiosity about how things work on the internet. 
                Today, I work with cutting-edge technologies to bring ideas to life.
              </p>
              
              <div className="flex gap-6 pt-4">
                <div className="p-3 bg-black text-white rounded-lg hover:scale-110 transition-transform cursor-pointer">
                  <Code2 size={24} />
                </div>
                <div className="p-3 bg-black text-white rounded-lg hover:scale-110 transition-transform cursor-pointer">
                  <Palette size={24} />
                </div>
                <div className="p-3 bg-black text-white rounded-lg hover:scale-110 transition-transform cursor-pointer">
                  <Rocket size={24} />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-semibold mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
                Skills & Technologies
              </h3>
              {skills.map((skillGroup, index) => (
                <div 
                  key={skillGroup.category}
                  style={{ 
                    animation: visibleSections.has('about') ? `slideInUp 0.6s ease-out ${index * 0.1}s backwards` : 'none'
                  }}
                >
                  <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {skillGroup.category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill) => (
                      <span 
                        key={skill}
                        className="px-4 py-2 bg-white border-2 border-gray-200 rounded-full text-sm hover:border-black hover:bg-black hover:text-white transition-all duration-300 cursor-default hover:scale-105 shadow-sm hover:shadow-lg"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Works Section with Overlap */}
      <section 
        id="works" 
        ref={worksRef}
        className="min-h-screen py-20 px-6 lg:px-12 bg-white relative z-20"
        style={{ marginTop: '-50px', paddingTop: '100px' }}
      >
        <div className={`max-w-6xl mx-auto transition-all duration-1000 transform ${
          visibleSections.has('works') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}>
          <h2 className="text-4xl lg:text-5xl font-bold mb-12" style={{ fontFamily: "'Inter', sans-serif" }}>
            Selected Works
          </h2>
          
          <div className="grid lg:px-20 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div 
                key={project.name}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]"
                style={{ 
                  animation: visibleSections.has('works') ? `fadeInUp 0.8s ease-out ${index * 0.15}s backwards` : 'none'
                }}
              >
                <div className="aspect-[16/10] bg-gradient-to-br from-gray-200 to-gray-300 relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:translate-x-2 transition-transform duration-300" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {project.name}
                  </h3>
                  <p className="text-gray-600 mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span 
                        key={tech} 
                        className="text-xs px-3 py-1 bg-gray-100 rounded-full border border-gray-200"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <a 
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold hover:gap-3 transition-all duration-300 group/link"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    View Project 
                    <ExternalLink size={16} className="group-hover/link:rotate-45 transition-transform duration-300" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section with Overlap */}
      <section 
        id="contact" 
        ref={contactRef}
        className="min-h-screen flex items-center py-20 px-6 lg:px-12 bg-black text-white relative z-30"
        style={{ marginTop: '-50px', paddingTop: '100px' }}
      >
        <div className={`max-w-4xl mx-auto text-center w-full transition-all duration-1000 transform ${
          visibleSections.has('contact') ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}>
          <h2 className="text-4xl lg:text-6xl font-bold mb-8" style={{ fontFamily: "'Inter', sans-serif" }}>
            Let's Work Together
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
            I'm currently available for freelance work and full-time positions. 
            If you have a project in mind or just want to say hi, feel free to reach out!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a 
              href="mailto:adeniyiabayomi16@gmail.com"
              className="px-8 py-4 bg-white text-black rounded-xl hover:bg-gray-200 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 shadow-2xl"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <Mail size={20} />
              adeniyiabayomi16@gmail.com
            </a>
            <a 
              href="https://docs.google.com/document/d/1UmDSmB8PoBUxjDPsfTDHsZzIDBfm01FmeLw77YrBqvM/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border-2 border-white rounded-xl hover:bg-white hover:text-black hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Download CV
            </a>
          </div>
          
          <div className="flex gap-8 justify-center">
            <a href="#" className="hover:scale-125 transition-transform duration-300">
              <Github size={28} />
            </a>
            <a href="#" className="hover:scale-125 transition-transform duration-300">
              <Linkedin size={28} />
            </a>
            <a href="#" className="hover:scale-125 transition-transform duration-300">
              <Twitter size={28} />
            </a>
          </div>
        </div>
      </section>

      {/* Highlights Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-lime-400 py-3 overflow-hidden z-40">
        <div className="flex animate-scroll">
          <div className="flex items-center space-x-8 px-8 whitespace-nowrap">
            {[...highlights, ...highlights].map((item, index) => (
              <React.Fragment key={index}>
                <span className="text-sm font-medium text-black" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {item}
                </span>
                <span className="text-black">•</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
        
        * {
          font-family: 'Inter', sans-serif;
        }
        
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default App;