import { signOut } from "firebase/auth";
import { auth } from "../api/firebase";
import { toast } from "react-toastify";

export const logout = async (navigate) => {
  await signOut(auth);
  toast.success("Logged out successfully!");
  localStorage.removeItem('uid');
  localStorage.removeItem('idtoken');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('userName');
  localStorage.removeItem('likedPhotos');
  console.log("Logged out");
  navigate('/');
};