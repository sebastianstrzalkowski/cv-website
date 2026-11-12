import React, { useState } from 'react';
import { BookOpen, Calendar, Award, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import developerData from '../../data/developerData';
import SpotlightCard from '../ui/SpotlightCard';
import RevealOnScroll from '../ui/RevealOnScroll';
import { toIsoDate } from '../../data/developerData';
import SectionHeading from '../ui/SectionHeading';

const isLongDescription = (description) => Boolean(description) && description.length > 140;

const Trainings = () => {
  const { t } = useTranslation();
  const [expandedItems, setExpandedItems] = useState({});

  const toggleExpanded = (key) => {
    setExpandedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const trainings = developerData.trainings || [];

  return (
    <section id="trainings" className="py-24 relative overflow-hidden bg-gray-950/40">
      <div className="absolute top-10 left-1/3 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" aria-hidden="true" />

      <div className="container mx-auto px-4 relative z-10">
        <RevealOnScroll width="100%">

          <SectionHeading title={t('trainings.subtitle')} description={t('trainings.description')} />

          <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 list-none">
            {trainings.map((training, index) => {
              const key = `${training.name}-${index}`;
              const isExpanded = Boolean(expandedItems[key]);
              const descriptionId = `training-desc-${index}`;

              return (
                <li key={key} className="h-full">
                  <SpotlightCard className="flex flex-col justify-between group h-full" spotlightColor="rgba(16, 185, 129, 0.18)">
                    <div className="p-7 flex flex-col flex-grow justify-between">
                      <div>
                        <div className="flex items-start justify-between mb-4">
                          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors">
                            <BookOpen size={22} aria-hidden="true" />
                          </div>
                          {training.certificate && (
                            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-200 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/30">
                              <Award size={15} className="text-amber-300" aria-hidden="true" />
                              <span>{t('trainings.certificate')}</span>
                            </div>
                          )}
                        </div>

                        <h3 className="text-xl font-bold mb-3 text-white group-hover:text-emerald-300 transition-colors">
                          {training.name}
                        </h3>

                        <div className="mb-4">
                          <p
                            id={descriptionId}
                            className={`text-gray-300 text-sm leading-relaxed ${!isExpanded && isLongDescription(training.description) ? 'line-clamp-3' : ''}`}
                          >
                            {training.description}
                          </p>
                          {isLongDescription(training.description) && (
                            <button
                              type="button"
                              onClick={() => toggleExpanded(key)}
                              aria-expanded={isExpanded}
                              aria-controls={descriptionId}
                              className="text-emerald-400 hover:text-emerald-300 text-xs font-semibold mt-1.5 -ml-2 px-2 min-h-9 inline-flex items-center gap-1 transition-colors"
                            >
                              <span>{isExpanded ? t('trainings.showLess') : t('trainings.showMore')}</span>
                              {isExpanded ? <ChevronUp size={14} aria-hidden="true" /> : <ChevronDown size={14} aria-hidden="true" />}
                            </button>
                          )}
                        </div>
                      </div>

                      <div>
                        <div className="space-y-1.5 mb-4 pt-3 border-t border-gray-800/80">
                          <div className="flex items-center text-xs text-gray-400 tabular-nums">
                            <Calendar size={13} className="mr-2 text-emerald-400" aria-hidden="true" />
                            <time dateTime={toIsoDate(training.date)}>{training.date}</time>
                          </div>
                          {training.duration && (
                            <div className="flex items-center text-xs text-gray-400">
                              <Clock size={13} className="mr-2 text-emerald-400" aria-hidden="true" />
                              <span>{training.duration}</span>
                            </div>
                          )}
                        </div>

                        {training.skills && (
                          <ul className="flex flex-wrap gap-1.5 mb-3 list-none">
                            {training.skills.map((skill) => (
                              <li
                                key={skill}
                                className="bg-gray-800/90 text-emerald-200 border border-gray-700/60 px-2 py-0.5 rounded text-xs"
                              >
                                {skill}
                              </li>
                            ))}
                          </ul>
                        )}

                        {training.provider && (
                          <div className="text-xs text-gray-400 pt-2 border-t border-gray-800/60">
                            <span>{t('trainings.provider')}: </span>
                            <span className="font-semibold text-gray-300">{training.provider}</span>
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

export default Trainings;
