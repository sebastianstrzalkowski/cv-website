import React from 'react';
import { Play, Youtube, ExternalLink, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import developerData from '../../data/developerData';
import SpotlightCard from '../ui/SpotlightCard';
import RevealOnScroll from '../ui/RevealOnScroll';
import SectionHeading from '../ui/SectionHeading';

const Media = () => {
  const { t } = useTranslation();

  return (
    <section id="media" className="py-24 relative overflow-hidden bg-gray-950/40">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />

      <div className="container mx-auto max-w-6xl px-4 relative z-10">
        <RevealOnScroll width="100%">

          <SectionHeading title={t('media.subtitle')} description={t('media.description')} />

          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 list-none">
            {developerData.media.map((item) => (
              <li key={item.url} className="h-full">
                <SpotlightCard className="group flex flex-col justify-between h-full" spotlightColor="rgba(16, 185, 129, 0.2)">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={-1}
                    aria-hidden="true"
                    className="relative block aspect-video overflow-hidden bg-gray-900"
                  >
                    {item.thumbnail ? (
                      <img
                        src={item.thumbnail}
                        alt=""
                        width={1280}
                        height={720}
                        loading="lazy"
                        decoding="async"
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-800/60 text-gray-500">
                        <Youtube size={48} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-80" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-emerald-400 text-gray-950 flex items-center justify-center shadow-cta group-hover:scale-110 transition-transform duration-200">
                        <Play size={22} className="ml-1 fill-current" />
                      </div>
                    </div>
                  </a>

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
                      <div className="flex items-center text-xs text-gray-400 tabular-nums">
                        <Calendar size={13} className="mr-1.5 text-emerald-400" aria-hidden="true" />
                        <time dateTime={item.date}>{item.date}</time>
                      </div>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center min-h-9 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors group/link"
                      >
                        <span>{t('media.watchVideo')}</span>
                        <ExternalLink size={15} className="ml-1 group-hover/link:translate-x-0.5 transition-transform" aria-hidden="true" />
                      </a>
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

export default Media;
