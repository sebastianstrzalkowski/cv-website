import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Calendar, 
  Award, 
  Clock, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink, 
  FileText, 
  Download, 
  X, 
  CheckCircle2 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import developerData from '../../data/developerData';
import SpotlightCard from '../ui/SpotlightCard';
import RevealOnScroll from '../ui/RevealOnScroll';

const Trainings = () => {
  const { t } = useTranslation();
  const [expandedItems, setExpandedItems] = useState({});
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedCertificate(null);
      }
    };
    if (selectedCertificate) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedCertificate]);

  const toggleExpanded = (index) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const isLongDescription = (description) => {
    return description && description.length > 140;
  };

  const trainings = developerData.trainings || [];

  return (
    <section id="trainings" className="py-24 relative overflow-hidden bg-gray-950/40">
      {/* Background accents */}
      <div className="absolute top-10 left-1/3 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

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
              const hasCertificateFile = !!training.certificateUrl;

              return (
                <SpotlightCard
                  key={index}
                  className="flex flex-col justify-between border-gray-800/80 bg-gray-900/60 group h-full"
                  spotlightColor={hasCertificateFile ? "rgba(245, 158, 11, 0.16)" : "rgba(16, 185, 129, 0.18)"}
                >
                  <div 
                    className={`h-1 bg-gradient-to-r ${
                      hasCertificateFile 
                        ? 'from-amber-400 via-emerald-400 to-teal-400' 
                        : 'from-emerald-400 to-teal-400'
                    } opacity-70 group-hover:opacity-100 transition-opacity`} 
                  />

                  <div className="p-7 flex flex-col flex-grow justify-between">
                    <div>
                      {/* Top icon and certificate badge */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors">
                          <BookOpen size={22} />
                        </div>
                        {training.certificate && (
                          hasCertificateFile ? (
                            <button
                              type="button"
                              onClick={() => setSelectedCertificate(training)}
                              className="flex items-center gap-1.5 text-xs font-semibold text-amber-300 bg-amber-500/15 hover:bg-amber-500/25 px-2.5 py-1 rounded-full border border-amber-500/40 hover:border-amber-400/70 transition-all cursor-pointer shadow-[0_0_12px_rgba(245,158,11,0.15)] group/cert"
                              title={t('trainings.certificatePreview')}
                            >
                              <Award size={15} className="text-amber-400 animate-pulse" />
                              <span>{t('trainings.certificateBadge')}</span>
                              <ExternalLink size={12} className="text-amber-400/80 group-hover/cert:text-amber-200 transition-colors" />
                            </button>
                          ) : (
                            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/30">
                              <Award size={15} className="text-amber-400" />
                              <span>{t('trainings.certificateBadge')}</span>
                            </div>
                          )
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
                            type="button"
                            onClick={() => toggleExpanded(index)}
                            className="text-emerald-400 hover:text-emerald-300 text-xs font-semibold mt-2.5 flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            <span>{isExpanded ? t('trainings.showLess') : t('trainings.showMore')}</span>
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

                      {/* Provider & Instructors */}
                      <div className="space-y-1 text-xs text-gray-400 pt-2 border-t border-gray-800/60">
                        {training.provider && (
                          <div>
                            <span className="text-gray-400">{t('trainings.provider')}: </span>
                            <span className="font-semibold text-gray-300">{training.provider}</span>
                          </div>
                        )}
                        {training.instructors && (
                          <div>
                            <span className="text-gray-400">{t('trainings.instructors')}: </span>
                            <span className="text-gray-300">{training.instructors}</span>
                          </div>
                        )}
                      </div>

                      {/* Action Links (Certificate PDF / Course Agenda) */}
                      {(training.certificateUrl || training.url) && (
                        <div className="flex flex-wrap items-center gap-2 pt-3 mt-3 border-t border-gray-800/80">
                          {training.certificateUrl && (
                            <button
                              type="button"
                              onClick={() => setSelectedCertificate(training)}
                              className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-300 hover:text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 px-3 py-1.5 rounded-lg border border-amber-500/30 hover:border-amber-400/60 transition-all cursor-pointer group/btn"
                            >
                              <FileText size={14} className="text-amber-400" />
                              <span>{t('trainings.viewCertificate')}</span>
                              <ExternalLink size={12} className="opacity-70 group-hover/btn:opacity-100 transition-opacity" />
                            </button>
                          )}
                          {training.url && (
                            <a
                              href={training.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 px-3 py-1.5 rounded-lg border border-emerald-500/30 hover:border-emerald-400/60 transition-all cursor-pointer"
                            >
                              <ExternalLink size={13} />
                              <span>{t('trainings.courseAgenda')}</span>
                            </a>
                          )}
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

      {/* Certificate Modal / Lightbox */}
      <AnimatePresence>
        {selectedCertificate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCertificate(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="relative z-10 w-full max-w-4xl bg-gray-900 border border-gray-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col my-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-gray-950/60">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30">
                    <Award size={18} />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white">
                      {t('trainings.certificatePreview')}: {selectedCertificate.name}
                    </h3>
                    <p className="text-xs text-gray-400">
                      {selectedCertificate.provider} • {selectedCertificate.date}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedCertificate(null)}
                  className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors cursor-pointer"
                  aria-label={t('trainings.closeModal')}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6 max-h-[calc(85vh-130px)] overflow-y-auto">
                {/* Certificate Preview Image */}
                {selectedCertificate.certificateImage && (
                  <div className="relative rounded-xl overflow-hidden border border-gray-800 bg-gray-950 shadow-inner group">
                    <img
                      src={selectedCertificate.certificateImage}
                      alt={`${selectedCertificate.name} Certificate`}
                      className="w-full h-auto object-contain mx-auto max-h-[480px]"
                    />
                  </div>
                )}

                {/* Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-xl bg-gray-950/60 border border-gray-800/80 text-xs">
                  <div>
                    <span className="text-gray-500 block mb-1">{t('trainings.provider')}</span>
                    <span className="font-semibold text-gray-200">{selectedCertificate.provider}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block mb-1">Data wydania</span>
                    <span className="font-semibold font-mono text-gray-200">{selectedCertificate.date}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block mb-1">Wymiar kursu</span>
                    <span className="font-semibold text-gray-200">{selectedCertificate.duration}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block mb-1">{t('trainings.instructors')}</span>
                    <span className="font-semibold text-gray-200">{selectedCertificate.instructors}</span>
                  </div>
                </div>

                {/* Covered Skills */}
                {selectedCertificate.skills && (
                  <div>
                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2.5">
                      Zweryfikowane kompetencje
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedCertificate.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 px-2.5 py-1 rounded-lg text-xs"
                        >
                          <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                          <span>{skill}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-t border-gray-800 bg-gray-950/80">
                <div className="flex flex-wrap items-center gap-3">
                  {selectedCertificate.certificateUrl && (
                    <a
                      href={selectedCertificate.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-gray-950 font-bold text-xs shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all cursor-pointer"
                    >
                      <Download size={15} />
                      <span>{t('trainings.downloadPdf')}</span>
                    </a>
                  )}
                  {selectedCertificate.url && (
                    <a
                      href={selectedCertificate.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 font-medium text-xs border border-gray-700 transition-all cursor-pointer"
                    >
                      <ExternalLink size={14} />
                      <span>{t('trainings.courseAgenda')}</span>
                    </a>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedCertificate(null)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-gray-400 hover:text-white hover:bg-gray-800/80 transition-colors cursor-pointer"
                >
                  {t('trainings.closeModal')}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Trainings;