import { addNote, editNote, deleteNote, getNotes, getNoteById, shareNoteByEmail } from '../config/firebase.js';

export const createNote = async (req, res) => {
    try {
        const data = req.body;
        const noteId = await addNote(data);
        return res.json({ message: "Note added", id: noteId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        await editNote(id, data);
        return res.json({ message: "Note updated" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const removeNote = async (req, res) => {
    try {
        const { id } = req.params;
        await deleteNote(id);
        return res.json({ message: "Note deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const listNotes = async (req, res) => {
    const email = req.params.email;
    try {
        const notes = await getNotes(email);
        return res.json(notes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getNote = async (req, res) => {
    try {
        const { id } = req.params;
        const note = await getNoteById(id);
        return res.json(note);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const shareNote = async (req, res) => {
    try {
        const { id } = req.params; 
        const newUserData = req.body; 

        await shareNoteByEmail(id, newUserData);
        return res.json({ message: "Note shared successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
