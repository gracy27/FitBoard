// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  deleteDoc, 
  query, 
  getDocs, 
  doc 
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD7ml_jPLeH5PBARWRUHccYPf_KL6mLkFY",
  authDomain: "fitboard-12701.firebaseapp.com",
  projectId: "fitboard-12701",
  storageBucket: "fitboard-12701.firebasestorage.app",
  messagingSenderId: "583898818549",
  appId: "1:583898818549:web:c382d3bd3f9bfa0f34a2bc"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);

// SAVE a photo to Firebase
export const savePhotoToFirebase = async (userId, photo) => {
  
  try {
    const docRef = await addDoc(collection(db, "users", userId, "likedPhotos"), {
      id: photo.id,
      urls: photo.urls,
      alt_description: photo.alt_description,
      savedAt: new Date().toISOString(),
    });
    return docRef.id; // Returns document ID for deletion
  } catch (error) {
    console.error("Error saving photo:", error);
    throw error;
  }
};

// DELETE a photo from Firebase
export const deletePhotoFromFirebase = async (userId, photoDocId) => {
  try {
    await deleteDoc(doc(db, "users", userId, "likedPhotos", photoDocId));
  } catch (error) {
    console.error("Error deleting photo:", error);
    throw error;
  }
};

// FETCH all saved photos from Firebase
export const fetchlikedPhotosFromFirebase = async (userId) => {

  try {
    const q = query(collection(db, "users", userId, "likedPhotos"));
    const querySnapshot = await getDocs(q);
    const photos = [];
    querySnapshot.forEach((doc) => {
      photos.push({
        ...doc.data(),
        docId: doc.id,
      });
      console.log("Fetched photo:", photos);
    });
    return photos;
  } catch (error) {
    console.error("Error fetching photos:", error);
    throw error;
  }
};



