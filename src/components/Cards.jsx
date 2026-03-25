import { useState } from "react";

export function Cards({ id, url, title, tags = [], bgColor = "#f3c6d0", saved: initialSaved = false, onClick }) {
//                                                                                                    ↑ added
  const [saved, setSaved] = useState(initialSaved);

  return (
    <div
      className="bg-[#1e1e1e] rounded-2xl overflow-hidden flex flex-col cursor-pointer hover:scale-[1.02] transition-transform duration-200"
      onClick={onClick}   
    >
      <div className="w-full h-44">
        <img
          src={url}
          alt={title || "Photo"}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="px-4 pt-3 pb-4 flex flex-col gap-3">
        <div>
          <p className="text-white text-sm font-semibold leading-tight">{id}</p>
          <p className="text-gray-400 text-xs mt-0.5">{title || "No description"}</p>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();       // ← added (prevents modal from opening on save click)
            setSaved((s) => !s);
          }}
          className={`
            flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium w-fit transition-all duration-200
            ${
              saved
                ? "bg-[#2a2a2a] text-white border border-gray-600"
                : "bg-[#2a2a2a] text-gray-300 border border-gray-600 hover:border-rose-400 hover:text-rose-400"
            }
          `}
        >
          <span>{saved ? "♥" : "♡"}</span>
          <span>{saved ? "Saved" : "Save"}</span>
        </button>
      </div>
    </div>
  );
}