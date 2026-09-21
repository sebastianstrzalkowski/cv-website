import React from 'react';
import { Linkedin, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import developerData from '../../data/developerData';
import SpotlightCard from '../ui/SpotlightCard';
import RevealOnScroll from '../ui/RevealOnScroll';

const Contact = () => {
  const { t } = useTranslation();

  const contactOptions = [
    {
      icon: (
        <svg
          className="w-9 h-9 text-emerald-400 group-hover:text-white transition-colors -translate-x-0.5"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M20.665 3.717l-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l-.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z" />
        </svg>
      ),
      title: "Telegram",
      value: developerData.contact.telegram,
      link: `https://t.me/${developerData.contact.telegram.replace('@', '')}`,
    },
    {
      icon: (
        <svg
          className="w-9 h-9 text-emerald-400 group-hover:text-white transition-colors"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
        </svg>
      ),
      title: "Discord",
      value: developerData.contact.discord,
      link: "https://discord.com/users/sebastianstrzalkowski",
    },
    {
      icon: (
        <Linkedin size={34} className="text-emerald-400 group-hover:text-white transition-colors" />
      ),
      title: "LinkedIn",
      value: "Sebastian Strzałkowski",
      link: `https://${developerData.contact.linkedin}`,
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
                className="group block h-full"
              >
                <SpotlightCard
                  className="h-full border-gray-800/80 bg-gray-900/60 p-8 transition-all duration-300"
                  spotlightColor="rgba(16, 185, 129, 0.25)"
                >
                  <div className="w-full h-full flex flex-col items-center justify-between text-center">
                    
                    {/* Centered Glowing Icon Frame */}
                    <div className="flex flex-col items-center w-full">
                      <div className="relative mb-6 flex items-center justify-center">
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
                    </div>

                    {/* Centered CTA Pill */}
                    <div className="inline-flex items-center justify-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-200 mt-2">
                      <span>{t('contact.form.send')}</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
                    </div>

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