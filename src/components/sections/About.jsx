import React from 'react';
import { Code, Briefcase } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import developerData from '../../data/developerData';
import SkillTag from '../ui/SkillTag';

const About = () => {
  const { t } = useTranslation();

  return (
      <section id="about" className="py-20 bg-gray-900 text-white p-4 relative">
        {/* Background accents */}
        <div className="absolute top-1/3 right-0 w-64 h-64 bg-green-500 rounded-full opacity-5 blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-teal-600 rounded-full opacity-5 blur-3xl"></div>

        <div className="container mx-auto relative z-10">
          <div className="text-center mb-12">
            <span className="inline-block bg-green-500 bg-opacity-20 text-green-400 px-4 py-1 rounded-full text-sm font-medium mb-4">{t('about.title')}</span>
            <h2 className="text-3xl md:text-4xl font-bold">{t('about.subtitle')}</h2>
          </div>

          <div className="mb-16">
            <p className="text-lg text-gray-300 max-w-3xl mx-auto text-center">{t('developerData.about')}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-gray-800 bg-opacity-70 backdrop-blur-sm rounded-xl p-8 shadow-xl border border-gray-700">
              <h3 className="text-2xl font-semibold mb-6 text-green-400">{t('about.skills')}</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {developerData.skills.map((skill, index) => (
                    <SkillTag key={index} name={skill.name} />
                ))}
              </div>

              <h3 className="text-2xl font-semibold mb-4 mt-10 text-green-400">{t('about.additionalTech')}</h3>
              <div className="flex flex-wrap gap-2">
                {developerData.additionalTech.map((tech, index) => (
                    <span key={index} className="bg-gray-700 px-3 py-1 rounded-full text-sm text-green-300">
                  {tech}
                </span>
                ))}
              </div>
            </div>

            <div>
              <div className="bg-gray-800 bg-opacity-70 backdrop-blur-sm rounded-xl p-8 shadow-xl border border-gray-700 mb-8">
                <h3 className="text-2xl font-semibold mb-6 text-green-400">{t('about.specializations')}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-700 p-4 rounded-lg text-center">
                    <div className="bg-green-900 bg-opacity-30 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Code size={24} className="text-green-400" />
                    </div>
                    <h4 className="font-semibold mb-1">{t('about.specialization.java')}</h4>
                    <p className="text-sm text-gray-300">{t('about.specialization.javaDesc')}</p>
                  </div>
                  <div className="bg-gray-700 p-4 rounded-lg text-center">
                    <div className="bg-green-900 bg-opacity-30 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Code size={24} className="text-green-400" />
                    </div>
                    <h4 className="font-semibold mb-1">{t('about.specialization.blockchain')}</h4>
                    <p className="text-sm text-gray-300">{t('about.specialization.blockchainDesc')}</p>
                  </div>
                  <div className="bg-gray-700 p-4 rounded-lg text-center">
                    <div className="bg-green-900 bg-opacity-30 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Briefcase size={24} className="text-green-400" />
                    </div>
                    <h4 className="font-semibold mb-1">{t('about.specialization.cloud')}</h4>
                    <p className="text-sm text-gray-300">{t('about.specialization.cloudDesc')}</p>
                  </div>
                  <div className="bg-gray-700 p-4 rounded-lg text-center">
                    <div className="bg-green-900 bg-opacity-30 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Code size={24} className="text-green-400" />
                    </div>
                    <h4 className="font-semibold mb-1">{t('about.specialization.databases')}</h4>
                    <p className="text-sm text-gray-300">{t('about.specialization.databasesDesc')}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 bg-opacity-70 backdrop-blur-sm rounded-xl p-8 shadow-xl border border-gray-700">
                <h3 className="text-2xl font-semibold mb-6 text-green-400">{t('about.education')}</h3>
                {developerData.education.map((edu, index) => (
                    <div key={index} className="bg-gray-700 p-4 rounded-lg">
                      <h4 className="font-semibold">{edu.degree}</h4>
                      <p className="text-gray-300">{edu.school}</p>
                      <p className="text-gray-400 text-sm">{edu.period}</p>
                    </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
  );
};

export default About;