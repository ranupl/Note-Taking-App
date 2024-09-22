import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import { getNoteByIdApi } from "../../../api/getNote";

export const getSingleNote = createAsyncThunk("getSingleNote", async (_id) => {
    const response = await getNoteByIdApi(_id);
    return response;
});

const NoteSlice = createSlice({
    name : "singleNote",
    initialState : {
        isLoading : false,
        data : null,
        error : false
    },
    extraReducers: (builder) => {
        builder.addCase(getSingleNote.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getSingleNote.fulfilled, (state , action) => {
            state.isLoading = false;
            state.data = action.payload;
        })
        builder.addCase(getSingleNote.rejected, (state, action) => {
            state.error = true;
            console.log("error while fetching todos");
        })
    }
});

export const getNoteById = NoteSlice.reducer;