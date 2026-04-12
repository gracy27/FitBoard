import { Header } from "../components/Header"
import { Cards } from "../components/Cards"
import { useState, useEffect } from "react";
import { fetchlikedPhotosFromFirebase } from "../api/firebase";
import { deletePhotoFromFirebase } from "../api/firebase";
import { toast } from "react-toastify";

export default function Wardrobe({ likedPhotos, setlikedPhotos }) {
  const uid = localStorage.getItem("uid");

  const handlePhotoDelete = async (photoId) => {
    if(!photoId) return;
    try{
    const deletedDocId = likedPhotos.find(p=>p.id===photoId)
    await deletePhotoFromFirebase(uid, deletedDocId.docId);
    toast.success("Look removed from wardrobe!");

    setlikedPhotos((prev) => prev.filter((p) => p.id !== photoId))
    console.log("Photo deleted:", photoId)
    }
    catch(err){
      console.error("Error deleting photo:", err);
    }
  }

  useEffect(() => {
    console.log("Fetching photos for user:", uid);
    fetchlikedPhotosFromFirebase(uid).then((photos) => {
      setlikedPhotos(photos);
      console.log("Photos fetched from Firebase:", photos);
    })
  }, [])

  return (                                                   
    <div className="min-h-screen bg-[#141414] font-sans">   
      <Header />

      <div className="flex items-center  mb-6">
        <span className="text-white text-lg font-semibold">{`Saved Looks (${likedPhotos.length})`}</span>
        
      </div>

      {likedPhotos.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-32 gap-3">
          <p className="text-gray-400 text-sm">No saved looks yet</p>
          <p className="text-gray-600 text-xs">Go to Discover and save some outfits</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {likedPhotos.map((photo) => (
            <Cards
              key={photo.id}
              id={photo.id}
              url={photo.urls.full}
              title={photo.alt_description}
              photo={photo}
              saved={true}
              onPhotoSaved={(photoId, isSaved) => {
                if (!isSaved) {
                  handlePhotoDelete(photoId)
                }
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}