import React, { useState } from 'react';
import { BookOpen, Calendar, Award, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import developerData from '../../data/developerData';
import RevealOnScroll from '../ui/RevealOnScroll';

const Trainings = () => {
  const { t } = useTranslation();
  const [expandedItems, setExpandedItems] = useState({});

  const toggleExpanded = (index) => {
    setExpandedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const isLongDescription = (description) => {
    return description.length > 150;
  };

  const trainings = developerData.trainings || [];

  return (
    <section id="trainings" className="py-20 bg-gray-900 text-white p-4 relative">
      {/* Background accents */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-green-500 rounded-full opacity-10 blur-3xl"></div>

      <div className="container mx-auto relative z-10">
        <RevealOnScroll width="100%">
          <div className="text-center mb-12">
            <span className="inline-block bg-green-400 bg-opacity-30 text-green-300 px-4 py-1 rounded-full text-sm font-medium mb-4">{t('trainings.title')}</span>
            <h2 className="text-3xl md:text-4xl font-bold">{t('trainings.subtitle')}</h2>
            <p className="text-gray-300 mt-4 max-w-xl mx-auto">{t('trainings.description')}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trainings.map((training, index) => (
              <div
                key={index}
                className="bg-gray-800 bg-opacity-90 rounded-xl overflow-hidden shadow-xl border border-gray-700 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-green-900 hover:shadow-lg group"
              >
                <div className="bg-gradient-to-r from-green-400 to-teal-400 h-2"></div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-green-500 bg-opacity-20 p-3 rounded-lg">
                      <BookOpen size={24} className="text-green-400" />
                    </div>
                    {training.certificate && (
                      <Award size={20} className="text-yellow-500" />
                    )}
                  </div>

                  <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-green-400 transition-colors">
                    {training.name}
                  </h3>

                  <div className="mb-4">
                    <p className={`text-gray-400 text-sm ${!expandedItems[index] && isLongDescription(training.description) ? 'line-clamp-3' : ''}`}>
                      {training.description}
                    </p>
                    {isLongDescription(training.description) && (
                      <button
                        onClick={() => toggleExpanded(index)}
                        className="text-green-400 hover:text-green-300 text-sm mt-2 flex items-center gap-1 transition-colors"
                      >
                        {expandedItems[index] ? (
                          <>
                            {t('trainings.showLess') || 'Zwiń'}
                            <ChevronUp size={16} />
                          </>
                        ) : (
                          <>
                            {t('trainings.showMore') || 'Rozwiń'}
                            <ChevronDown size={16} />
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-400">
                      <Calendar size={14} className="mr-2 text-green-400" />
                      <span>{training.date}</span>
                    </div>

                    {training.duration && (
                      <div className="flex items-center text-sm text-gray-400">
                        <Clock size={14} className="mr-2 text-green-400" />
                        <span>{training.duration}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {training.skills && training.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="bg-gray-700 px-2 py-1 rounded text-xs text-green-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {training.provider && (
                    <div className="mt-4 pt-4 border-t border-gray-700">
                      <p className="text-xs text-gray-500">
                        {t('trainings.provider')}: <span className="text-gray-400">{training.provider}</span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default Trainings;