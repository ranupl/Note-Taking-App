import express from 'express';
const router = express.Router();
import { createNote, listNotes, getNote, updateNote, removeNote, shareNote } from '../controller/notes.controller.js';


router.post('/createNote', createNote);
router.get("/listNotes/:email" ,listNotes );
router.get("/getNote/:id", getNote);
router.put("/editNote/:id", updateNote);
router.delete("/removeNote/:id", removeNote);
router.put("/shareNote/:id", shareNote);

export default router; 
