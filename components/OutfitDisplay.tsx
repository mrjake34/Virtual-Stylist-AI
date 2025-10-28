
import React from 'react';
import type { Outfit } from '../types';

interface OutfitDisplayProps {
  outfits: Outfit[];
}

export const OutfitDisplay: React.FC<OutfitDisplayProps> = ({ outfits }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
      {outfits.map((outfit, index) => (
        <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden transform hover:scale-105 transition-transform duration-300">
          <div className="p-4">
            <h3 className="text-xl font-bold text-center text-gray-700">{outfit.style}</h3>
          </div>
          <div className="aspect-w-1 aspect-h-1 bg-gray-100">
            <img 
              src={outfit.imageUrl} 
              alt={`${outfit.style} outfit`} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      ))}
    </div>
  );
};
