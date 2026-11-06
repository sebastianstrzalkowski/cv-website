import React from 'react';
import { useTranslation } from 'react-i18next';
import { ExternalLink, FolderGit2 } from 'lucide-react';
import developerData from '../../data/developerData';
import SpotlightCard from '../ui/SpotlightCard';
import RevealOnScroll from '../ui/RevealOnScroll';
import SectionHeading from '../ui/SectionHeading';

const Projects = () => {
  const { t } = useTranslation();

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="absolute top-10 left-1/3 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" aria-hidden="true" />

      <div className="container mx-auto px-4 relative z-10">
        <RevealOnScroll width="100%">

          <SectionHeading title={t('projects.subtitle')} />

          <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 list-none">
            {developerData.projects.map((project) => {
              const techList = developerData.getProjectTechnologies(project.title);

              return (
                <li key={project.title} className="h-full">
                  <SpotlightCard className="flex flex-col justify-between group h-full" spotlightColor="rgba(16, 185, 129, 0.2)">
                    <div className="p-7 flex flex-col flex-grow justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors">
                            <FolderGit2 size={20} aria-hidden="true" />
                          </div>
                          <span className="text-xs text-gray-400 bg-gray-800/60 px-2.5 py-1 rounded-full border border-gray-700/60 tabular-nums">
                            {project.period}
                          </span>
                        </div>

                        <div className="mb-3">
                          <h3 className="text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                            {project.title}
                          </h3>
                          {project.role && (
                            <p className="text-xs font-semibold text-teal-300 mt-1">
                              {project.role}
                            </p>
                          )}
                        </div>

                        <p className="text-sm text-gray-300 mb-6 leading-relaxed">
                          {developerData.getProjectDescription(project.title)}
                        </p>
                      </div>

                      <div>
                        <ul className="flex flex-wrap gap-1.5 mb-6 list-none">
                          {techList.map((tech) => (
                            <li
                              key={tech}
                              className="bg-gray-800/90 text-emerald-200 border border-gray-700/50 px-2.5 py-1 rounded-md text-xs font-medium"
                            >
                              {tech}
                            </li>
                          ))}
                        </ul>

                        {project.url && (
                          <div className="pt-3 border-t border-gray-800/80">
                            <a
                              href={project.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center min-h-9 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors group/link"
                            >
                              <span>{t('projects.viewProject')}</span>
                              <ExternalLink size={15} className="ml-1.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200" aria-hidden="true" />
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </SpotlightCard>
                </li>
              );
            })}
          </ul>

        </RevealOnScroll>
      </div>
    </section>
  );
};

export default Projects;
