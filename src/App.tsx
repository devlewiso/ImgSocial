import React, { useState } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { ImagePost } from './components/ImagePost';
import { analyzeImage } from './utils/gemini';
import { useImageStore } from './store/imageStore';
import { Camera } from 'lucide-react';

function App() {
  const [isProcessing, setIsProcessing] = useState(false);
  const { posts, addPost } = useImageStore();

  const handleImageUpload = async (imageData: string) => {
    setIsProcessing(true);
    try {
      const analysis = await analyzeImage(imageData);
      addPost(imageData, analysis);
    } catch (error) {
      console.error('Failed to analyze image:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-2">
            <Camera className="w-8 h-8 text-purple-600" />
            <h1 className="text-2xl font-bold text-gray-900">Social Image Analyzer</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <ImageUploader
            onImageUpload={handleImageUpload}
            isProcessing={isProcessing}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {posts.map((post) => (
            <ImagePost
              key={post.id}
              id={post.id}
              imageUrl={post.imageUrl}
              analysis={post.analysis}
              timestamp={post.timestamp}
              likes={post.likes}
            />
          ))}
        </div>
        
        {posts.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">No images shared yet. Be the first to share!</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;