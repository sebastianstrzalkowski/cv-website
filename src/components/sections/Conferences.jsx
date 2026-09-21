import React from 'react';
import { Calendar, MapPin, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import developerData from '../../data/developerData';
import SpotlightCard from '../ui/SpotlightCard';
import RevealOnScroll from '../ui/RevealOnScroll';

const Conferences = () => {
  const { t } = useTranslation();

  return (
    <section id="conferences" className="py-24 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto max-w-5xl px-4 relative z-10">
        <RevealOnScroll width="100%">
          
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-sm font-medium mb-4 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
              {t('conferences.title')}
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              {t('conferences.subtitle')}
            </h2>
            <p className="text-base text-gray-300 mt-4 max-w-xl mx-auto leading-relaxed">
              {t('conferences.description')}
            </p>
          </div>

          <div className="space-y-6">
            {developerData.conferences && developerData.conferences.map((conference, index) => (
              <SpotlightCard
                key={index}
                className="overflow-hidden border-gray-800/80 bg-gray-900/60 group"
                spotlightColor="rgba(16, 185, 129, 0.15)"
              >
                <div className="grid md:grid-cols-12 gap-6 p-7 items-center">
                  
                  {/* Conference Image / Icon */}
                  <div className="md:col-span-3">
                    <div className="rounded-xl overflow-hidden h-32 md:h-36 bg-gray-950/80 border border-gray-800 flex items-center justify-center p-3 group-hover:border-emerald-500/40 transition-colors">
                      {conference.image ? (
                        <img
                          src={conference.image}
                          alt={conference.name}
                          className="object-contain w-auto max-h-full transform group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <Users size={40} className="text-gray-600 group-hover:text-emerald-400 transition-colors" />
                      )}
                    </div>
                  </div>

                  {/* Conference Details */}
                  <div className="md:col-span-9 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold mb-2 text-white group-hover:text-emerald-300 transition-colors">
                        {conference.name}
                      </h3>

                      <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                        {conference.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {conference.tags && conference.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="bg-gray-800/90 text-emerald-300 border border-gray-700/60 px-2.5 py-1 rounded-full text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-gray-400 pt-3 border-t border-gray-800/80">
                      <div className="flex items-center">
                        <Calendar size={15} className="mr-2 text-emerald-400" />
                        <span className="font-mono">{conference.date}</span>
                      </div>

                      <div className="flex items-center">
                        <MapPin size={15} className="mr-2 text-emerald-400" />
                        <span>{conference.location}</span>
                      </div>
                    </div>
                  </div>

                </div>
              </SpotlightCard>
            ))}
          </div>

        </RevealOnScroll>
      </div>
    </section>
  );
};

export default Conferences;