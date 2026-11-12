import React from 'react';
import { Linkedin, Mail, Github, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import developerData from '../../data/developerData';
import SpotlightCard from '../ui/SpotlightCard';
import RevealOnScroll from '../ui/RevealOnScroll';
import SectionHeading from '../ui/SectionHeading';

const TelegramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M20.665 3.717l-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l-.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z" />
  </svg>
);

const DiscordIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

export const XIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const renderValue = (value) => {
  const at = value.indexOf('@');
  if (at <= 0) return value;
  return (
    <>
      {value.slice(0, at)}
      <wbr />
      {value.slice(at)}
    </>
  );
};

const Contact = () => {
  const { t } = useTranslation();
  const { contact } = developerData;

  const contactOptions = [
    {
      icon: <Mail size={34} aria-hidden="true" />,
      title: t('contact.contactLabels.email'),
      value: contact.email,
      link: `mailto:${contact.email}`,
      action: t('contact.actions.email'),
      external: false,
    },
    {
      icon: <TelegramIcon className="w-9 h-9 -translate-x-0.5" />,
      title: 'Telegram',
      value: contact.telegram,
      link: `https://t.me/${contact.telegram.replace('@', '')}`,
      action: t('contact.actions.telegram'),
      external: true,
    },
    {
      icon: <Linkedin size={34} aria-hidden="true" />,
      title: 'LinkedIn',
      value: developerData.name,
      link: `https://${contact.linkedin}`,
      action: t('contact.actions.linkedin'),
      external: true,
    },
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" aria-hidden="true" />

      <div className="container mx-auto max-w-5xl px-4 relative z-10">
        <RevealOnScroll width="100%">

          <SectionHeading title={t('contact.subtitle')} description={t('contact.description')} />

          <ul className="grid md:grid-cols-3 gap-5 lg:gap-6 max-w-4xl mx-auto list-none">
            {contactOptions.map((option) => (
              <li key={option.title} className="h-full">
                <a
                  href={option.link}
                  target={option.external ? '_blank' : undefined}
                  rel={option.external ? 'noopener noreferrer' : undefined}
                  className="group block h-full rounded-2xl"
                >
                  <SpotlightCard className="h-full p-7" spotlightColor="rgba(16, 185, 129, 0.25)">
                    <div className="w-full h-full flex flex-col items-center justify-between text-center">
                      <div className="flex flex-col items-center w-full">
                        <div className="relative w-20 h-20 mb-5 rounded-2xl bg-gray-950 border border-gray-800 group-hover:border-emerald-500/60 flex items-center justify-center text-emerald-400 group-hover:text-white transition-colors duration-200 shadow-card">
                          {option.icon}
                        </div>

                        <h3 className="text-lg font-bold mb-1 text-white group-hover:text-emerald-300 transition-colors">
                          {option.title}
                        </h3>

                        <p className="text-sm text-gray-400 group-hover:text-gray-200 transition-colors mb-6 break-words">
                          {renderValue(option.value)}
                        </p>
                      </div>

                      <span className="inline-flex items-center justify-center gap-2 min-h-9 text-xs font-semibold text-emerald-300 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20 group-hover:bg-emerald-400 group-hover:text-gray-950 group-hover:border-emerald-400 transition-colors duration-200">
                        <span>{option.action}</span>
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
                      </span>
                    </div>
                  </SpotlightCard>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-sm text-gray-400">
            <span>{t('contact.otherChannels')}</span>
            <a
              href={`https://${contact.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 min-h-10 px-3 rounded-full border border-gray-800 hover:border-emerald-500/50 text-gray-200 hover:text-emerald-300 transition-colors"
            >
              <Github size={16} aria-hidden="true" />
              <span>{contact.github}</span>
            </a>
            <a
              href={`https://x.com/${contact.x.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 min-h-10 px-3 rounded-full border border-gray-800 hover:border-emerald-500/50 text-gray-200 hover:text-emerald-300 transition-colors"
            >
              <XIcon className="w-4 h-4" />
              <span>X: {contact.x}</span>
            </a>
            <span className="inline-flex items-center gap-2 min-h-10 px-3 rounded-full border border-gray-800 text-gray-200">
              <DiscordIcon className="w-4 h-4" />
              <span>Discord: {contact.discord}</span>
            </span>
          </div>

        </RevealOnScroll>
      </div>
    </section>
  );
};

export default Contact;
