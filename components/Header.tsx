
import React from 'react';

const SparkleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v2.586l1.293-1.293a1 1 0 111.414 1.414L12.414 8l1.293 1.293a1 1 0 11-1.414 1.414L11 9.414V12a1 1 0 11-2 0V9.414l-1.293 1.293a1 1 0 01-1.414-1.414L7.586 8 6.293 6.707a1 1 0 011.414-1.414L9 6.586V4a1 1 0 011-1zM3.293 9.293a1 1 0 010-1.414L4.586 6.586l-1.293-1.293a1 1 0 111.414-1.414L6 5.172l1.293-1.293a1 1 0 111.414 1.414L7.414 6.586l1.293 1.293a1 1 0 01-1.414 1.414L6 8.828 4.707 10.121a1 1 0 01-1.414-1.414L3.293 9.293zm12 0a1 1 0 011.414 0l1.293.707a1 1 0 010 1.414l-1.293 1.293-1.293-1.293a1 1 0 010-1.414l.293-.293z" clipRule="evenodd" />
        <path d="M10 18a1 1 0 01-1-1v-2.586l-1.293 1.293a1 1 0 11-1.414-1.414L7.586 13l-1.293-1.293a1 1 0 111.414-1.414L9 11.586V9a1 1 0 112 0v2.586l1.293-1.293a1 1 0 111.414 1.414L12.414 13l1.293 1.293a1 1 0 01-1.414 1.414L11 14.586V17a1 1 0 01-1 1z" />
    </svg>
);


export const Header: React.FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-center">
          <SparkleIcon />
          <h1 className="ml-2 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
            Virtual Stylist AI
          </h1>
        </div>
      </div>
    </header>
  );
};
