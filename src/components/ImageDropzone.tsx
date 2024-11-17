import React from 'react';
import { useDropzone } from 'react-dropzone';
import { ImagePlus, Upload } from 'lucide-react';

interface ImageDropzoneProps {
  onImageDrop: (imageData: string) => void;
  isProcessing: boolean;
}

export function ImageDropzone({ onImageDrop, isProcessing }: ImageDropzoneProps) {
  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onImageDrop(result);
      };
      reader.readAsDataURL(file);
    }
  }, [onImageDrop]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    multiple: false,
    disabled: isProcessing
  });

  return (
    <div
      {...getRootProps()}
      className={`relative border-2 border-dashed rounded-xl p-8 transition-all cursor-pointer
        ${isDragActive 
          ? 'border-indigo-500 bg-indigo-50' 
          : 'border-gray-300 hover:border-indigo-400 hover:bg-gray-50'}
        ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center text-gray-600">
        {isProcessing ? (
          <Upload className="w-12 h-12 mb-4 text-gray-400 animate-bounce" />
        ) : (
          <ImagePlus className="w-12 h-12 mb-4 text-gray-400" />
        )}
        <p className="text-center font-medium">
          {isDragActive
            ? "Drop the image here..."
            : isProcessing
            ? "Processing image..."
            : "Drag and drop an image here, or click to select"}
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Supports JPG, PNG, GIF, and WebP
        </p>
      </div>
    </div>
  );
}