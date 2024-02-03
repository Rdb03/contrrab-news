import React from "react";
import {Grid} from "@mui/material";

interface Props {
    id: string,
    idNews: string,
    author: string,
    text: string,
}

const CommentItem: React.FC<Props> = ({author, text}) => {

    return (
        <Grid sx={{
            border: '3px solid black',
            borderRadius: '10px',
            padding: '8px'
        }}>
            <p>{author}</p>
            <p>{text}</p>
        </Grid>
    );
};

export default CommentItem;