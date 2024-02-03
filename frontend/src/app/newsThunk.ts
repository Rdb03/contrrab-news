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
            news = Object.values(newsResponse).map((newsItem) =>({
                ...newsItem,
                id: newsItem.id
            }));
        }

        return news;
    });

export const createNews = createAsyncThunk<void, INewsWithOutID>(
    'news/create',
    async (news) => {
        try {
            const formData = new FormData();
            formData.append('title', news.title);
            formData.append('content', news.content);

            if(news.image) {
                formData.append('image', news.image);
            }

            await axiosApi.post('/news', formData);
        } catch (error) {
            console.error('Error creating news:', error);
            throw error;
        }
    }
);


export const deleteNews = createAsyncThunk<void, string>(
    'news/delete',
    async (newsId) => {
        await axiosApi.delete(`/news/${newsId}`);
    }
);

export const fetchSingleNews = createAsyncThunk<INews, string>(
    'news/fetchSingle',
    async (newsId) => {
        try {
            const response = await axiosApi.get<INews>(`/news/${newsId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching single news:', error);
            throw error;
        }
    }
);


