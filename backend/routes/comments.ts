import {Router} from "express";
import fileDb from "../fileDb";
import {CommentsWithOutID} from "../type";

const commentsRouter = Router();

commentsRouter.get('/', async (req, res) => {
    const comments = await fileDb.getComments();
    res.send(comments);
});

commentsRouter.get('/:id', async (req, res) => {
    const comments = await fileDb.getComments();
    const comment = comments.find(m => m.id === req.params.id);

    if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
    }

    res.send(comment);
});

commentsRouter.delete('/:id', async (req, res) => {
    try {
        const commentItemID = req.params.id;

        const comments = await fileDb.getComments();
        const comment = comments.find(m => m.id === commentItemID);

        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        const deleteComment = await fileDb.deleteComment(comment.id);
        res.send(deleteComment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


commentsRouter.post('/',async (req, res) => {

    const { idNews, author, text } = req.body;

    if (!idNews || !text) {
        return res.status(400).json({ error: 'Comment cannot be empty' });
    }

    const newComment: CommentsWithOutID = {
        idNews: idNews,
        author: author,
        text: text,
    };

    try {
        const savedComment = await fileDb.addComment(newComment);
        res.send(savedComment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

commentsRouter.get('/', async (req, res) => {
    try {
        const { news_id } = req.query;

        if (news_id) {
            const comments = await fileDb.getCommentsByNewsId(news_id.toString());
            res.send(comments);
        } else {
            const comments = await fileDb.getComments();
            res.send(comments);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



export default commentsRouter;