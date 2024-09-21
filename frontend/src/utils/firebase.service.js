import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
  } from "firebase/auth";
  import { firebaseAuth } from "./firebase.config";
  
  export const Create_with_Email_Password = async (email, password) => {
    let x;
    try {
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
      x = true;
    } catch (error) {
      console.log(error.message);
      x = error.message;
    }
    return x;
  };
  
  export const Login_with_Email_Password = async (email, password) => {
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      console.log(error.message);
    }
  };
  
  export const Logout = async () => {
    try {
      await signOut(firebaseAuth);
    } catch (error) {
      console.log(error.message);
    }
  };