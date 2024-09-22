import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, updateDoc, deleteDoc, doc, getDocs, getDoc , arrayUnion} from "firebase/firestore";
import dotenv from 'dotenv';
dotenv.config();

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
const db = getFirestore(app); 

const usersCollection = collection(db, 'Users');
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

// Get all notes and filter by email
export const getNotes = async (email) => {
    try {
        const snapshot = await getDocs(notesCollection); 
        const notes = snapshot.docs.map((doc) => {
            const data = doc.data(); 

            return {
                id: doc.id, 
                ...data, 
            };
        });

        const filteredNotes = notes.filter(note => 
            note.user && note.user.some(userObj => userObj.email === email)
        );

        return filteredNotes;
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

// Share note via email
export const shareNoteByEmail = async (noteId, newUserData) => {
    const noteRef = doc(db, 'Notes', noteId);
    try {
        await updateDoc(noteRef, {
            user: arrayUnion(newUserData) 
        });
        console.log("Note shared with new user:", newUserData);
    } catch (error) {
        console.error("Error sharing note: ", error);
        throw error;
    }
};
