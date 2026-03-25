import { useState } from "react";

export function PhotoModal({ photo, onClose }) {
  if (!photo) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
      onClick={onClose}
    >
      <div
        className="relative bg-[#1e1e1e] rounded-2xl overflow-hidden max-w-3xl w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-rose-500 transition-colors"
        >
          ✕
        </button>

      
        <img
          src={photo.urls.full}
          alt={photo.alt_description}
          className="w-full max-h-[70vh] object-contain"
        />

        <div className="p-4">
          <p className="text-white font-semibold">{photo.id}</p>
          <p className="text-gray-400 text-sm mt-1">{photo.alt_description}</p>
        </div>
      </div>
    </div>
  );
}