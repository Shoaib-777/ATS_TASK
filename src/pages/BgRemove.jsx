import React, { useState, useRef } from "react";
import {
  Upload,
  Scissors,
  Download,
  X,
} from "lucide-react";
import axios from "axios";
import SliderCompare from "../components/SliderCompare";

const BgRemove = () => {
  const [originalImage, setOriginalImage] = useState(null); // preview
  const [originalFile, setOriginalFile] = useState(null); // actual file
  const [processedImage, setProcessedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef(null);

  // Handle upload
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setOriginalFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setOriginalImage(event.target.result);
        setProcessedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove background
  const removeBackground = async () => {
    if (!originalFile) return;
    setIsProcessing(true);

    try {
      const formData = new FormData();
      console.log("iam original file",originalFile)
      formData.append("file", originalFile);
      formData.append("upload_preset", "ats_upload"); 
      formData.append("cloud_name","dek0rvlct")

      const cloudinaryResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );

      const uploadedImageUrl = cloudinaryResponse.data.secure_url;
      // ✅ Fixed: use correct API key env variable and spacing issues
      const removeBgForm = new FormData();
      removeBgForm.append("size", "auto");
      removeBgForm.append("image_url", uploadedImageUrl);

      const removeBgResponse = await axios.post(
      "https://api.remove.bg/v1.0/removebg",
      removeBgForm,
      {
        headers: {
          "X-Api-Key": import.meta.env.VITE_BG_REMOVE_API_KEY,
        },
        responseType: "blob",
      }
    );

      // ✅ Convert blob to object URL
      const processedBlob = removeBgResponse.data;
      console.log("iam image after bg remove",processedBlob)
      const processedUrl = URL.createObjectURL(processedBlob);
      setProcessedImage(processedUrl);
    } catch (error) {
      console.error("Background removal failed:", error.response || error);
      alert("Background removal failed or your free credits might be over.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Download image
  const handleDownload = () => {
    if (processedImage) {
      const link = document.createElement("a");
      link.href = processedImage;
      link.download = "removed-background.png";
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <Scissors className="w-12 h-12 text-purple-600 animate-bounce" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
            Background Remover
          </h1>
          <p className="text-gray-600 text-lg">
            Upload an image and remove its background instantly
          </p>
        </div>

        {/* Upload Section */}
        {!originalImage && (
          <div className="card bg-base-100 shadow-2xl animate-slide-up">
            <div className="card-body items-center text-center p-8 md:p-12">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="w-full border-2 border-dashed border-purple-300 rounded-xl p-12 md:p-16 cursor-pointer hover:border-purple-500 hover:bg-purple-50 transition-all duration-300 group"
              >
                <Upload className="w-16 h-16 md:w-20 md:h-20 mx-auto text-purple-400 group-hover:text-purple-600 transition-colors duration-300" />
                <p className="text-xl font-semibold text-gray-700 mt-6 mb-2">
                  Click to upload an image
                </p>
                <p className="text-gray-500">PNG, JPG, WEBP up to 10MB</p>
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

        {/* After Upload */}
        {originalImage && (
          <div className="space-y-6 animate-slide-up">
            {/* Buttons */}
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => {
                  setOriginalImage(null);
                  setOriginalFile(null);
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

            {/* Preview Section */}
            <div className="card bg-base-100 shadow-2xl">
              <div className="card-body p-4 md:p-8">
                {!processedImage ? (
                  <div className="relative w-full aspect-video bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
                    <img
                      src={originalImage}
                      alt="Original"
                      className="w-full h-full object-contain"
                    />
                    {isProcessing && (
                      <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center">
                        <span className="loading loading-lg loading-spinner text-white"></span>
                        <p className="text-white mt-4 text-lg font-semibold">
                          Removing background...
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <SliderCompare
                    originalImage={originalImage}
                    processedImage={processedImage}
                  />
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

      {/* Animations */}
      <style jsx:true="true">{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default BgRemove;
