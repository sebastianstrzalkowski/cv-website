import React from 'react';
import { Linkedin, ArrowRight, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import developerData from '../../data/developerData';
import RevealOnScroll from '../ui/RevealOnScroll';

const Contact = () => {
  const { t } = useTranslation();

  const contactOptions = [
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 240 240" fill="currentColor" className="text-green-400 group-hover:text-white transition-colors"><path d="M98 175c-3.888 0-3.227-1.468-4.568-5.17L82 132.206 170 80c4.156-2.518-1.574 1.543-1.574 1.543L70 142l-29.288-9.088c-6.398-1.998-6.353-6.276 1.325-9.317L195 56c7.096-3.033 13.91 1.761 11.516 12.35L178 171c-1.84 8.718-9.845 7.632-13.885 5.23l-37.115-28.23-18.062 17.58c-2.062 2.067-3.804 3.82-7.938 3.82z" /></svg>,
      title: "Telegram",
      value: developerData.contact.telegram,
      link: `https://t.me/${developerData.contact.telegram.replace('@', '')}`,
    },
    {
      icon: <MessageCircle size={40} className="text-green-400 group-hover:text-white transition-colors" />,
      title: "Discord",
      value: developerData.contact.discord,
      link: "https://discord.com/users/sebastianstrzalkowski",
    },
    {
      icon: <Linkedin size={40} className="text-green-400 group-hover:text-white transition-colors" />,
      title: "LinkedIn",
      value: "Sebastian",
      link: `https://${developerData.contact.linkedin}`,
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gray-900 text-white p-4 relative min-h-[500px] flex items-center">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-500 rounded-full opacity-5 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500 rounded-full opacity-5 blur-3xl"></div>

      <div className="container mx-auto max-w-5xl relative z-10">
        <RevealOnScroll width="100%">
          <div className="text-center mb-16">
            <span className="inline-block bg-green-500 bg-opacity-20 text-green-400 px-4 py-1 rounded-full text-sm font-medium mb-4">{t('contact.title')}</span>
            <h2 className="text-3xl md:text-4xl font-bold">{t('contact.subtitle')}</h2>
            <p className="text-gray-300 mt-4 max-w-xl mx-auto">{t('contact.description')}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {contactOptions.map((option, index) => (
              <a
                key={index}
                href={option.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 bg-opacity-90 rounded-xl overflow-hidden shadow-xl border border-gray-700 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-green-900 hover:shadow-lg group"
              >
                <div className="bg-gradient-to-r from-green-400 to-teal-400 h-2"></div>
                <div className="p-8 flex flex-col items-center text-center">
                  <div className="mb-6 p-4 bg-gray-900 rounded-full group-hover:bg-green-500 transition-colors">
                    {option.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-green-400 transition-colors">{option.title}</h3>
                  <p className="text-gray-400 group-hover:text-white transition-colors">{option.value}</p>
                  <div className="mt-6 flex items-center text-sm text-green-400 group-hover:text-green-300 transition-colors">
                    <span>{t('contact.form.send')}</span>
                    <ArrowRight size={16} className="ml-2" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default Contact;