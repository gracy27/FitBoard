import { signOut } from "firebase/auth";
import { auth } from "../api/firebase";

export const logout = async (navigate) => {
  await signOut(auth);
  localStorage.removeItem('uid');
  localStorage.removeItem('idtoken');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('userName');
  localStorage.removeItem('likedPhotos');
  console.log("Logged out");
  navigate('/');
};