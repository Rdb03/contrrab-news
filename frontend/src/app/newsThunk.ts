import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../axiosApi.ts";
import {IApiNewsList, INews, INewsWithOutID} from "../type";

export const fetchNews = createAsyncThunk<INews[]>(
    'news/fetch',
    async () => {
        const response = await axiosApi.get<IApiNewsList | null>('/news');
        const newsResponse = response.data;
        let news: INews[] = [];

        if (newsResponse) {
            news = Object.keys(newsResponse).map((id) =>({
                ...newsResponse[id],
                id
            }));
        }

        return news;
    });

export const createNews = createAsyncThunk<void, INewsWithOutID>(
    'news/create',
    async (news) => {
        const formData = new FormData();
        formData.append('title', news.title);
        formData.append('content', news.content);

        if(news.image) {
            formData.append('image', news.image);
        }

        await axiosApi.post('/news', formData);
    }
);
