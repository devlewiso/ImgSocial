import React, { useState } from 'react';
import { Heart, ChevronDown, ChevronUp } from 'lucide-react';
import { useImageStore } from '../store/imageStore';

interface ImagePostProps {
  id: string;
  imageUrl: string;
  analysis: string;
  timestamp: number;
  likes: number;
}

export function ImagePost({ id, imageUrl, analysis, timestamp, likes }: ImagePostProps) {
  const { likePost, getTimeAgo } = useImageStore();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-square relative overflow-hidden">
        <img
          src={imageUrl}
          alt="Analyzed content"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500">
            {getTimeAgo(timestamp)}
          </span>
          <button
            onClick={() => likePost(id)}
            className="flex items-center space-x-1 text-gray-600 hover:text-red-500 transition-colors"
          >
            <Heart className="w-4 h-4" />
            <span className="text-sm">{likes}</span>
          </button>
        </div>
        
        <div className="prose prose-sm">
          <div className={`relative ${!isExpanded ? 'max-h-20' : ''} overflow-hidden`}>
            <p className="text-sm text-gray-700 leading-relaxed mb-0">
              {analysis}
            </p>
            {!isExpanded && (
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent" />
            )}
          </div>
          <button
            onClick={toggleExpand}
            className="flex items-center space-x-1 text-purple-600 hover:text-purple-700 text-sm mt-1"
          >
            <span>{isExpanded ? 'Show less' : 'Read more'}</span>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}