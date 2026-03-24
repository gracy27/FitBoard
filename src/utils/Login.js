import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../api/firebase";

export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("Logged in:", userCredential.user);
    const idToken= userCredential.user.accessToken;
    localStorage.setItem("idtoken", idToken)
    const userEmail= userCredential.user.email;
     localStorage.setItem("userEmail", userEmail)
  } catch (error) {
    console.error(error.message);
  }
};