import React from 'react';

interface ImagePreviewProps {
  imageUrl: string;
}

export function ImagePreview({ imageUrl }: ImagePreviewProps) {
  return (
    <div className="rounded-lg overflow-hidden shadow-lg">
      <img
        src={imageUrl}
        alt="Uploaded preview"
        className="w-full h-auto"
      />
    </div>
  );
}