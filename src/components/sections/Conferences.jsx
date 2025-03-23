import React from 'react';
import { Calendar, MapPin, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import developerData from '../../data/developerData';

const Conferences = () => {
  const { t } = useTranslation();

  return (
    <section id="conferences" className="py-20 bg-gray-800 text-white p-4 relative">
      {/* Background accents */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-500 rounded-full opacity-5 blur-3xl"></div>
      
      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="text-center mb-12">
          <span className="inline-block bg-green-500 bg-opacity-20 text-green-400 px-4 py-1 rounded-full text-sm font-medium mb-4">{t('conferences.title')}</span>
          <h2 className="text-3xl md:text-4xl font-bold">{t('conferences.subtitle')}</h2>
          <p className="text-gray-300 mt-4 max-w-xl mx-auto">{t('conferences.description')}</p>
        </div>
        
        <div className="space-y-6">
          {developerData.conferences && developerData.conferences.map((conference, index) => (
            <div 
              key={index} 
              className="bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:border-green-500 transition-all duration-300 group"
            >
              <div className="grid md:grid-cols-4 gap-6 p-6">
                <div className="md:col-span-1">
                  {conference.image ? (
                    <div className="rounded-lg overflow-hidden h-full min-h-32 bg-gray-800 flex items-center justify-center">
                      <img 
                        src={conference.image} 
                        alt={conference.name} 
                        className="object-contain w-auto max-h-full p-2"
                      />
                    </div>
                  ) : (
                    <div className="rounded-lg overflow-hidden h-full min-h-32 bg-gray-800 flex items-center justify-center">
                      <Users size={48} className="text-gray-600" />
                    </div>
                  )}
                </div>
                
                <div className="md:col-span-3 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-green-400 transition-colors">
                      {conference.name}
                    </h3>
                    
                    <p className="text-gray-400 mb-4">{conference.description}</p>
                    
                    <div className="flex flex-wrap gap-4 mb-4">
                      {conference.tags && conference.tags.map((tag, tagIndex) => (
                        <span 
                          key={tagIndex} 
                          className="bg-gray-800 text-green-400 px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-400 mt-2">
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-2 text-green-400" />
                      <span>{conference.date}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <MapPin size={16} className="mr-2 text-green-400" />
                      <span>{conference.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Conferences;