import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Cards } from "../components/Cards";
import { Header } from "../components/Header";
import { PhotoModal } from "../components/PhotoModal";
import { debounce } from "../utils/Debounce";
const FILTERS = ["All", "Men", "Women"];

export default function DiscoverScreen() {
  const dispatch = useDispatch();
  const likedPhotos = useSelector(state => state.photos.likedPhotos);
  const photos = useSelector(state => state.photos.photos);
  const isLoading = useSelector(state => state.photos.loading);
  const [activeFilter, setActiveFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const isLoadingRef = useRef(false);
  const hasMoreRef = useRef(true);
  const [filteredPhotos, setFilteredPhotos] = useState([]);

  const handlePhotoSaved = (photoId, isSaved) => {
    const photo = photos.find(p => p.id === photoId);
    if (!photo) return;
    
    if (isSaved) {
      dispatch({ type: 'photos/SAVE_PHOTO_REQUEST', payload: { photo } });
    } else {
      const likedPhoto = likedPhotos.find(p => p.id === photoId);
      dispatch({ type: 'photos/DELETE_PHOTO_REQUEST', payload: { photoId, docId: likedPhoto.docId } });
    }
  }

  const handlesearch = debounce(() => {
    console.log("Searching for:", query);
    const data = query.toLowerCase().trim();
    const filtered = photos.filter(photo => photo.alt_description?.toLowerCase().includes(data));
    setFilteredPhotos(filtered);
    console.log("Search results:", filtered);
  }, 5000);



  useEffect(() => {
    if (isLoadingRef.current || !hasMoreRef.current) return;
    isLoadingRef.current = true;
    dispatch({ type: 'photos/FETCH_PHOTOS_REQUEST', payload: { query: "fashion", page } });
    hasMoreRef.current = page < 1000;
    isLoadingRef.current = false;
  }, [page, dispatch]);

  useEffect(() => {

    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 10 &&
        !isLoadingRef.current &&
        hasMoreRef.current
      ) {
        setPage((prev) => prev + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // filter using activeFilter
  // const filteredPhotos = photos.filter((photo) => {
  //   const desc = photo.alt_description?.toLowerCase() || "";
  //   if (activeFilter === "All") return true;
  //    if (activeFilter === "Men") return (desc.includes("man") || desc.includes("men")) && 
  //                                    !desc.includes("woman") && 
  //                                    !desc.includes("women");
  //   if (activeFilter === "Women") return desc.includes("woman") || desc.includes("women");
  // });


  return (
    <div className="min-h-screen bg-[#141414] font-sans">
      <Header />

      <div className="flex flex-col md:flex-row gap-3 items-center mb-6">
        <div className="flex-1 min-w-0 flex items-center bg-[#1e1e1e] border border-gray-700 rounded-xl focus-within:border-rose-400 transition-colors px-3">
          <input
            type="text"
            value={query}
            onChange={(e) => {setQuery(e.target.value);{handlesearch()}}}
            placeholder="Search outfits, styles, colors..."
            className="flex-1 w-full bg-transparent text-gray-300 placeholder-gray-500 text-sm py-2.5 outline-none"
          />

          <button
            className="bg-rose-500 hover:bg-rose-600 text-white text-sm py-1.5 px-3 rounded-lg transition-colors ml-2"
            onClick={() => { setFilteredPhotos([]); setQuery(""); }}
          >
            Clear
          </button>
        </div>

        {/* <div className="flex flex-wrap gap-2 justify-end md:flex-none">
          {FILTERS.map((f) => (
            <Chips
              key={f}
              label={f}
              active={activeFilter === f}
              onClick={() => setActiveFilter(f)}
            />
          ))}
        </div> */}
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-3 gap-4">
        {query.length>0 ? filteredPhotos.length > 0 ? (
          filteredPhotos.map((photo) => (
            <Cards
              key={photo.id}
              id={photo.id}
              url={photo.urls.small}
              title={photo.alt_description}
              photo={photo}
              saved={likedPhotos?.some(p => p.id === photo.id)}
              onClick={() => setSelectedPhoto(photo)}
              onPhotoSaved={handlePhotoSaved}
            />))
        ):(
          <p className="text-center text-gray-500 text-sm py-6">No results found for "{query}"</p>
        ) :
          photos.map((photo) => (
            <Cards
              key={photo.id}
              id={photo.id}
              url={photo.urls.small}
              title={photo.alt_description}
              photo={photo}
              saved={likedPhotos?.some(p => p.id === photo.id)}
              onClick={() => setSelectedPhoto(photo)}
              onPhotoSaved={handlePhotoSaved}
            />)
          )
        }




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