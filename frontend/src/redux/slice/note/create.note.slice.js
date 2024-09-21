import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addNoteApi } from "../../../api/addNote";

export const addNote = createAsyncThunk("addNote", async (payload) => {
    const response = await addNoteApi(payload);
    return response.data; 
});


const NoteSlice = createSlice({
    name: "createNote",
    initialState: {
        isLoading: false,
        data: [],
        error: null,
        success : false
    },
    extraReducers: (builder) => {
        builder.addCase(addNote.pending, (state) => {
            state.isLoading = true;
            state.success = false;
        });
        builder.addCase(addNote.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data.push(action.payload);
            state.success = true;
        });
        builder.addCase(addNote.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
            state.success = false;
        });
    }
});

export const createNote = NoteSlice.reducer;