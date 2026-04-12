import { useState, useEffect, useRef } from "react";
import { Chips } from "../components/Chips";
import { Cards } from "../components/Cards";
import { Header } from "../components/Header";
import { fetchPhotos } from "../api/unsplash";
import { PhotoModal } from "../components/PhotoModal";
import { savePhotoToFirebase } from "../api/firebase";
import { deletePhotoFromFirebase } from "../api/firebase";
import { toast } from "react-toastify";
const FILTERS = ["All", "Men", "Women"];

export default function DiscoverScreen({ likedPhotos, setlikedPhotos }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const isLoadingRef = useRef(false);
  const hasMoreRef = useRef(true);

  const uid = localStorage.getItem("uid");

  const handlePhotoSaved = async(photoId, isSaved) => {
    const photo = photos.find(p => p.id === photoId);
    if(!photo) return;
    try{
    if (isSaved) {
      
      const docId = await savePhotoToFirebase(uid, photo);
      toast.success("Look saved to wardrobe!");
      setlikedPhotos((prev)=>[...prev, { ...photo, docId }]);
      
    
    } else {
      const likedPhoto = likedPhotos.find(p => p.id === photoId);
      console.log(likedPhotos)
      await deletePhotoFromFirebase(uid, likedPhoto.docId);
      setlikedPhotos(prev => prev.filter(p => p.id !== photoId));
      toast.success("Look removed from wardrobe!");

    }
  }
  catch(err){
    console.error("Error saving photo:", err);
    toast.error(isSaved ? "Failed to save look. Please try again." : "Failed to remove look. Please try again.");
  }
}

  useEffect(() => {
    if (isLoadingRef.current || !hasMoreRef.current) return;
    const fetchData = async () => {
      isLoadingRef.current = true;
      setIsLoading(true);
      try {
        const data = await fetchPhotos("fashion", page);
        setPhotos((prev) => [...prev, ...data.results]);
        hasMoreRef.current = page < 1000;
      } catch (err) {
        console.error(err);
      } finally {
        isLoadingRef.current = false;
        setIsLoading(false);
      }
    };
    fetchData();
  }, [page]);

  useEffect(() => {

    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight-10 &&
        !isLoadingRef.current &&
        hasMoreRef.current
      ) 
      
      {
        setPage((prev) => prev + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // filter using activeFilter
  const filteredPhotos = photos.filter((photo) => {
    const desc = photo.alt_description?.toLowerCase() || "";
    if (activeFilter === "All") return true;
     if (activeFilter === "Men") return (desc.includes("man") || desc.includes("men")) && 
                                     !desc.includes("woman") && 
                                     !desc.includes("women");
    if (activeFilter === "Women") return desc.includes("woman") || desc.includes("women");
  });

  return (
    <div className="min-h-screen bg-[#141414] font-sans">
      <Header />

      {/* Search + Filter */}
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
        </div>
      </div>

      {/* Photo Grid */}       
      <div className="grid grid-cols-3 gap-4">
        {photos.map((photo) => (
          <Cards
            key={photo.id}        
            id={photo.id}                       
            url={photo.urls.small}
            title={photo.alt_description}
            photo={photo}
            saved={likedPhotos?.some(p => p.id === photo.id)}
            onClick={() => setSelectedPhoto(photo)}
            onPhotoSaved={handlePhotoSaved}
          />
        ))}
      </div>

      {isLoading && (
        <p className="text-center text-gray-500 text-sm py-6">Loading...</p>
      )}

      <PhotoModal
        photo={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />
    </div>
  );
}