import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import { getNoteApi } from "../../../api/getAllNote";

export const fetchNotes = createAsyncThunk("fetchNotes", async (payload) => {
    const response = await getNoteApi(payload);
    return response.data; 
});

const NoteSlice = createSlice({
    name : "Notes",
    initialState : {
        isLoading : false,
        data : null,
        error : false
    },
    extraReducers: (builder) => {
        builder.addCase(fetchNotes.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(fetchNotes.fulfilled, (state , action) => {
            state.isLoading = false;
            state.data = action.payload;
        })
        builder.addCase(fetchNotes.rejected, (state, action) => {
            state.error = true;
            console.log("error while fetching todos");
        })
    }
});

export const getNote = NoteSlice.reducer;