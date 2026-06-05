import React from 'react';

const PageHeader = ({ title, description, icon: Icon }) => (
  <header className="text-center mb-12">
    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mb-6 shadow-lg">
      <Icon className="w-8 h-8 text-white" />
    </div>
    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400">
      {title}
    </h1>
    <p className="text-lg text-slate-300 max-w-4xl mx-auto">
        {description}
    </p>
  </header>
);

export default PageHeader;