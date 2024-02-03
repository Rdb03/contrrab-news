import {promises as fs} from 'fs';
import {Comments, CommentsWithOutID, News, NewsWithOutID} from "./type";
import crypto from 'crypto';
import dayjs from "dayjs";

const fileName = './db.json';

const initialNews: News[] = [];
const initialComments: Comments[] = [];

let data = {
    news: initialNews,
    comments: initialComments,
};

type ItemWithID = News | Comments ;

const addItemToArray = async (array: ItemWithID[], item: NewsWithOutID | CommentsWithOutID) => {
    const id = crypto.randomUUID();
    const dateTime = dayjs().toISOString();
    const newItem = {id, dateTime, ...item};
    array.push(newItem);
    await fileDb.save();
    return newItem;
};

const deleteItemFromArray = async (array: ItemWithID[], id: string) => {
    try {
        const updatedItems = array.filter(existingItem => existingItem.id !== id);

        if (updatedItems.length === array.length) {
            console.error('Item not found');
        } else {
            if (array === data.news) {
                data.news = updatedItems as News[];
            } else if (array === data.comments) {
                data.comments = updatedItems as Comments[];
            }

            await fileDb.save();
        }

        return updatedItems;
    } catch (error) {
        console.error(error);
        throw new Error('Internal Server Error');
    }
};

const fileDb = {
    async init() {
        try {
            const fileContents = await fs.readFile(fileName);
            data = JSON.parse(fileContents.toString());
        } catch (e) {
            data = {
                news: [],
                comments: [],
            };
        }
    },
    async getNews() {
        return data.news;
    },
    async getComments() {
        return data.comments;
    },
    async addNews(item: NewsWithOutID) {
        return addItemToArray.call(this, data.news, item);
    },
    async addComment(item: CommentsWithOutID) {
        return addItemToArray.call(this, data.comments, item);
    },
    async deleteNew(id: string) {
        return deleteItemFromArray(data.news, id);
    },
    async deleteComment(id: string) {
        return deleteItemFromArray(data.comments, id);
    },
    async getNewById(id: string) {
        return data.news.find(newItem => newItem.id === id);
    },
    async save() {
        const dataToSave = {
            news: data.news,
            comments: data.comments,
        };
        return fs.writeFile(fileName, JSON.stringify(dataToSave, null, 2));
    }
};

export default fileDb;

