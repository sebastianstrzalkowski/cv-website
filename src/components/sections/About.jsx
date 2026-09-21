import React from 'react';
import { Layers, ShieldCheck, Cpu, Cloud, GraduationCap, Award, CheckCircle2, Flame } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import developerData from '../../data/developerData';
import SkillTag from '../ui/SkillTag';
import SpotlightCard from '../ui/SpotlightCard';
import RevealOnScroll from '../ui/RevealOnScroll';

const About = () => {
  const { t } = useTranslation();

  const stats = [
    { value: `${developerData.yearsOfExperience}+`, label: t('experience.title'), icon: Flame },
    { value: "15+", label: t('projects.title'), icon: Award },
    { value: "Enterprise", label: "DLT & Java", icon: ShieldCheck },
    { value: "100%", label: "Code Quality", icon: CheckCircle2 },
  ];

  const specializations = [
    {
      icon: Layers,
      title: t('about.specialization.dlt'),
      desc: t('about.specialization.dltDesc'),
      color: "from-emerald-500/20 to-teal-500/10 text-emerald-400"
    },
    {
      icon: ShieldCheck,
      title: t('about.specialization.enterprise'),
      desc: t('about.specialization.enterpriseDesc'),
      color: "from-blue-500/20 to-indigo-500/10 text-blue-400"
    },
    {
      icon: Cpu,
      title: t('about.specialization.distributed'),
      desc: t('about.specialization.distributedDesc'),
      color: "from-purple-500/20 to-pink-500/10 text-purple-400"
    },
    {
      icon: Cloud,
      title: t('about.specialization.cloud'),
      desc: t('about.specialization.cloudDesc'),
      color: "from-cyan-500/20 to-teal-500/10 text-cyan-400"
    }
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <RevealOnScroll width="100%">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-sm font-medium mb-4 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
              {t('about.title')}
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              {t('about.subtitle')}
            </h2>
            <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto mt-6 leading-relaxed">
              {t('developerData.about', { years: developerData.yearsOfExperience })}
            </p>
          </div>

          {/* Key Metrics / Highlights Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <SpotlightCard
                  key={idx}
                  className="p-6 text-center border-gray-800/80 bg-gray-900/60"
                  spotlightColor="rgba(16, 185, 129, 0.12)"
                >
                  <div className="mx-auto w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-3">
                    <Icon size={20} />
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-400 font-medium">
                    {stat.label}
                  </div>
                </SpotlightCard>
              );
            })}
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Skills Matrix */}
            <div className="lg:col-span-6 space-y-8">
              <SpotlightCard className="p-8 border-gray-800/80 bg-gray-900/60">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    {t('about.skills')}
                  </h3>
                  <span className="text-xs text-gray-400 font-mono">
                    {developerData.skills.length} core competencies
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {developerData.skills.map((skill, index) => (
                    <SkillTag key={index} name={skill.name} />
                  ))}
                </div>

                {/* Additional Tech */}
                <h4 className="text-lg font-semibold mb-4 text-emerald-400 flex items-center gap-2">
                  <span>{t('about.additionalTech')}</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {developerData.additionalTech.map((tech, index) => (
                    <motion.span
                      key={index}
                      whileHover={{ scale: 1.06, y: -2 }}
                      className="bg-gray-800/80 hover:bg-emerald-950/40 border border-gray-700/60 hover:border-emerald-500/40 px-3 py-1.5 rounded-lg text-xs font-medium text-emerald-300 transition-colors shadow-sm cursor-default"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </SpotlightCard>
            </div>

            {/* Specializations & Education */}
            <div className="lg:col-span-6 space-y-8">
              
              {/* Specializations */}
              <SpotlightCard className="p-8 border-gray-800/80 bg-gray-900/60">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                  {t('about.specializations')}
                </h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  {specializations.map((spec, idx) => {
                    const Icon = spec.icon;
                    return (
                      <motion.div
                        key={idx}
                        whileHover={{ y: -3 }}
                        className="bg-gray-800/60 border border-gray-700/50 hover:border-emerald-500/40 rounded-xl p-5 transition-all group"
                      >
                        <div className={`w-11 h-11 rounded-lg bg-gradient-to-br ${spec.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200`}>
                          <Icon size={22} />
                        </div>
                        <h4 className="font-semibold text-white group-hover:text-emerald-300 transition-colors mb-1 text-sm sm:text-base">
                          {spec.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                          {spec.desc}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
              </SpotlightCard>

              {/* Education */}
              <SpotlightCard className="p-8 border-gray-800/80 bg-gray-900/60">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <GraduationCap className="text-emerald-400" size={24} />
                  {t('about.education')}
                </h3>

                <div className="space-y-4">
                  {developerData.education.map((edu, index) => (
                    <div
                      key={index}
                      className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5 hover:border-emerald-500/30 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                        <h4 className="font-semibold text-white text-base">
                          {edu.degree}
                        </h4>
                        <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full w-fit">
                          {edu.period}
                        </span>
                      </div>
                      <p className="text-sm text-gray-300 font-medium">
                        {edu.school}
                      </p>
                    </div>
                  ))}
                </div>
              </SpotlightCard>

            </div>

          </div>

        </RevealOnScroll>
      </div>
    </section>
  );
};

export default About;