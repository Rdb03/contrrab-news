import {useAppDispatch, useAppSelector} from "../../app/hook.ts";
import {selectComments} from "../../app/commentsSlice.ts";
import React, {useEffect} from "react";
import {fetchComments} from "../../app/commentsThunk.ts";
import {Grid} from "@mui/material";
import CommentItem from "../CommentItem/CommentItem.tsx";

interface Props {
    newsId: string,
}

const Comments: React.FC<Props> = ({ newsId }) => {
    const dispatch = useAppDispatch();
    const comments = useAppSelector(selectComments);
    useEffect(() => {
        dispatch(fetchComments(newsId));
    }, [dispatch, newsId]);

    console.log(comments);

    return (
        <Grid sx={{ padding: '0 70px' }} container direction="column" spacing={2}>
            {comments?.length ? (
                comments.map((comment) => (
                    <CommentItem
                        key={comment.id}
                        id={comment.id}
                        author={comment.author}
                        text={comment.text}
                        idNews={comment.idNews}
                    />
                ))
            ) : (
                <h1 style={{ margin: '100px auto' }}>No comments available</h1>
            )}
        </Grid>
    );
};


export default Comments;