import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateNoteApi } from "../../../api/editNote";

export const editNote = createAsyncThunk("editNote", async ({_id, formdata}) => {
    const response = await updateNoteApi(_id, formdata);
    return response.data; 
});


const NoteSlice = createSlice({
    name: "updatedNote",
    initialState: {
        isLoading: false,
        data: [],
        error: null,
        success : false
    },
    extraReducers: (builder) => {
        builder.addCase(editNote.pending, (state) => {
            state.isLoading = true;
            state.success = false;
        });
        builder.addCase(editNote.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data.push(action.payload);
            state.success = true;
        });
        builder.addCase(editNote.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
            state.success = false;
        });
    }
});

export const updateNote = NoteSlice.reducer;