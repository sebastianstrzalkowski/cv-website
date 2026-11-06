import React from 'react';

const SectionHeading = ({ title, description, className = '' }) => (
  <div className={`text-center mb-16 ${className}`}>
    <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight text-balance">
      {title}
    </h2>
    {description && (
      <p className="text-base sm:text-lg text-gray-300 mt-5 max-w-2xl mx-auto leading-relaxed">
        {description}
      </p>
    )}
  </div>
);

export default SectionHeading;
