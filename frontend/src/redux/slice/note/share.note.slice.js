import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { shareNoteApi } from "../../../api/shareNote";

export const shareNote = createAsyncThunk("shareNote", async ({ id, data }) => {
    const response = await shareNoteApi(id, data); 
    return response.data;
});

const NoteSlice = createSlice({
    name: "shareNote",
    initialState: {
        isLoading: false,
        data: [],
        error: null,
        success : false
    },
    extraReducers: (builder) => {
        builder.addCase(shareNote.pending, (state) => {
            state.isLoading = true;
            state.success = false;
        });
        builder.addCase(shareNote.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data.push(action.payload);
            state.success = true;
        });
        builder.addCase(shareNote.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
            state.success = false;
        });
    }
});

export const shareNotes = NoteSlice.reducer;