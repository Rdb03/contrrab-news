export interface INews {
    id: string;
    title: string;
    content: string;
    image: string | null;
    dateTime: string;
}

export interface INewsWithOutID {
    title: string;
    content: string;
    dateTime: string;
    image: File | null;
}

export interface IComments {
    id: string;
    idNews: string;
    author: string;
    text: string;
}

export interface ICommentsWithOutID {
    idNews: string;
    author: string;
    text: string;
}

export interface IApiNewsList {
    [key: string]: INews;
}

export interface IApiComments {
    [key: string]: IComments
}