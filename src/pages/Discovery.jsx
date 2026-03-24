import { useState,useEffect } from "react";
import { Chips } from "../components/Chips";
import { Cards } from "../components/Cards";
import { logout } from "../utils/Logout";
import { useNavigate } from "react-router-dom"; 
import {Header} from "../components/Header";
import { fetchPhotos } from "../api/unsplash";

const FILTERS = ["All", "Street", "Casual", "Formal"];

const OUTFITS = [
  { id: 1, title: "Street look",  tags: ["Casual", "Urban"],    bgColor: "#f9c6d0", saved: true  },
  { id: 2, title: "Boho dress",   tags: ["Feminine", "Summer"], bgColor: "#c6f0e0", saved: false },
  { id: 3, title: "Office fit",   tags: ["Smart", "Minimal"],   bgColor: "#dcd6f7", saved: false },
  { id: 4, title: "Y2K vibes",    tags: ["Retro", "Bold"],      bgColor: "#fce8cc", saved: false },
  { id: 5, title: "Monochrome",   tags: ["Minimal", "Clean"],   bgColor: "#fcd5d5", saved: true  },
  { id: 6, title: "Cottagecore",  tags: ["Soft", "Nature"],     bgColor: "#d4f0d4", saved: false },
];



export default function DiscoverScreen() {
  const [activeFilter, setActiveFilter] = useState("Street");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();  
  useEffect(()=>
   {
    fetchPhotos('fashion').then(data => console.log(data)).catch(err => console.error(err));
   },[])
  return (
    
   
    <div className="min-h-screen bg-[#141414] font-sans p-6">
     <Header/>
      <div className="flex gap-3 items-center mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search outfits, styles, colors..."
          className="flex-1 bg-[#1e1e1e] text-gray-300 placeholder-gray-500 text-sm px-4 py-2.5 rounded-xl border border-gray-700 focus:outline-none focus:border-rose-400 transition-colors"
        />
        <div className="flex gap-2">
          {FILTERS.map((f) => (
            <Chips
              key={f}
              label={f}
              active={activeFilter === f}
              onClick={() => setActiveFilter(f)}
            />
          ))}
          <button
            onClick={() => logout(navigate)}  // ← pass navigate here
            className="ml-2 px-2 py-1.5 rounded-full text-sm font-medium transition-all duration-200 bg-transparent text-gray-300 border border-gray-600 hover:border-rose-400 hover:text-rose-400"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {OUTFITS.map((outfit) => (
          <Cards
            key={outfit.id}
            title={outfit.title}
            tags={outfit.tags}
            bgColor={outfit.bgColor}
            saved={outfit.saved}
          />
        ))}
      </div>
    </div>
    
  );
}