
import React, { useCallback, useRef } from 'react';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
}

const UploadIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
);

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
        onImageUpload(file);
    }
  }, [onImageUpload]);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center text-center p-8 bg-white rounded-2xl shadow-xl border-2 border-dashed border-gray-300 transition-all duration-300 hover:border-indigo-400 hover:shadow-2xl"
         onClick={handleClick}
         onDrop={handleDrop}
         onDragOver={handleDragOver}>
        <input
            type="file"
            ref={inputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/png, image/jpeg, image/webp"
        />
        <UploadIcon className="h-16 w-16 text-indigo-500 mb-4" />
      <h2 className="text-2xl font-bold text-gray-700">Upload Your Clothing Item</h2>
      <p className="mt-2 text-gray-500">
        Drag & drop an image here, or click to select a file.
      </p>
      <p className="mt-1 text-sm text-gray-400">
        Let our AI build the perfect outfit around it!
      </p>
    </div>
  );
};
