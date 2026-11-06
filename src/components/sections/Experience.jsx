import React from 'react';
import { Briefcase, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext';
import developerData from '../../data/developerData';
import SpotlightCard from '../ui/SpotlightCard';
import RevealOnScroll from '../ui/RevealOnScroll';
import SectionHeading from '../ui/SectionHeading';

const Experience = () => {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();

  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-gray-950/40">
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" aria-hidden="true" />

      <div className="container mx-auto px-4 relative z-10">
        <RevealOnScroll width="100%">

          <SectionHeading title={t('experience.subtitle')} className="mb-20" />

          <div className="max-w-4xl mx-auto relative">
            <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 bg-gradient-to-b from-emerald-500 via-teal-400 to-emerald-500/20" aria-hidden="true" />
            <ol className="relative space-y-12 list-none">

            {developerData.experience.map((exp, index) => {
              const isEven = index % 2 === 0;

              return (
                <li
                  key={`${exp.company}-${currentLanguage}`}
                  className={`relative flex flex-col md:flex-row items-start ${isEven ? 'md:flex-row-reverse' : ''} group`}
                >
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-4 z-20 flex items-center justify-center w-11 h-11 rounded-full border-2 border-emerald-400/80 bg-gray-900 text-emerald-400 group-hover:border-emerald-300 transition-colors duration-300" aria-hidden="true">
                    <Briefcase size={18} />
                  </div>

                  <div className="w-full pl-16 md:pl-0 md:w-[calc(50%-40px)]">
                    <SpotlightCard className="p-6 sm:p-7" spotlightColor="rgba(16, 185, 129, 0.15)">
                      <div className="flex items-center gap-2 text-xs text-emerald-300 bg-emerald-500/10 px-3 py-1 rounded-full w-fit mb-3 border border-emerald-500/20 tabular-nums">
                        <Calendar size={13} aria-hidden="true" />
                        <span>{exp.period}</span>
                      </div>

                      <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors mb-1">
                        {exp.position}
                      </h3>
                      <p className="text-sm font-semibold text-teal-300 mb-3">
                        {exp.company}
                      </p>

                      <p className="text-sm text-gray-300 leading-relaxed">
                        {developerData.getExperienceDescription(exp.company)}
                      </p>
                    </SpotlightCard>
                  </div>
                </li>
              );
            })}
            </ol>
          </div>

        </RevealOnScroll>
      </div>
    </section>
  );
};

export default Experience;
