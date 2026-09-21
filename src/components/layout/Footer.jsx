import React from 'react';
import { Mail, Linkedin, Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import developerData from '../../data/developerData';
import { motion } from 'framer-motion';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="relative bg-gray-950 text-white py-12 px-4 border-t border-gray-800/80 overflow-hidden">
      {/* Subtle top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10 max-w-6xl">
        <div className="text-center sm:text-left">
          <div className="font-mono text-lg font-bold text-white mb-1">
            <span className="text-emerald-400">{'<'}</span>
            {developerData.name}
            <span className="text-emerald-400">{'/>'}</span>
          </div>
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} {developerData.name}. {t('footer.rights')}
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex items-center space-x-3">
          <motion.a
            whileHover={{ scale: 1.15, y: -2 }}
            whileTap={{ scale: 0.95 }}
            href={`mailto:${developerData.contact.email}`}
            aria-label="Email"
            className="w-10 h-10 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-emerald-400 hover:border-emerald-500/50 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-colors"
          >
            <Mail size={18} />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.15, y: -2 }}
            whileTap={{ scale: 0.95 }}
            href={`https://${developerData.contact.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="w-10 h-10 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-emerald-400 hover:border-emerald-500/50 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-colors"
          >
            <Linkedin size={18} />
          </motion.a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;