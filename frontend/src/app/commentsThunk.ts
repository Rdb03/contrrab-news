import {createAsyncThunk} from "@reduxjs/toolkit";
import {IApiComments, IComments} from "../type";
import axios from "axios";

export const fetchComments = createAsyncThunk<IComments[]>(
    'comments/fetch',
    async (newsId: string) => {
        try {
            const response = await axios.get<IApiComments | null>(`/comments?news_id=${newsId}`);
            const commentsResponse = response.data;
            let comments: IComments[] = [];

            if (commentsResponse) {
                comments = Object.values(commentsResponse).map((commentsItem) =>({
                    ...commentsItem,
                    id: commentsItem.id
                }));
            }

            return comments;
        } catch (error) {
            console.error('Error fetching single news:', error);
            throw error;
        }
    }
);
