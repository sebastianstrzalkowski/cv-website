import React from 'react';
import { Play, Youtube, ExternalLink, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import developerData from '../../data/developerData';
import SpotlightCard from '../ui/SpotlightCard';
import RevealOnScroll from '../ui/RevealOnScroll';
import { motion } from 'framer-motion';

const Media = () => {
  const { t } = useTranslation();

  return (
    <section id="media" className="py-24 relative overflow-hidden bg-gray-950/40">
      {/* Background accents */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-6xl px-4 relative z-10">
        <RevealOnScroll width="100%">
          
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-sm font-medium mb-4 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
              {t('media.title')}
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              {t('media.subtitle')}
            </h2>
            <p className="text-base text-gray-300 mt-4 max-w-xl mx-auto leading-relaxed">
              {t('media.description')}
            </p>
          </div>

          {/* Media Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {developerData.media && developerData.media.map((item, index) => (
              <SpotlightCard
                key={index}
                className="group flex flex-col justify-between overflow-hidden border-gray-800/80 bg-gray-900/60"
                spotlightColor="rgba(16, 185, 129, 0.2)"
              >
                {/* Thumbnail / Video Preview */}
                <div className="relative aspect-video overflow-hidden bg-gray-900">
                  {item.thumbnail ? (
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="object-cover w-full h-full transform group-hover:scale-108 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-800/60 text-gray-600">
                      <Youtube size={48} />
                    </div>
                  )}

                  {/* Shading overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-80" />

                  {/* Play Button Trigger */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      className="w-14 h-14 rounded-full bg-emerald-500/90 text-white flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.6)] backdrop-blur-sm group-hover:bg-emerald-400 transition-colors"
                    >
                      <Play size={22} className="ml-1 fill-white" />
                    </motion.div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-white group-hover:text-emerald-300 transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-300 mb-4 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-800/80">
                    <div className="flex items-center text-xs font-mono text-gray-400">
                      <Calendar size={13} className="mr-1.5 text-emerald-400" />
                      <span>{item.date}</span>
                    </div>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors group/link"
                    >
                      <span>{t('media.watchVideo')}</span>
                      <ExternalLink size={15} className="ml-1 group-hover/link:translate-x-0.5 transition-transform" />
                    </a>
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

export default Media;