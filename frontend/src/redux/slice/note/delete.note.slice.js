import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import { deleteNoteApi } from "../../../api/deleteNote";

export const deleteNote = createAsyncThunk("deleteNote", async (_id) => {
    const response = await deleteNoteApi(_id);
    return response.data; 
});


const NoteSlice = createSlice({
    name : "deleteNote",
    initialState : {
        isLoading : false,
        data : null,
        error : false
    },
    extraReducers: (builder) => {
        builder.addCase(deleteNote.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(deleteNote.fulfilled, (state , action) => {
            state.isLoading = false;
            state.data = action.payload;
        })
        builder.addCase(deleteNote.rejected, (state, action) => {
            state.error = true;
            console.log("error while fetching todos");
        })
    }
});

export const deleteNotes = NoteSlice.reducer;