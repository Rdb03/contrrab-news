export interface News {
    id: string,
    title: string,
    content: string,
    image: string | null,
}

export interface NewsWithOutID {
    title: string,
    content: string,
    image: string | null,
}

export interface Comments {
    id: string,
    idNews: string,
    author: string,
    text: string,
}

export interface CommentsWithOutID {
    idNews: string,
    author: string,
    text: string,
}