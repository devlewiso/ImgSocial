import React from 'react';
import { Loader2, AlertCircle } from 'lucide-react';

interface AnalysisResultProps {
  analysis: string;
  loading: boolean;
  error: string | null;
}

export function AnalysisResult({ analysis, loading, error }: AnalysisResultProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Image Analysis
      </h2>
      
      {loading && (
        <div className="flex items-center justify-center space-x-2 text-indigo-600 py-8">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span className="font-medium">Analyzing image with Gemini AI...</span>
        </div>
      )}

      {error && (
        <div className="flex items-center space-x-2 text-red-500 bg-red-50 p-4 rounded-lg">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {analysis && !loading && (
        <div className="prose prose-indigo max-w-none">
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {analysis}
          </p>
        </div>
      )}

      {!analysis && !loading && !error && (
        <div className="text-center py-8">
          <p className="text-gray-500 italic">
            Upload an image to see its analysis
          </p>
        </div>
      )}
    </div>
  );
}