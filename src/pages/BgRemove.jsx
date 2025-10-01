import React, { useState, useRef } from 'react';
import { Upload, Scissors, Download, X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import axios from 'axios';

export default function BgRemove() {
  const [originalImage, setOriginalImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setOriginalImage(event.target.result);
        setProcessedImage(null);
        setSliderPosition(50);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeBackground = async () => {
    if (!originalImage) return;
    setIsProcessing(true);

    try {
      const formData = new FormData();
      formData.append('file', originalImage);
      formData.append('upload_preset', 'ml_default');

      // Cloudinary URL for background removal using AI
      const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`;

      const response = await axios.post(url, formData);
      const uploadedImageUrl = response.data.secure_url;

      // Optionally, you can apply background removal transformation
      const bgRemovedUrl = `https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload/e_background_removal/${response.data.public_id}.png`;

      setProcessedImage(bgRemovedUrl);
    } catch (error) {
      console.error('Background removal failed:', error);
      alert('Failed to remove background. Check console for details.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (processedImage) {
      const link = document.createElement('a');
      link.href = processedImage;
      link.download = 'removed-background.png';
      link.click();
    }
  };

  const handleSliderMove = (e) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <Scissors className="w-12 h-12 text-purple-600 animate-pulse" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
            Background Remover
          </h1>
          <p className="text-gray-600 text-lg">
            Upload an image and remove its background instantly
          </p>
        </div>

        {!originalImage && (
          <div className="card bg-white shadow-2xl animate-slide-up">
            <div className="card-body items-center text-center p-8 md:p-12">
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="w-full border-4 border-dashed border-purple-300 rounded-2xl p-12 md:p-16 cursor-pointer hover:border-purple-500 hover:bg-purple-50 transition-all duration-300 group"
              >
                <Upload className="w-16 h-16 md:w-20 md:h-20 mx-auto text-purple-400 group-hover:text-purple-600 group-hover:scale-110 transition-transform duration-300" />
                <p className="text-xl font-semibold text-gray-700 mt-6 mb-2">
                  Click to upload an image
                </p>
                <p className="text-gray-500">
                  PNG, JPG, WEBP up to 10MB
                </p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </div>
        )}

        {originalImage && (
          <div className="space-y-6 animate-slide-up">
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => {
                  setOriginalImage(null);
                  setProcessedImage(null);
                }}
                className="btn btn-outline btn-error gap-2"
              >
                <X className="w-5 h-5" />
                Clear
              </button>
              
              {!processedImage && (
                <button
                  onClick={removeBackground}
                  disabled={isProcessing}
                  className="btn btn-primary gap-2 px-8"
                >
                  {isProcessing ? (
                    <>
                      <span className="loading loading-spinner"></span>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Scissors className="w-5 h-5" />
                      Remove Background
                    </>
                  )}
                </button>
              )}

              {processedImage && (
                <button
                  onClick={handleDownload}
                  className="btn btn-success gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download
                </button>
              )}
            </div>

            {/* Image Preview */}
            <div className="card bg-white shadow-2xl">
              <div className="card-body p-4 md:p-8">
                {!processedImage ? (
                  <div className="relative w-full aspect-video bg-gray-100 rounded-xl overflow-hidden">
                    <img
                      src={originalImage}
                      alt="Original"
                      className="w-full h-full object-contain"
                    />
                    {isProcessing && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="text-center">
                          <div className="loading loading-spinner loading-lg text-white"></div>
                          <p className="text-white mt-4 text-lg font-semibold">
                            Removing background...
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div
                    className="relative w-full aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden select-none"
                    onMouseMove={handleSliderMove}
                    onMouseUp={() => setIsDragging(false)}
                    onMouseLeave={() => setIsDragging(false)}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={() => setIsDragging(false)}
                  >
                    {/* Before Image */}
                    <div className="absolute inset-0">
                      <img
                        src={originalImage}
                        alt="Original"
                        className="w-full h-full object-contain"
                      />
                      <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2">
                        <ImageIcon className="w-4 h-4" />
                        Before
                      </div>
                    </div>

                    {/* After Image */}
                    <div
                      className="absolute inset-0"
                      style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                    >
                      <img
                        src={processedImage}
                        alt="Processed"
                        className="w-full h-full object-contain"
                      />
                      <div className="absolute top-4 right-4 bg-purple-600 bg-opacity-90 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2">
                        <Scissors className="w-4 h-4" />
                        After
                      </div>
                    </div>

                    {/* Slider */}
                    <div
                      className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-10 shadow-lg"
                      style={{ left: `${sliderPosition}%` }}
                      onMouseDown={() => setIsDragging(true)}
                      onTouchStart={() => setIsDragging(true)}
                    >
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-xl">
                        <ChevronLeft className="w-4 h-4 text-purple-600 absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3" />
                        <ChevronRight className="w-4 h-4 text-purple-600 absolute right-0 top-1/2 -translate-y-1/2 translate-x-3" />
                      </div>
                    </div>
                  </div>
                )}

                {processedImage && (
                  <p className="text-center text-gray-600 mt-4">
                    Drag the slider to compare before and after
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.6s ease-out; }
        .animate-slide-up { animation: slide-up 0.6s ease-out; }
      `}</style>
    </div>
  );
}
