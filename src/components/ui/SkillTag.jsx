import React from 'react';
import { Code } from 'lucide-react';

const SkillTag = ({ name }) => {
  return (
    <div className="group relative rounded-xl bg-gray-800/80 px-4 py-3 border border-gray-700/60 hover:border-emerald-500/50 flex items-center space-x-3 transition-colors duration-200">
      <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 group-hover:text-emerald-300 transition-colors">
        <Code size={16} aria-hidden="true" />
      </div>
      <span className="text-gray-200 text-sm font-medium group-hover:text-white transition-colors">{name}</span>
    </div>
  );
};

export default SkillTag;
