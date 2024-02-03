import {createSlice} from "@reduxjs/toolkit";
import {createNews, deleteNews, fetchNews, fetchSingleNews} from "./newsThunk.ts";
import {INews} from "../type";
import {RootState} from "./store.ts";

interface NewsState {
    news: INews[] | null;
    newItem: INews | null;
    fetchLoading: boolean;
    createNews: boolean;
    createLoading: boolean;
    deleteLoading: boolean | string;
    fetchOneLoading: boolean;
}

const initialState: NewsState = {
    news: null,
    newItem: null,
    fetchLoading: false,
    createNews: false,
    createLoading: false,
    deleteLoading: false,
    fetchOneLoading: false,
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
        builder.addCase(deleteNews.pending, (state) => {
            state.deleteLoading = true;
        });
        builder.addCase(deleteNews.fulfilled, (state) => {
           state.deleteLoading = false;
        });
        builder.addCase(deleteNews.rejected, (state) => {
            state.deleteLoading = true;
        });
        builder.addCase(fetchSingleNews.pending, (state)=> {
            state.fetchOneLoading = true;
        });
        builder.addCase(fetchSingleNews.fulfilled, (state, action) => {
            state.newItem = action.payload;
            state.fetchOneLoading = false;
        });
        builder.addCase(fetchSingleNews.rejected, (state) => {
            state.fetchOneLoading = false;
        });
    }
});

export const selectNews = (state: RootState) => state.news.news;
export const selectNew = (state: RootState) => state.news.newItem;
export const selectCreateNewsLoading = (state:RootState) => state.news.createNews;
export const selectOneFetchLoading = (state: RootState) => state.news.fetchOneLoading;
export const newsReducer = newsSlice.reducer;