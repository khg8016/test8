import React from 'react';
import { Play } from 'lucide-react';

interface PrototypeButtonsProps {
  previewUrl?: string;
  onPreviewClick: () => void;
}

export function PrototypeButtons({ previewUrl, onPreviewClick }: PrototypeButtonsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <button 
        onClick={onPreviewClick}
        disabled={!previewUrl}
        className="flex items-center justify-center px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Play className="w-4 h-4 mr-2" />
        Live Preview
      </button>
      <button className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        Launch in Bolt.new
      </button>
    </div>
  );
}