import React from "react";

export function Chips({ label, active = false, onClick }) {
  return (
    <div>
    <button
      onClick={onClick}
      className={`
        px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200
        ${
          active
            ? "bg-rose-400 text-white shadow-md shadow-rose-400/30"
            : "bg-transparent text-gray-300 border border-gray-600 hover:border-rose-400 hover:text-rose-400"
        }
      `}
    >
      {label}
    </button>
  
    </div>
    
  );
}

export default Chips;