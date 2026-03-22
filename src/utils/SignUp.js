import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from "../firebase"

export const signup = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("User:", userCredential.user);
  } catch (error) {
    console.error(error.message);
  }
};