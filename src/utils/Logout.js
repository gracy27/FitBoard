import { signOut } from "firebase/auth";
import { auth } from "../api/firebase";

export const logout = async () => {
  await signOut(auth);
  console.log("Logged out");
};