import { useState, useEffect, useRef } from "react";
import { Chips } from "../components/Chips";
import { Cards } from "../components/Cards";
import { logout } from "../utils/Logout";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { fetchPhotos } from "../api/unsplash";
import { PhotoModal } from "../components/PhotoModal";  

const FILTERS = ["All", "Street", "Casual", "Formal"];

export default function DiscoverScreen() {
  const [activeFilter, setActiveFilter] = useState("Street");
  const [query, setQuery] = useState("");
  const [photos, setPhotos] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);   
  const navigate = useNavigate();
  const isLoadingRef = useRef(false);
  const hasMoreRef = useRef(true);

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
          <button
            onClick={() => logout(navigate)}
            className="ml-2 px-2 py-1.5 rounded-full text-sm font-medium transition-all duration-200 bg-transparent text-gray-300 border border-gray-600 hover:border-rose-400 hover:text-rose-400"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {photos.map((photo) => (
          <Cards
            key={photo.id}
            id={photo.id}
            url={photo.urls.small}
            title={photo.alt_description}
            saved={false}
            onClick={() => setSelectedPhoto(photo)}   
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