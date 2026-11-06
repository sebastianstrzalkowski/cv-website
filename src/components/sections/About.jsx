import React from 'react';
import { Layers, ShieldCheck, Cpu, Cloud, GraduationCap, Award, Mic2, FolderGit2, Briefcase } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import developerData from '../../data/developerData';
import SkillTag from '../ui/SkillTag';
import SpotlightCard from '../ui/SpotlightCard';
import RevealOnScroll from '../ui/RevealOnScroll';
import SectionHeading from '../ui/SectionHeading';

const About = () => {
  const { t } = useTranslation();

  const certificates = developerData.trainings.filter((training) => training.certificate).length;

  const stats = [
    { value: `${developerData.yearsOfExperience}+`, label: t('about.stats.years'), icon: Briefcase },
    { value: developerData.projects.length, label: t('about.stats.projects'), icon: FolderGit2 },
    { value: developerData.conferences.length, label: t('about.stats.talks'), icon: Mic2 },
    { value: certificates, label: t('about.stats.certificates'), icon: Award },
  ];

  const specializations = [
    { icon: Layers, title: t('about.specialization.dlt'), desc: t('about.specialization.dltDesc'), color: 'bg-emerald-500/15 text-emerald-300' },
    { icon: ShieldCheck, title: t('about.specialization.enterprise'), desc: t('about.specialization.enterpriseDesc'), color: 'bg-amber-500/15 text-amber-300' },
    { icon: Cpu, title: t('about.specialization.distributed'), desc: t('about.specialization.distributedDesc'), color: 'bg-teal-500/15 text-teal-300' },
    { icon: Cloud, title: t('about.specialization.cloud'), desc: t('about.specialization.cloudDesc'), color: 'bg-emerald-500/15 text-emerald-300' },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />

      <div className="container mx-auto px-4 relative z-10">
        <RevealOnScroll width="100%">

          <SectionHeading
            title={t('about.subtitle')}
            description={t('developerData.about', { years: developerData.yearsOfExperience })}
          />

          <dl className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <SpotlightCard key={stat.label} className="p-6 text-center" spotlightColor="rgba(16, 185, 129, 0.12)">
                  <div className="mx-auto w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-3">
                    <Icon size={20} aria-hidden="true" />
                  </div>
                  <div className="flex flex-col-reverse">
                    <dt className="text-xs sm:text-sm text-gray-400 font-medium">
                      {stat.label}
                    </dt>
                    <dd className="text-2xl sm:text-3xl font-extrabold text-white tabular-nums mb-1">
                      {stat.value}
                    </dd>
                  </div>
                </SpotlightCard>
              );
            })}
          </dl>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6 space-y-8">
              <SpotlightCard className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white">
                    {t('about.skills')}
                  </h3>
                  <span className="text-xs text-gray-400 tabular-nums">
                    {t('about.coreCompetencies', { count: developerData.skills.length })}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {developerData.skills.map((skill) => (
                    <SkillTag key={skill.name} name={skill.name} />
                  ))}
                </div>

                <h4 className="text-lg font-semibold mb-4 text-emerald-300">
                  {t('about.additionalTech')}
                </h4>
                <ul className="flex flex-wrap gap-2">
                  {developerData.additionalTech.map((tech) => (
                    <li
                      key={tech}
                      className="bg-gray-800/80 hover:bg-emerald-950/40 border border-gray-700/60 hover:border-emerald-500/40 px-3 py-1.5 rounded-lg text-xs font-medium text-emerald-200 transition-colors"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </div>

            <div className="lg:col-span-6 space-y-8">
              <SpotlightCard className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6">
                  {t('about.specializations')}
                </h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  {specializations.map((spec) => {
                    const Icon = spec.icon;
                    return (
                      <div
                        key={spec.title}
                        className="bg-gray-800/60 border border-gray-700/50 hover:border-emerald-500/40 rounded-xl p-5 transition-colors group"
                      >
                        <div className={`w-11 h-11 rounded-lg ${spec.color} flex items-center justify-center mb-3`}>
                          <Icon size={22} aria-hidden="true" />
                        </div>
                        <h4 className="font-semibold text-white group-hover:text-emerald-300 transition-colors mb-1 text-sm sm:text-base">
                          {spec.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                          {spec.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </SpotlightCard>

              <SpotlightCard className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <GraduationCap className="text-emerald-400" size={24} aria-hidden="true" />
                  {t('about.education')}
                </h3>

                <div className="space-y-4">
                  {developerData.education.map((edu) => (
                    <div
                      key={edu.school}
                      className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5 hover:border-emerald-500/30 transition-colors"
                    >
                      <h4 className="font-semibold text-white text-base mb-1">
                        {edu.degree}
                      </h4>
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
