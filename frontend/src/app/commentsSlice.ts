import {IComments} from "../type";
import {createSlice} from "@reduxjs/toolkit";
import {fetchComments} from "./commentsThunk.ts";
import {RootState} from "./store.ts";

interface CommentsState {
    comments: IComments[] | null;
    fetchLoading: boolean;
}

const initialState: CommentsState = {
    comments: null,
    fetchLoading: false,
};

export const commentsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder.addCase(fetchComments.pending, (state) => {
            state.fetchLoading = true;
        });
        builder.addCase(fetchComments.fulfilled, (state, action) => {
            state.comments = action.payload;
            state.fetchLoading = false;
        });
        builder.addCase(fetchComments.rejected, (state) => {
            state.fetchLoading = false;
        });
    }
});


export const selectComments = (state: RootState) => state.comments.comments;

export const commentsReducer = commentsSlice.reducer;