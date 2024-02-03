import {Router} from "express";
import fileDb from "../fileDb";
import {NewsWithOutID} from "../type";
import {imagesUpload} from "../multer";

const newsRouter = Router();

newsRouter.get('/', async (req, res) => {
    const news = await fileDb.getNews();

    res.send(news);
});

newsRouter.get('/:id', async (req, res) => {
    const news = await fileDb.getNews();
    const newsItem = news.find(m => m.id === req.params.id);

    if (!newsItem) {
        return res.status(404).json({ error: 'New not found' });
    }

    res.send(newsItem);
});

newsRouter.delete('/:id', async (req, res) => {
    try {
        const newsItemId = req.params.id;

        const news = await fileDb.getNews();
        const newsItem = news.find(m => m.id === newsItemId);

        if (!newsItem) {
            return res.status(404).json({ error: 'New not found' });
        }

        const deleteNew = await fileDb.deleteNew(newsItem.id);
        res.send(deleteNew);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


newsRouter.post('/', imagesUpload.single('image'), async (req, res) => {

    const { title, content} = req.body;
    const image = req.file ? req.file.filename : '';

    if (!title || !content) {
        return res.status(400).json({ error: 'New cannot be empty' });
    }

    const newItem: NewsWithOutID = {
        title: title,
        content: content,
        image: image,
    };

    try {
        const savedItem = await fileDb.addNews(newItem);
        res.send(savedItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



export default newsRouter;