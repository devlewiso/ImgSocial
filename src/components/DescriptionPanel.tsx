import React from 'react';
import { Loader2 } from 'lucide-react';

interface DescriptionPanelProps {
  description: string;
  loading: boolean;
  error: string | null;
}

export function DescriptionPanel({ description, loading, error }: DescriptionPanelProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Image Description
      </h2>
      
      {loading && (
        <div className="flex items-center justify-center space-x-2 text-indigo-600">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Analyzing image...</span>
        </div>
      )}

      {error && (
        <div className="text-red-500 bg-red-50 p-4 rounded-lg">
          {error}
        </div>
      )}

      {description && !loading && (
        <div className="prose prose-indigo">
          <p className="text-gray-700 leading-relaxed">
            {description}
          </p>
        </div>
      )}

      {!description && !loading && (
        <p className="text-gray-500 text-center italic">
          Upload an image to see its description
        </p>
      )}
    </div>
  );
}