import React from 'react';
import { useTranslation } from 'react-i18next';
import developerData from '../../data/developerData';
import { ExternalLink, FolderGit2, Sparkles } from 'lucide-react';
import SpotlightCard from '../ui/SpotlightCard';
import RevealOnScroll from '../ui/RevealOnScroll';
import { motion } from 'framer-motion';

const Projects = () => {
  const { t } = useTranslation();

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-10 left-1/3 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <RevealOnScroll width="100%">
          
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-sm font-medium mb-4 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
              {t('projects.title')}
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              {t('projects.subtitle')}
            </h2>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {developerData.projects.map((project, index) => {
              const techList = developerData.getProjectTechnologies(project.title);

              return (
                <SpotlightCard
                  key={index}
                  className="flex flex-col justify-between border-gray-800/80 bg-gray-900/60 group h-full"
                  spotlightColor="rgba(16, 185, 129, 0.2)"
                >
                  {/* Neon Top Border line */}
                  <div className="h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="p-7 flex flex-col flex-grow justify-between">
                    <div>
                      {/* Top bar with icon and period */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors">
                          <FolderGit2 size={20} />
                        </div>
                        <span className="text-xs font-mono text-gray-400 bg-gray-800/60 px-2.5 py-1 rounded-full border border-gray-700/60">
                          {project.period}
                        </span>
                      </div>

                      {/* Title & Role */}
                      <div className="mb-3">
                        <h3 className="text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                          {project.title}
                        </h3>
                        {project.role && (
                          <div className="inline-flex items-center gap-1 text-xs font-semibold text-teal-300 mt-1">
                            <Sparkles size={12} className="text-teal-400" />
                            <span>{project.role}</span>
                          </div>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-sm text-gray-300 mb-6 leading-relaxed">
                        {developerData.getProjectDescription(project.title)}
                      </p>
                    </div>

                    <div>
                      {/* Tech stack badges */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {techList.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="bg-gray-800/90 text-emerald-300/90 border border-gray-700/50 px-2.5 py-1 rounded-md text-xs font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Action Link */}
                      {project.url && (
                        <div className="pt-3 border-t border-gray-800/80 flex items-center justify-between">
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors group/link"
                          >
                            <span>{t('projects.viewProject')}</span>
                            <ExternalLink
                              size={15}
                              className="ml-1.5 transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200"
                            />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </SpotlightCard>
              );
            })}
          </div>

        </RevealOnScroll>
      </div>
    </section>
  );
};

export default Projects;