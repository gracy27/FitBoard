import { useState, useEffect, useRef } from "react";
import { Chips } from "../components/Chips";
import { Cards } from "../components/Cards";
import { Header } from "../components/Header";
import { fetchPhotos } from "../api/unsplash";
import { PhotoModal } from "../components/PhotoModal";  
import { savePhotoToFirebase } from "../api/firebase";
const FILTERS = ["All", "Street", "Casual", "Formal"];

export default function DiscoverScreen({ likedPhotos, setlikedPhotos }) {
  const [activeFilter, setActiveFilter] = useState("Street");
  const [query, setQuery] = useState("");
  const [photos, setPhotos] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const isLoadingRef = useRef(false);
  const hasMoreRef = useRef(true);

  // Get uid from localStorage
  const uid = localStorage.getItem("uid");

  const handlePhotoSaved = (photo, isSaved) => {
    if (isSaved) {
      // SAVE to localStorage
      setlikedPhotos([...likedPhotos, photo]);
      console.log("Photo saved:", photo);
    } else {
      // DELETE from localStorage
      setlikedPhotos(prev => prev.filter(p => p.id !== photo.id));
      console.log("Photo deleted:", photo.id);
    }
  };

  useEffect(() => {
    if (isLoadingRef.current || !hasMoreRef.current) return;

    const fetchData = async () => {
      isLoadingRef.current = true;
      setIsLoading(true);
      try {
        const data = await fetchPhotos('fashion', page);
        setPhotos((prev) => [...prev, ...data.results]);
        hasMoreRef.current = page < 1000;
        setHasMore(page < 1000);
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
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !isLoadingRef.current && hasMoreRef.current) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    console.log("saved photos in discover", likedPhotos);
  }, [likedPhotos])

  return (
    <div className="min-h-screen bg-[#141414] font-sans ">
      <Header />
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

      <div className="grid grid-cols-3 gap-4">
        {photos.map((photo) => (
          <Cards
            key={photo.id}
            id={photo.id}
            url={photo.urls.small}
            title={photo.alt_description}
            photo={photo}
            saved={likedPhotos.some(p => p.id === photo.id)}
            onClick={() => setSelectedPhoto(photo)}   
            onPhotoSaved={() =>savePhotoToFirebase(uid, photo) }
          />
        ))}
      </div>

      <PhotoModal
        photo={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />                                              
    </div>
  );
}