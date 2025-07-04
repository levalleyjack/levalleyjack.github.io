
import React, { useState, useRef, useEffect } from 'react';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [repoData, setRepoData] = useState({});
  const containerRef = useRef(null);

  const sections = ['Home', 'Projects', 'Resume'];

  // GitHub repository configurations
  const repositories = [
    {
      id: 'project-one',
      owner: 'levalleyjack',
      name: 'slugtistics',
      title: 'Slugtistics',
      description: 'Founded a full-stack web app to share exclusive course data with students. Built with React and deployed on Cloudflare, consistently reaching 6000+ unique monthly visitors',
      image: 'project1.png',
      tags: ['React', "Express.js", "TypeScript", "SQLite", "Python"]
    },
    {
      id: 'project-two',
      owner: 'levalleyjack',
      name: 'multipass-manager-vscode',
      title: 'Multipass Manager',
      description: 'Developed a Visual Studio Code extension with 1000+ active users for Canonical’s Multipass software',
      image: 'project3.png',
      tags: ['Typescript', 'Ubuntu', 'Virtual Machines']
    }
  ];

  // Fetch GitHub repository data
  useEffect(() => {
    const fetchRepoData = async () => {
      const data = {};
      
      for (const repo of repositories) {
        try {
          const response = await fetch(`https://api.github.com/repos/${repo.owner}/${repo.name}`);
          if (response.ok) {
            const repoInfo = await response.json();
            data[repo.id] = {
              stars: repoInfo.stargazers_count,
              language: repoInfo.language,
              url: repoInfo.html_url
            };
          }
        } catch (error) {
          console.log(`Could not fetch data for ${repo.owner}/${repo.name}`);
          data[repo.id] = {
            stars: 0,
            language: null,
            url: `https://github.com/${repo.owner}/${repo.name}`
          };
        }
      }
      
      setRepoData(data);
    };

    fetchRepoData();
  }, []);

  const scrollToSection = (index) => {
    setActiveSection(index);
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: index * window.innerWidth,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        containerRef.current.scrollTo({
          left: activeSection * window.innerWidth,
          behavior: 'auto'
        });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeSection]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-30"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="Sheep.mp4" type="video/mp4" />
      </video>

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Navigation */}
      <nav className="fixed top-0 right-0 z-50 p-6">
        <div className="flex items-center space-x-8">
          {sections.map((section, index) => (
            <button
              key={section}
              onClick={() => scrollToSection(index)}
              className={`
                relative px-4 py-2 text-sm font-medium tracking-wide transition-all duration-300
                ${activeSection === index 
                  ? 'text-white' 
                  : 'text-white/70 hover:text-white'
                }
              `}
            >
              {section}
              {activeSection === index && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full" />
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content Container */}
      <div
        ref={containerRef}
        className="relative z-20 flex h-screen overflow-x-hidden"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {/* Home Section */}
        <section className="flex-shrink-0 w-screen h-screen flex items-center justify-center px-8">
          <div className="max-w-4xl text-center text-white">
            <h1 className="text-6xl md:text-8xl font-light mb-6 tracking-tight">
              Jack LeValley
            </h1>
            <p className="text-xl md:text-2xl font-light text-white/80 max-w-2xl mx-auto leading-relaxed">
              Founder of Slugtistics, University of California, Santa Cruz's resource for grade distributions.
            </p>
            <div className="mt-12">
              <button 
                onClick={() => scrollToSection(1)}
                className="px-8 py-3 border border-white/30 text-white hover:bg-white hover:text-black transition-all duration-400 text-sm font-medium tracking-wide"
              >
                View My Work
              </button>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="flex-shrink-0 w-screen h-screen flex items-center justify-center px-8">
          <div className="w-[70vw] text-white">
            <h2 className="text-4xl md:text-6xl font-light mb-12 text-center">
              Projects
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {repositories.map((repo) => (
                <div
                  key={repo.id}
                  className="flex flex-col border border-white/20 backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-300 overflow-hidden"
                >
                  <div className="h-60 bg-white/10 overflow-hidden">
                    <img
                      src={repo.image}
                      className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>

                  <div className="flex flex-col justify-between flex-1 p-8">
                    
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-medium">{repo.title}</h3>
                        {repoData[repo.id] && (
                          <div className="flex items-center space-x-4 text-sm text-white/70">
                            <div className="flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              {repoData[repo.id].stars}
                            </div>
                            {repoData[repo.id].language && (
                              <div className="flex items-center">
                                <div className="w-3 h-3 rounded-full bg-blue-400 mr-1"></div>
                                {repoData[repo.id].language}
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      <p className="text-white/80 mb-6 leading-relaxed">
                        {repo.description}
                      </p>
                    </div>

                    <div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {repo.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-white/20 text-xs font-medium rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <a
                        href={
                          repoData[repo.id]?.url ||
                          `https://github.com/${repo.owner}/${repo.name}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex px-4 py-2 border border-white/30 text-white hover:bg-white hover:text-black transition-all duration-300 text-sm font-medium tracking-wide"
                      >
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path fillRule="evenodd"d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"clipRule="evenodd"/>
                        </svg>
                        View on GitHub
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

{/* Resume Section */}
        <section className="flex-shrink-0 w-screen h-screen flex flex-col items-center justify-center px-8 py-16">
          <div className="w-full max-w-6xl text-white">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-4xl md:text-6xl font-light">
                Resume
              </h2>
              <a 
                href="Jack_LeValley_Resume.pdf" 
                download="Jack_LeValley_Resume.pdf"
                className="flex items-center px-6 py-3 border border-white/30 text-white hover:bg-white hover:text-black transition-all duration-300 text-sm font-medium tracking-wide"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Download PDF
              </a>
            </div>
            
            {/* PDF Embed Container */}
            <div className="flex-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg overflow-hidden" style={{ height: 'calc(100vh - 200px)' }}>
              <iframe
                src="Jack_LeValley_Resume.pdf"
                className="w-full h-full"
                title="Resume Preview"
                style={{ border: 'none' }}
              />
        
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Portfolio;