// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7ml_jPLeH5PBARWRUHccYPf_KL6mLkFY",
  authDomain: "fitboard-12701.firebaseapp.com",
  projectId: "fitboard-12701",
  storageBucket: "fitboard-12701.firebasestorage.app",
  messagingSenderId: "583898818549",
  appId: "1:583898818549:web:c382d3bd3f9bfa0f34a2bc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);