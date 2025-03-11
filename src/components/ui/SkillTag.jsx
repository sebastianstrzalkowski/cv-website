import React from 'react';
import { Code } from 'lucide-react';

const SkillTag = ({ name }) => {
  return (
      <div className="bg-gray-700 px-4 py-3 rounded-lg flex items-center space-x-2">
        <Code size={16} className="text-green-400" />
        <span className="text-gray-200">{name}</span>
      </div>
  );
};

export default SkillTag;