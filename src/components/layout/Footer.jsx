import React from 'react';
import { Mail, Linkedin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import developerData from '../../data/developerData';

const Footer = () => {
  const { t } = useTranslation();

  return (
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="container mx-auto text-center">
          <p>© {new Date().getFullYear()} {developerData.name}. {t('footer.rights')}</p>
          <div className="flex justify-center space-x-4 mt-4">
            <a href={`mailto:${developerData.contact.email}`} className="text-gray-400 hover:text-green-400 transition-colors">
              <Mail size={20} />
            </a>
            <a href={`https://${developerData.contact.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400 transition-colors">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </footer>
  );
};

export default Footer;