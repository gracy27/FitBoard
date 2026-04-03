import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../api/firebase";

export const signup = async (email, password, displayName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    
    await updateProfile(userCredential.user, { displayName });
    console.log("User:", userCredential.user);
    
    const uid = userCredential.user.uid;
    localStorage.setItem("uid", uid)
    const userEmail = userCredential.user.email;
    localStorage.setItem("userEmail", userEmail)
    const userName = userCredential.user.displayName;
    localStorage.setItem("userName", userName)
  } catch (error) {
    console.error(error.message);
  }
};