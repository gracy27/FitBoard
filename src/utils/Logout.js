import { signOut } from "firebase/auth";
import { auth } from "../api/firebase";

export const logout = async (navigate) => {
  await signOut(auth);
  localStorage.removeItem('idtoken');
  console.log("Logged out");
  navigate('/');
};