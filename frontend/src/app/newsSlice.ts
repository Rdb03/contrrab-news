import {createSlice} from "@reduxjs/toolkit";
import {createNews, fetchNews} from "./newsThunk.ts";
import {INews} from "../type";
import {RootState} from "./store.ts";

interface NewsState {
    news: INews[] | null;
    fetchLoading: boolean;
    createNews: boolean;
}

const initialState: NewsState = {
    news: null,
    fetchLoading: false,
    createNews: false,
};

export const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder.addCase(fetchNews.pending, (state) => {
            state.fetchLoading = true;
        });
        builder.addCase(fetchNews.fulfilled, (state, action) => {
            state.news = action.payload;
            state.fetchLoading = false;
        });
        builder.addCase(fetchNews.rejected, (state) => {
            state.fetchLoading = false;
        });
        builder.addCase(createNews.pending, (state) => {
            state.createNews = true;
        });
        builder.addCase(createNews.fulfilled, (state) => {
            state.createNews = false;
        });
        builder.addCase(createNews.rejected, (state) => {
            state.createNews = false;
        });
    }
});

export const selectNews = (state: RootState) => state.news.news;
export const selectCreateNewsLoading = (state:RootState) => state.news.createNews;
export const newsReducer = newsSlice.reducer;