import { createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import {auth} from "../api/firebase";

export const signup = async (email, password, displayName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
   );
    
    await updateProfile( userCredential.user, { displayName });
    console.log("User:", userCredential.user);
  } catch (error) {
    console.error(error.message);
  }
};