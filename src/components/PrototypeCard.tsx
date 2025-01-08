import React from 'react';
import { Heart } from 'lucide-react';
import type { Prototype } from '../types/prototype';

interface PrototypeCardProps {
  prototype: Prototype;
  onClick: () => void;
}

export function PrototypeCard({ prototype, onClick }: PrototypeCardProps) {
  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer"
      onClick={onClick}
    >
      <div className="relative">
        <img src={prototype.image} alt={prototype.title} className="w-full h-48 object-cover" />
        <button 
          className="absolute top-2 right-2 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            // Handle favorite action
          }}
        >
          <Heart className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
      </div>
      
      <div className="p-4">
        <div className="flex items-center mb-4">
          <img src={prototype.author.avatar} alt={prototype.author.name} className="w-8 h-8 rounded-full mr-2" />
          <span className="text-sm text-gray-600 dark:text-gray-400">{prototype.author.name}</span>
        </div>
        
        <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">{prototype.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">{prototype.description}</p>
        
        <div className="flex flex-wrap gap-2">
          {prototype.tags.map(tag => (
            <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-md text-xs text-gray-600 dark:text-gray-400">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}