import React from 'react';
import { Mail, Linkedin, Github } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import developerData from '../../data/developerData';

const iconLink =
  'w-11 h-11 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-emerald-300 hover:border-emerald-500/50 transition-colors';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="relative bg-gray-950 text-white py-12 px-4 border-t border-gray-800/80">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10 max-w-6xl">
        <div className="text-center sm:text-left">
          <div className="font-mono text-lg font-bold text-white mb-1">
            <span className="text-emerald-400" aria-hidden="true">{'<'}</span>
            {developerData.name}
            <span className="text-emerald-400" aria-hidden="true">{'/>'}</span>
          </div>
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} {developerData.name}. {t('footer.rights')}
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <a href={`mailto:${developerData.contact.email}`} aria-label="Email" className={iconLink}>
            <Mail size={18} aria-hidden="true" />
          </a>
          <a href={`https://${developerData.contact.github}`} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={iconLink}>
            <Github size={18} aria-hidden="true" />
          </a>
          <a href={`https://${developerData.contact.linkedin}`} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={iconLink}>
            <Linkedin size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
