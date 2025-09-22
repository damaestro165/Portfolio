import React, { useState } from 'react';
import { ChevronRight, Menu, X } from 'lucide-react';

const App = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState('StartGlobal');

  const projects = [
    { name: 'StartGlobal', link: '#' },
    { name: 'Payper', link: '#' },
    { name: 'Vipline', link: '#' },
    { name: 'Matafy', link: '#' },
    { name: 'Fleetsu', link: '#' }
  ];

  const highlights = [
    'Open for full-time remote roles',
    '2+ years of experience',
    'Proficient in React, Next.js, and Tailwind CSS',
    'Experience with Node.js and Express',
    'Skilled in building responsive UIs',
    'Familiar with RESTful APIs and GraphQL',
    'Strong understanding of version control (Git)',
    ' Excellent problem-solving skills',
    ' Effective communicator and team player',
    'Based in Lagos, Nigeria',
    'Open for freelance'
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">YD</span>
              </div>
              <span className="text-sm font-medium">yomi_dev</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-sm text-gray-700 hover:text-black transition-colors">
                About
              </a>
              <a href="#works" className="text-sm text-gray-700 hover:text-black transition-colors">
                Works
              </a>
              <a href="#contact" className="text-sm text-gray-700 hover:text-black transition-colors">
                Contact
              </a>
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
              <a href="#about" className="block text-sm text-gray-700">About</a>
              <a href="#works" className="block text-sm text-gray-700">Works</a>
              <a href="#contact" className="block text-sm text-gray-700">Contact</a>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className=" pt-16 min-h-screen flex flex-col lg:flex-row">
        {/* Left Section - Hero */}
        <div className="flex-1 px-6 lg:px-12 py-12 lg:py-24 flex flex-col justify-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-dm-sans lg:text-7xl font-bold leading-tight mb-8">
              I'm Abayomi<br />Adeniyi.
            </h1>
            <p className="text-xl font-inter-tight lg:text-2xl text-gray-700 leading-relaxed">
             I'm a frontend developer; my specialty is creating scalable, high-performing web apps that increase user engagement and boost productivity. Available for work.
            </p>
          </div>
        </div>

        {/* Right Section - Selected Projects */}
        <div className="lg:w-96 px-6 lg:px-8 py-12 lg:py-24 bg-gray-50 lg:bg-transparent">
          <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-6">
            Selected Projects
          </h3>
          <div className="space-y-1">
            {projects.map((project) => (
              <a
                key={project.name}
                href={project.link}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedProject(project.name);
                }}
                className={`group flex items-center justify-between py-3 px-4 rounded-lg transition-all duration-200 ${
                  selectedProject === project.name
                    ? 'bg-black text-white'
                    : 'hover:bg-gray-100'
                }`}
              >
                <span className="font-medium">{project.name}</span>
                <ChevronRight 
                  size={16} 
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
      </div>

      {/* Highlights Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-lime-200 py-3 overflow-hidden">
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
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default App;