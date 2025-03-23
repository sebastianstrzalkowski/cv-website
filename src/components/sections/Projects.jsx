import React from 'react';
import { useTranslation } from 'react-i18next';
import developerData from '../../data/developerData';
import { ExternalLink } from 'lucide-react';

const Projects = () => {
  const { t } = useTranslation();

  return (
      <section id="projects" className="py-20 bg-gray-900 text-white p-4 relative">
        {/* Background accents */}
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-green-500 rounded-full opacity-10 blur-3xl"></div>

        <div className="container mx-auto relative z-10">
          <div className="text-center mb-12">
            <span className="inline-block bg-green-400 bg-opacity-30 text-green-300 px-4 py-1 rounded-full text-sm font-medium mb-4">{t('projects.title')}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">{t('projects.subtitle')}</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {developerData.projects.map((project, index) => (
                <div key={index} className="bg-gray-800 bg-opacity-90 rounded-xl overflow-hidden shadow-xl border border-gray-700 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-green-900 hover:shadow-lg group">
                  <div className="bg-gradient-to-r from-green-400 to-teal-400 h-2"></div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <h3 className="text-xl font-semibold text-white group-hover:text-green-400 transition-colors">{project.title}</h3>
                        {project.role && <span className="text-sm text-green-300">{project.role}</span>}
                      </div>
                      <span className="text-sm text-gray-300">{project.period}</span>
                    </div>
                    <p className="text-gray-200 mb-4">{developerData.getProjectDescription(project.title)}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {developerData.getProjectTechnologies(project.title).map((tech, techIndex) => (
                          <span key={techIndex} className="bg-gray-700 px-2 py-1 rounded text-xs text-green-300">
                            {tech}
                          </span>
                      ))}
                    </div>
                    {project.url && (
                      <div className="mt-4">
                        <a 
                          href={project.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-flex items-center text-green-400 hover:text-green-300 transition-colors"
                        >
                          {t('projects.viewProject')}
                          <ExternalLink size={16} className="ml-1" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
            ))}
          </div>
        </div>
      </section>
  );
};

export default Projects;