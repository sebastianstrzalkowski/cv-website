import React from 'react';
import { Briefcase, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext';
import developerData from '../../data/developerData';
import SpotlightCard from '../ui/SpotlightCard';
import RevealOnScroll from '../ui/RevealOnScroll';

const Experience = () => {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();

  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-gray-950/40">
      {/* Background ambient accents */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <RevealOnScroll width="100%">
          
          {/* Header */}
          <div className="text-center mb-20">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-sm font-medium mb-4 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
              {t('experience.title')}
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              {t('experience.subtitle')}
            </h2>
          </div>

          {/* Timeline Container */}
          <div className="max-w-4xl mx-auto relative">
            
            {/* Glowing vertical connector line */}
            <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 bg-gradient-to-b from-emerald-500 via-teal-400 to-emerald-500/20 shadow-[0_0_12px_rgba(16,185,129,0.5)]" />

            <div className="space-y-12">
              {developerData.experience.map((exp, index) => {
                const isEven = index % 2 === 0;

                return (
                  <div
                    key={`${index}-${currentLanguage}`}
                    className={`relative flex flex-col md:flex-row items-start ${
                      isEven ? 'md:flex-row-reverse' : ''
                    } group`}
                  >
                    {/* Node Dot / Icon Badge */}
                    <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-4 z-20 flex items-center justify-center w-11 h-11 rounded-full border-2 border-emerald-400/80 bg-gray-900 text-emerald-400 shadow-[0_0_16px_rgba(16,185,129,0.4)] group-hover:scale-110 group-hover:border-emerald-300 group-hover:shadow-[0_0_24px_rgba(16,185,129,0.8)] transition-all duration-300">
                      <Briefcase size={18} />
                    </div>

                    {/* Timeline Content Card */}
                    <div className="w-full pl-16 md:pl-0 md:w-[calc(50%-40px)]">
                      <SpotlightCard
                        className="p-6 sm:p-7 border-gray-800/80 bg-gray-900/70"
                        spotlightColor="rgba(16, 185, 129, 0.15)"
                      >
                        {/* Period pill */}
                        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full w-fit mb-3 border border-emerald-500/20">
                          <Calendar size={13} />
                          <span>{exp.period}</span>
                        </div>

                        {/* Title & Company */}
                        <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors mb-1">
                          {exp.position}
                        </h3>
                        <h4 className="text-sm font-semibold text-teal-400 mb-3">
                          {exp.company}
                        </h4>

                        {/* Description */}
                        <p className="text-sm text-gray-300 leading-relaxed">
                          {developerData.getExperienceDescription(exp.company)}
                        </p>
                      </SpotlightCard>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>

        </RevealOnScroll>
      </div>
    </section>
  );
};

export default Experience;