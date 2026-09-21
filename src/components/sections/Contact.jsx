import React from 'react';
import { Linkedin, ArrowRight, MessageCircle, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import developerData from '../../data/developerData';
import SpotlightCard from '../ui/SpotlightCard';
import RevealOnScroll from '../ui/RevealOnScroll';
import { motion } from 'framer-motion';

const Contact = () => {
  const { t } = useTranslation();

  const contactOptions = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 240 240" fill="currentColor" className="text-emerald-400 group-hover:text-white transition-colors">
          <path d="M98 175c-3.888 0-3.227-1.468-4.568-5.17L82 132.206 170 80c4.156-2.518-1.574 1.543-1.574 1.543L70 142l-29.288-9.088c-6.398-1.998-6.353-6.276 1.325-9.317L195 56c7.096-3.033 13.91 1.761 11.516 12.35L178 171c-1.84 8.718-9.845 7.632-13.885 5.23l-37.115-28.23-18.062 17.58c-2.062 2.067-3.804 3.82-7.938 3.82z" />
        </svg>
      ),
      title: "Telegram",
      value: developerData.contact.telegram,
      link: `https://t.me/${developerData.contact.telegram.replace('@', '')}`,
      gradient: "from-blue-500/20 to-cyan-500/20",
    },
    {
      icon: <MessageCircle size={36} className="text-emerald-400 group-hover:text-white transition-colors" />,
      title: "Discord",
      value: developerData.contact.discord,
      link: "https://discord.com/users/sebastianstrzalkowski",
      gradient: "from-indigo-500/20 to-purple-500/20",
    },
    {
      icon: <Linkedin size={36} className="text-emerald-400 group-hover:text-white transition-colors" />,
      title: "LinkedIn",
      value: "Sebastian Strzałkowski",
      link: `https://${developerData.contact.linkedin}`,
      gradient: "from-emerald-500/20 to-teal-500/20",
    }
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden flex items-center">
      {/* Background accents */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[450px] h-[450px] bg-teal-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto max-w-5xl px-4 relative z-10">
        <RevealOnScroll width="100%">
          
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-sm font-medium mb-4 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
              {t('contact.title')}
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              {t('contact.subtitle')}
            </h2>
            <p className="text-base text-gray-300 mt-4 max-w-xl mx-auto leading-relaxed">
              {t('contact.description')}
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-4xl mx-auto">
            {contactOptions.map((option, index) => (
              <a
                key={index}
                href={option.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <SpotlightCard
                  className="h-full border-gray-800/80 bg-gray-900/60 p-8 flex flex-col items-center text-center transition-all duration-300"
                  spotlightColor="rgba(16, 185, 129, 0.25)"
                >
                  {/* Glowing icon circle */}
                  <div className="relative mb-6">
                    <div className="absolute -inset-2 bg-emerald-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative w-20 h-20 rounded-2xl bg-gray-950 border border-gray-800 group-hover:border-emerald-500/60 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      {option.icon}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-1 text-white group-hover:text-emerald-300 transition-colors">
                    {option.title}
                  </h3>

                  <p className="text-sm text-gray-400 group-hover:text-gray-200 transition-colors mb-6 font-mono">
                    {option.value}
                  </p>

                  <div className="mt-auto inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-200">
                    <span>{t('contact.form.send')}</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </SpotlightCard>
              </a>
            ))}
          </div>

        </RevealOnScroll>
      </div>
    </section>
  );
};

export default Contact;