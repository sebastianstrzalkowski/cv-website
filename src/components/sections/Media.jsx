import React from 'react';
import { Video, Youtube, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import developerData from '../../data/developerData';
import RevealOnScroll from '../ui/RevealOnScroll';

const Media = () => {
  const { t } = useTranslation();

  return (
    <section id="media" className="py-20 bg-gray-900 text-white p-4 relative">
      {/* Background accents */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-green-500 rounded-full opacity-5 blur-3xl"></div>

      <div className="container mx-auto max-w-5xl relative z-10">
        <RevealOnScroll width="100%">
          <div className="text-center mb-12">
            <span className="inline-block bg-green-500 bg-opacity-20 text-green-400 px-4 py-1 rounded-full text-sm font-medium mb-4">{t('media.title')}</span>
            <h2 className="text-3xl md:text-4xl font-bold">{t('media.subtitle')}</h2>
            <p className="text-gray-300 mt-4 max-w-xl mx-auto">{t('media.description')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {developerData.media && developerData.media.map((item, index) => (
              <div key={index} className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:border-green-500 transition-all duration-300 group">
                <div className="relative">
                  <div className="aspect-video bg-gray-700 flex items-center justify-center">
                    {item.thumbnail ? (
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <Youtube size={48} className="text-gray-500" />
                    )}
                  </div>
                  <div className="absolute inset-0 bg-green-500 bg-opacity-0 group-hover:bg-opacity-20 flex items-center justify-center transition-all duration-300">
                    <div className="w-16 h-16 rounded-full bg-green-500 bg-opacity-0 group-hover:bg-opacity-90 flex items-center justify-center transform scale-0 group-hover:scale-100 transition-all duration-300">
                      <Video size={24} className="text-white" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-green-400 transition-colors">{item.title}</h3>
                  <p className="text-gray-400 mb-4 line-clamp-2">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{item.date}</span>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-green-400 hover:text-green-300 transition-colors"
                    >
                      {t('media.watchVideo')}
                      <ExternalLink size={16} className="ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default Media;