// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, updateDoc, deleteDoc, doc, getDocs, getDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
  measurementId: process.env.MEASUREMENTID
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Initialize Firestore

// Create a reference to the 'Users' collection
const usersCollection = collection(db, 'Users');

// Create a reference to the 'Notes' collection
const notesCollection = collection(db, 'Notes');

// Function to add a new user to the 'Users' collection
export const addUser = async (userData) => {
    try {
        const docRef = await addDoc(usersCollection, userData);
        console.log("User added with ID: ", docRef.id);
    } catch (error) {
        console.error("Error adding user: ", error);
    }
};

// Function to add a new note to the 'Notes' collection
export const addNote = async (noteData) => {
    try {
        const docRef = await addDoc(notesCollection, noteData);
        console.log("Note added with ID: ", docRef.id);
    } catch (error) {
        console.error("Error adding note: ", error);
    }
};

// Edit an existing note
export const editNote = async (id, noteData) => {
    const noteRef = doc(db, 'Notes', id);
    try {
        await updateDoc(noteRef, noteData);
    } catch (error) {
        console.error("Error editing note: ", error);
        throw error;
    }
};

// Delete a note
export const deleteNote = async (id) => {
    const noteRef = doc(db, 'Notes', id);
    try {
        await deleteDoc(noteRef);
    } catch (error) {
        console.error("Error deleting note: ", error);
        throw error;
    }
};

// Get all notes
export const getNotes = async () => {
    try {
        const snapshot = await getDocs(notesCollection); 
        const notes = snapshot.docs.map((doc) => {
            const data = doc.data(); 

            return {
                id: doc.id, 
                ...data, 
            };
        });
        return notes; 
    } catch (error) {
        console.error("Error fetching notes:", error);
        throw new Error(error.message); 
    }
};


// Get a note by ID
export const getNoteById = async (id) => {
    const noteRef = doc(db, 'Notes', id);
    const noteSnap = await getDoc(noteRef);
    if (noteSnap.exists()) {
        return { id: noteSnap.id, ...noteSnap.data() }; 
    } else {
        throw new Error('No such note!');
    }
};