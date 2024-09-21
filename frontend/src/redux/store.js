import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slice/auth/auth.slice';
import { getNote } from "./slice/note/list.note.slice"
import { createNote } from "./slice/note/create.note.slice";
import { deleteNotes } from "./slice/note/delete.note.slice";
import { getNoteById } from "./slice/note/getbyId.node.slice";
import { updateNote } from "./slice/note/update.note.slice";

export const store = configureStore({
    reducer : {
        auth: authReducer,
        notes : getNote,
        addnote : createNote,
        deleteNote : deleteNotes,
        getNoteById : getNoteById,
        updateNote :updateNote
      
    },
    devTools : true
})