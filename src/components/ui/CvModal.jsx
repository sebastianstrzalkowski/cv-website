import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, Printer, ExternalLink, FileText } from 'lucide-react';
import { m, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import cvHtml from '../../data/cvHtml';
import useFocusTrap from '../../hooks/useFocusTrap';

const CvModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const iframeRef = useRef(null);
  const dialogRef = useRef(null);

  useFocusTrap(dialogRef, isOpen, onClose);

  useEffect(() => {
    if (!isOpen) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  const handlePrint = () => {
    const frame = iframeRef.current?.contentWindow;
    if (!frame) return;
    frame.focus();
    frame.print();
  };

  const handleOpenInNewTab = () => {
    const blob = new Blob([cvHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-gray-950/85 backdrop-blur-md"
          onClick={onClose}
        >
          <m.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cv-modal-title"
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-5xl h-[92vh] [@supports(height:1dvh)]:h-[92dvh] flex flex-col rounded-2xl bg-gray-900 border border-emerald-500/30 shadow-card overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3.5 bg-gray-950/90 border-b border-gray-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <FileText size={18} aria-hidden="true" />
                </div>
                <div>
                  <h2 id="cv-modal-title" className="text-sm sm:text-base font-bold text-white leading-tight">
                    Sebastian Strzałkowski — CV
                  </h2>
                  <p className="text-xs text-gray-400 hidden sm:block">
                    {t('hero.cvModalSubtitle')}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex items-center gap-2 min-h-10 px-4 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-gray-950 font-semibold text-xs sm:text-sm shadow-cta transition-colors"
                >
                  <Printer size={16} aria-hidden="true" />
                  <span>{t('hero.printCvButton')}</span>
                </button>

                <button
                  type="button"
                  onClick={handleOpenInNewTab}
                  className="hidden sm:inline-flex items-center gap-1.5 min-h-10 px-3.5 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 font-medium text-xs sm:text-sm border border-gray-700 transition-colors"
                >
                  <ExternalLink size={15} aria-hidden="true" />
                  <span>{t('hero.openNewTabButton')}</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label={t('hero.cvModalClose')}
                  className="w-10 h-10 inline-flex items-center justify-center rounded-xl bg-gray-800/80 hover:bg-gray-700 text-gray-400 hover:text-white border border-gray-700/60 transition-colors"
                >
                  <X size={18} aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="flex-grow w-full bg-gray-950 overflow-hidden">
              <iframe
                ref={iframeRef}
                srcDoc={cvHtml}
                title="Sebastian Strzałkowski - CV Preview"
                className="w-full h-full border-0"
              />
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default CvModal;
