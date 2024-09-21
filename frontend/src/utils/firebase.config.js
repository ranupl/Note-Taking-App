import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
      apiKey: "AIzaSyB05CrMTH94TuxKxO-7lQMK6mpOnSDCNoI",
      authDomain: "notes-maker-c69ab.firebaseapp.com",
      projectId: "notes-maker-c69ab",
      storageBucket: "notes-maker-c69ab.appspot.com",
      messagingSenderId: "772621807239",
      appId: "1:772621807239:web:69f1e3cb9b413f68e95222",
      measurementId: "G-CWFDVKVHJ6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);