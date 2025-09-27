import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Mail, Github, Linkedin, Twitter, ExternalLink, Code2, Palette, Rocket, Menu, X } from 'lucide-react';

const App = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState('Plusmed');
  const [activeSection, setActiveSection] = useState('home');
  const [visibleSections, setVisibleSections] = useState(new Set(['home']));

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
      tech: ['React', 'Redux', 'Firebase' ],
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
    { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux', ] },
    { category: 'Backend', items: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'REST APIs', 'GraphQL'] },
    { category: 'Tools', items: ['Git', 'Docker', 'Webpack', 'Vite', 'Figma', 'VS Code'] },
  ];

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
          { threshold: 0.3 }
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

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        activeSection !== 'home' ? 'bg-white/55 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div 
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => scrollToSection('home')}
            >
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">YD</span>
              </div>
              <span className="text-sm font-medium">yomidev.</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {['home', 'about', 'works', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-sm capitalize transition-all duration-300 relative ${
                    activeSection === section 
                      ? 'text-black font-semibold' 
                      : 'text-gray-600 hover:text-black'
                  }`}
                >
                  {section}
                  {activeSection === section && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-black animate-slideIn"></span>
                  )}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-6 py-4 space-y-4">
              {['home', 'about', 'works', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="block text-sm text-gray-700 capitalize w-full text-left"
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Home Section */}
      <section 
        id="home" 
        ref={homeRef}
        className="min-h-screen flex flex-col lg:flex-row pt-16"
      >
        <div className={`flex-1 px-6 lg:px-12 py-12 lg:py-24 flex flex-col justify-center transition-all duration-1000 ${
          visibleSections.has('home') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="max-w-2xl">
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-8 animate-fadeInUp">
              I'm Abayomi<br />Adeniyi.
            </h1>
            <p className="text-xl lg:text-2xl text-gray-700 leading-relaxed animate-fadeInUp animation-delay-200">
              I'm a frontend developer; my specialty is creating scalable, high-performing web apps that increase user engagement and boost productivity. Available for work.
            </p>
            <div className="mt-8 flex gap-4 animate-fadeInUp animation-delay-400">
              <button 
                onClick={() => scrollToSection('works')}
                className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
              >
                View Works <ArrowRight size={16} />
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="px-6 py-3 border border-black text-black rounded-lg hover:bg-black hover:text-white transition-all"
              >
                Get in Touch
              </button>
            </div>
          </div>
        </div>

        <div className="lg:w-96 px-6 lg:px-8 py-12 lg:py-24 bg-gray-50 lg:bg-transparent">
          <h3 className={`text-xs uppercase tracking-wider text-gray-500 mb-6 transition-all duration-1000 ${
            visibleSections.has('home') ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            Selected Projects
          </h3>
          <div className="space-y-1">
            {projects.map((project, index) => (
              <a
                key={project.name}
                href={project.link}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedProject(project.name);
                }}
                className={`group flex items-center justify-between py-3 px-4 transition-all duration-500 border-b-2 border-gray-100 hover:border-black ${
                  selectedProject === project.name ? 'border-black border-b-2 font-bold text-black' 
                  : 'hover:border-black border-b-2 text-gray-700'
                }`}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: visibleSections.has('home') ? 'slideInRight 0.6s ease-out forwards' : 'none',
                  opacity: visibleSections.has('home') ? 1 : 0
                }}
              >
                <span className={`transition-transform duration-200 font-semibold ${
                  selectedProject === project.name
                    ? 'translate-x-1'
                    : 'group-hover:translate-x-1'
                }`}>{project.name}</span>
                <ArrowRight
                  size={16} 
                  strokeWidth={3}
                  className={`transition-transform duration-200 ${
                    selectedProject === project.name
                      ? 'translate-x-1'
                      : 'group-hover:translate-x-1'
                  }`}
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section 
        id="about" 
        ref={aboutRef}
        className="min-h-screen flex items-center py-20 px-6 lg:px-12 bg-gray-50"
      >
        <div className={`max-w-6xl mx-auto w-full transition-all duration-1000 ${
          visibleSections.has('about') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}>
          <h2 className="text-4xl font-bold mb-12">About Me</h2>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                I'm a passionate frontend developer with over 2 years of experience building modern web applications. 
                I specialize in creating intuitive user interfaces that deliver exceptional user experiences.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                My journey in web development started with a curiosity about how things work on the internet. 
                Today, I work with cutting-edge technologies to bring ideas to life.
              </p>
              
              <div className="flex gap-4 pt-4">
                <Code2 className="text-black" size={24} />
                <Palette className="text-black" size={24} />
                <Rocket className="text-black" size={24} />
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-semibold mb-4">Skills & Technologies</h3>
              {skills.map((skillGroup, index) => (
                <div 
                  key={skillGroup.category}
                  className="animate-slideInUp"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-3">
                    {skillGroup.category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill) => (
                      <span 
                        key={skill}
                        className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm hover:border-black hover:bg-black hover:text-white transition-all cursor-default"
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

      {/* Works Section */}
      <section 
        id="works" 
        ref={worksRef}
        className="min-h-screen py-16 px-6 lg:px-12"
      >
        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${
          visibleSections.has('works') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}>
          <h2 className="text-4xl font-bold mb-12">Selected Works</h2>
          
          <div className="grid lg:px-20 md:grid-cols-2 gap-8">

            {projects.map((project, index) => (
              <div 
                key={project.name}
                className="group relative overflow-hidden rounded-lg bg-gray-100 hover:shadow-2xl transition-all duration-500 animate-fadeInUp"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="aspect-[6/3] bg-gradient-to-br from-gray-200 to-gray-300 relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl font-bold text-white/20 group-hover:scale-110 transition-transform duration-500">
                      {project.name}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:translate-x-2 transition-transform duration-300">
                    {project.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span key={tech} className="text-xs px-2 py-1 bg-gray-100 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <a 
                    href={project.link}
                    className="inline-flex items-center gap-2 text-sm font-semibold hover:gap-3 transition-all duration-300"
                  >
                    View Project <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        id="contact" 
        ref={contactRef}
        className="min-h-screen flex items-center py-20 px-6 lg:px-12 bg-black text-white"
      >
        <div className={`max-w-4xl mx-auto text-center w-full transition-all duration-1000 ${
          visibleSections.has('contact') ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}>
          <h2 className="text-4xl lg:text-6xl font-bold mb-8">Let's Work Together</h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            I'm currently available for freelance work and full-time positions. 
            If you have a project in mind or just want to say hi, feel free to reach out!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a 
              href="mailto:hello@yomidev.com"
              className="px-8 py-4 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
            >
              <Mail size={20} />
              adeniyiabayomi16@gmail.com
            </a>
            <a 
              href="https://docs.google.com/document/d/1UmDSmB8PoBUxjDPsfTDHsZzIDBfm01FmeLw77YrBqvM/edit?usp=sharing"
              className="px-8 py-4 border border-white rounded-lg hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2"
            >
              Download CV
            </a>
          </div>
          
          <div className="flex gap-6 justify-center">
            <a href="#" className="hover:scale-110 transition-transform">
              <Github size={24} />
            </a>
            <a href="#" className="hover:scale-110 transition-transform">
              <Linkedin size={24} />
            </a>
            <a href="#" className="hover:scale-110 transition-transform">
              <Twitter size={24} />
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
                <span className="text-sm font-medium text-black">
                  {item}
                </span>
                <span className="text-black">•</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
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
        
        @keyframes slideIn {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-slideInUp {
          animation: slideInUp 0.6s ease-out forwards;
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out forwards;
        }
        
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        
        .animation-delay-400 {
          animation-delay: 400ms;
        }
      `}</style>
    </div>
  );
};

export default App;