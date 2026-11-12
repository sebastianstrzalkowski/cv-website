import React from 'react';
import { Calendar, MapPin, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import developerData from '../../data/developerData';
import SpotlightCard from '../ui/SpotlightCard';
import RevealOnScroll from '../ui/RevealOnScroll';
import { toIsoDate } from '../../data/developerData';
import SectionHeading from '../ui/SectionHeading';

const Conferences = () => {
  const { t } = useTranslation();

  return (
    <section id="conferences" className="py-24 relative overflow-hidden">
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" aria-hidden="true" />

      <div className="container mx-auto max-w-5xl px-4 relative z-10">
        <RevealOnScroll width="100%">

          <SectionHeading title={t('conferences.subtitle')} description={t('conferences.description')} />

          <ul className="space-y-6 list-none">
            {developerData.conferences.map((conference) => (
              <li key={conference.name}>
                <SpotlightCard className="group" spotlightColor="rgba(16, 185, 129, 0.15)">
                  <div className="grid md:grid-cols-12 gap-6 p-7 items-center">
                    <div className="md:col-span-3">
                      <div className="rounded-xl overflow-hidden h-32 md:h-36 bg-gray-950/80 border border-gray-800 flex items-center justify-center p-3 group-hover:border-emerald-500/40 transition-colors">
                        {conference.image ? (
                          <img
                            src={conference.image}
                            alt={conference.name}
                            width={conference.imageSize?.[0]}
                            height={conference.imageSize?.[1]}
                            loading="lazy"
                            decoding="async"
                            className="object-contain w-auto max-h-full"
                          />
                        ) : (
                          <Users size={40} className="text-gray-500 group-hover:text-emerald-400 transition-colors" aria-hidden="true" />
                        )}
                      </div>
                    </div>

                    <div className="md:col-span-9 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold mb-2 text-white group-hover:text-emerald-300 transition-colors">
                          {conference.name}
                        </h3>

                        <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                          {conference.description}
                        </p>

                        {conference.tags && (
                          <ul className="flex flex-wrap gap-2 mb-4 list-none">
                            {conference.tags.map((tag) => (
                              <li
                                key={tag}
                                className="bg-gray-800/90 text-emerald-200 border border-gray-700/60 px-2.5 py-1 rounded-full text-xs font-medium"
                              >
                                {tag}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-gray-400 pt-3 border-t border-gray-800/80">
                        <div className="flex items-center">
                          <Calendar size={15} className="mr-2 text-emerald-400" aria-hidden="true" />
                          <time className="tabular-nums" dateTime={toIsoDate(conference.date)}>{conference.date}</time>
                        </div>
                        <div className="flex items-center">
                          <MapPin size={15} className="mr-2 text-emerald-400" aria-hidden="true" />
                          <span>{conference.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              </li>
            ))}
          </ul>

        </RevealOnScroll>
      </div>
    </section>
  );
};

export default Conferences;
