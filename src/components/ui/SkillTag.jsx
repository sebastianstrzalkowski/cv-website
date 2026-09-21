import React from 'react';
import { Code } from 'lucide-react';
import { motion } from 'framer-motion';

const SkillTag = ({ name }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className="group relative overflow-hidden rounded-xl bg-gray-800/80 px-4 py-3 border border-gray-700/60 hover:border-emerald-500/50 backdrop-blur-sm flex items-center space-x-3 shadow-sm hover:shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-colors duration-200 cursor-default"
    >
      <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 group-hover:text-emerald-300 transition-colors">
        <Code size={16} />
      </div>
      <span className="text-gray-200 text-sm font-medium group-hover:text-white transition-colors">{name}</span>
    </motion.div>
  );
};

export default SkillTag;