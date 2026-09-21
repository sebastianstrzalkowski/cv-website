import React, { useState } from 'react';
import { BookOpen, Calendar, Award, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import developerData from '../../data/developerData';
import SpotlightCard from '../ui/SpotlightCard';
import RevealOnScroll from '../ui/RevealOnScroll';

const Trainings = () => {
  const { t } = useTranslation();
  const [expandedItems, setExpandedItems] = useState({});

  const toggleExpanded = (index) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const isLongDescription = (description) => {
    return description.length > 140;
  };

  const trainings = developerData.trainings || [];

  return (
    <section id="trainings" className="py-24 relative overflow-hidden bg-gray-950/40">
      {/* Background accents */}
      <div className="absolute top-10 left-1/3 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <RevealOnScroll width="100%">
          
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-sm font-medium mb-4 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
              {t('trainings.title')}
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              {t('trainings.subtitle')}
            </h2>
            <p className="text-base text-gray-300 mt-4 max-w-xl mx-auto leading-relaxed">
              {t('trainings.description')}
            </p>
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {trainings.map((training, index) => {
              const isExpanded = !!expandedItems[index];

              return (
                <SpotlightCard
                  key={index}
                  className="flex flex-col justify-between border-gray-800/80 bg-gray-900/60 group h-full"
                  spotlightColor="rgba(16, 185, 129, 0.18)"
                >
                  <div className="h-1 bg-gradient-to-r from-emerald-400 to-teal-400 opacity-60 group-hover:opacity-100 transition-opacity" />

                  <div className="p-7 flex flex-col flex-grow justify-between">
                    <div>
                      {/* Top icon and certificate badge */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors">
                          <BookOpen size={22} />
                        </div>
                        {training.certificate && (
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/30">
                            <Award size={15} className="text-amber-400" />
                            <span>Certificate</span>
                          </div>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-emerald-300 transition-colors">
                        {training.name}
                      </h3>

                      {/* Description with smooth AnimatePresence */}
                      <div className="mb-4">
                        <p className={`text-gray-300 text-sm leading-relaxed ${!isExpanded && isLongDescription(training.description) ? 'line-clamp-3' : ''}`}>
                          {training.description}
                        </p>
                        {isLongDescription(training.description) && (
                          <button
                            onClick={() => toggleExpanded(index)}
                            className="text-emerald-400 hover:text-emerald-300 text-xs font-semibold mt-2.5 flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            <span>{isExpanded ? (t('trainings.showLess') || 'Zwiń') : (t('trainings.showMore') || 'Rozwiń')}</span>
                            {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                          </button>
                        )}
                      </div>
                    </div>

                    <div>
                      {/* Date and duration */}
                      <div className="space-y-1.5 mb-4 pt-3 border-t border-gray-800/80">
                        <div className="flex items-center text-xs font-mono text-gray-400">
                          <Calendar size={13} className="mr-2 text-emerald-400" />
                          <span>{training.date}</span>
                        </div>
                        {training.duration && (
                          <div className="flex items-center text-xs text-gray-400">
                            <Clock size={13} className="mr-2 text-emerald-400" />
                            <span>{training.duration}</span>
                          </div>
                        )}
                      </div>

                      {/* Skills learned */}
                      {training.skills && (
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {training.skills.map((skill, skillIndex) => (
                            <span
                              key={skillIndex}
                              className="bg-gray-800/90 text-emerald-300 border border-gray-700/60 px-2 py-0.5 rounded text-xs"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Provider */}
                      {training.provider && (
                        <div className="text-xs text-gray-400 pt-2 border-t border-gray-800/60">
                          <span className="text-gray-400">{t('trainings.provider')}: </span>
                          <span className="font-semibold text-gray-300">{training.provider}</span>
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

export default Trainings;