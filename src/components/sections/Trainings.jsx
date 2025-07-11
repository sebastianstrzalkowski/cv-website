import React, { useState } from 'react';
import { BookOpen, Calendar, Award, Clock, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import developerData from '../../data/developerData';

const Trainings = () => {
  const { t } = useTranslation();
  const [expandedItems, setExpandedItems] = useState({});
  const [currentSlide, setCurrentSlide] = useState(0);

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
  
  // Responsive slides per view
  const getSlidesPerView = () => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth < 768) return 1; // mobile
    if (window.innerWidth < 1024) return 2; // tablet
    return 3; // desktop
  };

  const [slidesPerView, setSlidesPerView] = useState(getSlidesPerView);
  const maxSlide = Math.max(0, trainings.length - slidesPerView);

  const nextSlide = () => {
    setCurrentSlide(prev => Math.min(prev + 1, maxSlide));
  };

  const prevSlide = () => {
    setCurrentSlide(prev => Math.max(prev - 1, 0));
  };

  // Handle window resize
  React.useEffect(() => {
    const handleResize = () => {
      const newSlidesPerView = getSlidesPerView();
      setSlidesPerView(newSlidesPerView);
      setCurrentSlide(prev => Math.min(prev, Math.max(0, trainings.length - newSlidesPerView)));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [trainings.length]);

  return (
    <section id="trainings" className="py-20 bg-gray-800 text-white p-4 relative">
      {/* Background accents */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-green-500 rounded-full opacity-5 blur-3xl"></div>
      
      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="text-center mb-12">
          <span className="inline-block bg-green-500 bg-opacity-20 text-green-400 px-4 py-1 rounded-full text-sm font-medium mb-4">{t('trainings.title')}</span>
          <h2 className="text-3xl md:text-4xl font-bold">{t('trainings.subtitle')}</h2>
          <p className="text-gray-300 mt-4 max-w-xl mx-auto">{t('trainings.description')}</p>
        </div>
        
        <div className="relative">
          {/* Navigation buttons */}
          {trainings.length > slidesPerView && (
            <>
              <button
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-green-500 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white p-2 rounded-full transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextSlide}
                disabled={currentSlide >= maxSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-green-500 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white p-2 rounded-full transition-colors"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {/* Slider container */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-300 ease-in-out"
              style={{ 
                transform: `translateX(-${currentSlide * 100}%)`,
                width: `${Math.ceil(trainings.length / slidesPerView) * 100}%`
              }}
            >
              {Array.from({ length: Math.ceil(trainings.length / slidesPerView) }).map((_, slideIndex) => (
                <div key={slideIndex} className="flex gap-6 w-full flex-shrink-0">
                  {trainings.slice(slideIndex * slidesPerView, (slideIndex + 1) * slidesPerView).map((training, cardIndex) => {
                    const actualIndex = slideIndex * slidesPerView + cardIndex;
                    return (
                      <div 
                        key={actualIndex} 
                        className={`bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:border-green-500 transition-all duration-300 group ${
                          slidesPerView === 1 ? 'w-full' : 
                          slidesPerView === 2 ? 'w-1/2' : 'w-1/3'
                        }`}
                      >
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
                  <p className={`text-gray-400 text-sm ${!expandedItems[actualIndex] && isLongDescription(training.description) ? 'line-clamp-3' : ''}`}>
                    {training.description}
                  </p>
                  {isLongDescription(training.description) && (
                    <button
                      onClick={() => toggleExpanded(actualIndex)}
                      className="text-green-400 hover:text-green-300 text-sm mt-2 flex items-center gap-1 transition-colors"
                    >
                      {expandedItems[actualIndex] ? (
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
                      className="bg-gray-800 text-green-400 px-2 py-1 rounded text-xs font-medium"
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
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Slide indicators */}
          {trainings.length > slidesPerView && (
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: maxSlide + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentSlide === index ? 'bg-green-500' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Trainings;