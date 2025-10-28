
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { OutfitDisplay } from './components/OutfitDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { Footer } from './components/Footer';
import { generateOutfits } from './services/geminiService';
import type { Outfit } from './types';
import { fileToBase64 } from './utils/fileUtils';

const App: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedImagePreview, setSelectedImagePreview] = useState<string | null>(null);
  const [generatedOutfits, setGeneratedOutfits] = useState<Outfit[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = useCallback((file: File) => {
    setGeneratedOutfits([]);
    setError(null);
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleGenerateClick = useCallback(async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    setError(null);
    setGeneratedOutfits([]);

    try {
      const base64String = await fileToBase64(selectedFile);
      const [header, base64Data] = base64String.split(',');
      if (!header || !base64Data) {
        throw new Error("Invalid file format.");
      }
      
      const mimeTypeMatch = header.match(/:(.*?);/);
      if (!mimeTypeMatch || !mimeTypeMatch[1]) {
        throw new Error("Could not determine file MIME type.");
      }
      const mimeType = mimeTypeMatch[1];
      
      const outfits = await generateOutfits(base64Data, mimeType);
      setGeneratedOutfits(outfits);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [selectedFile]);
  
  const handleReset = useCallback(() => {
    setSelectedFile(null);
    setSelectedImagePreview(null);
    setGeneratedOutfits([]);
    setError(null);
    setIsLoading(false);
  }, []);


  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8 w-full">
        <div className="max-w-6xl mx-auto">
          {!selectedFile && (
            <ImageUploader onImageUpload={handleImageUpload} />
          )}

          {selectedFile && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-700 mb-4">Your Item</h2>
                {selectedImagePreview && (
                  <img src={selectedImagePreview} alt="Selected item" className="max-h-96 w-auto object-contain rounded-lg shadow-md" />
                )}
                 <div className="mt-6 flex space-x-4">
                  <button
                    onClick={handleGenerateClick}
                    disabled={isLoading}
                    className="flex items-center justify-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    {isLoading ? <LoadingSpinner /> : '✨ Generate Outfits'}
                  </button>
                   <button
                    onClick={handleReset}
                    className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-all duration-300"
                  >
                    Start Over
                  </button>
                </div>
              </div>

              <div className="flex flex-col">
                <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center lg:text-left">AI Styled Outfits</h2>
                 {isLoading && (
                  <div className="flex flex-col items-center justify-center h-96 bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                     <LoadingSpinner size="lg" />
                     <p className="mt-4 text-gray-600 animate-pulse">Styling your outfits... this may take a moment.</p>
                  </div>
                 )}
                 {error && (
                   <div className="p-4 bg-red-100 text-red-700 border border-red-300 rounded-lg">
                     <strong>Error:</strong> {error}
                   </div>
                 )}
                 {!isLoading && generatedOutfits.length > 0 && (
                   <OutfitDisplay outfits={generatedOutfits} />
                 )}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
