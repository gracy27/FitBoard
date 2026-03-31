import { Header } from "../components/Header"
import { Cards } from "../components/Cards"

export default function Wardrobe({ savedPhotos, setSavedPhotos }) {
  return (
    <div className="min-h-screen bg-[#141414] font-sans">
      <Header />

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white text-lg font-semibold">My Saved Looks</h2>
        <span className="text-gray-400 text-sm">{savedPhotos.length} items</span>
      </div>

      {savedPhotos.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-32 gap-3">
          
          <p className="text-gray-400 text-sm">No saved looks yet</p>
          <p className="text-gray-600 text-xs">Go to Discover and save some outfits</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {savedPhotos.map((photo) => (
            <Cards
              key={photo.id}
              id={photo.id}
              url={photo.urls.small}
              title={photo.alt_description}
              saved={true}
               onPhotoSaved={(id, isSaved) => {
              if (!isSaved) {
               setSavedPhotos((prev) => prev.filter((p) => p.id !== id))
              }
            }}
            />
          ))}
        </div>
      )}
    </div>
  )
}