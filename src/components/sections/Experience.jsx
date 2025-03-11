import React from 'react';
import { Briefcase } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext';
import developerData from '../../data/developerData';

const Experience = () => {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();

  return (
      <section id="experience" className="py-20 bg-gray-800 p-4 relative">
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-600 rounded-full opacity-10 blur-3xl"></div>

        <div className="container mx-auto relative z-10">
          <div className="text-center mb-12">
            <span className="inline-block bg-green-500 bg-opacity-30 text-green-300 px-4 py-1 rounded-full text-sm font-medium mb-4">{t('experience.title')}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">{t('experience.subtitle')}</h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-8 relative before:absolute before:left-5 before:top-0 before:h-full before:w-0.5 md:before:left-1/2 md:before:-translate-x-1/2 before:bg-gradient-to-b before:from-green-500 before:via-green-400 before:to-green-300 before:opacity-50">
              {developerData.experience.map((exp, index) => (
                  <div key={`${index}-${currentLanguage}`} className="relative flex items-start group md:flex-col md:items-center">
                    <div className="absolute left-0 top-0 md:left-1/2 md:-translate-x-1/2 md:relative md:top-auto flex items-center justify-center w-10 h-10 rounded-full border-2 border-green-400 bg-gray-800 text-green-400 shadow-md shadow-green-900">
                      <Briefcase size={18} />
                    </div>
                    <div className="bg-gray-800 bg-opacity-90 backdrop-blur-sm rounded-xl shadow-xl border border-gray-700 p-6 ml-16 md:ml-0 md:w-full md:mt-3 transition-all group-hover:shadow-green-900 group-hover:shadow-lg">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-3">
                        <h3 className="text-xl font-semibold text-white group-hover:text-green-400 transition-colors">{exp.position}</h3>
                        <span className="text-sm text-gray-300 md:ml-auto">{exp.period}</span>
                      </div>
                      <h4 className="font-medium text-green-300 mb-2">{exp.company}</h4>
                      <p className="text-gray-200">{developerData.getExperienceDescription(exp.company)}</p>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </div>
      </section>
  );
};

export default Experience;