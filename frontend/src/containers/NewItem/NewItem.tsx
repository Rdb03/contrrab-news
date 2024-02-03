import {Button, CardMedia, Grid, styled} from "@mui/material";
import imageNotAvailable from '../../assets/images/no-image-available.png';
import {apiURL} from "../../constants.ts";
import React from "react";
import {useAppDispatch} from "../../app/hook.ts";
import {deleteNews, fetchNews} from "../../app/newsThunk.ts";
import {NavLink} from "react-router-dom";

const ImageCardMedia = styled(CardMedia)({
    height: '130px',
    width: '130px',
});

interface Props {
    id: string,
    title: string,
    date: string,
    image: string | null,
}

const NewItem: React.FC<Props> = ({ id, image, title, date }) => {
    const dispatch = useAppDispatch();

    let cardImage = imageNotAvailable;

    if (image) {
        cardImage = apiURL + '/' + image;
    }

    const handleDelete = async (id: string) => {
        await dispatch(deleteNews(id));
        await dispatch(fetchNews());
    };

    return (
        <Grid sx={{
            display: 'flex',
            border: '1px solid grey',
            marginTop: '100px',
            justifyContent: 'space-between',
            padding: '20px',
            borderRadius: '7px',
            alignItems: 'center',
            boxSizing: 'border-box',
        }} item xs key={id}>
            <ImageCardMedia image={cardImage} title={title}/>
            <p style={{ fontWeight: 'bold', fontSize: '30px', margin: 0 }}>{title}</p>
            <p style={{ fontSize: '20px', margin: 0 }}>{date}</p>
            <Button variant="outlined" color="error" onClick={() => handleDelete(id)}>Delete</Button>
            <NavLink to={`/full-post/${id}`}>
                <Button variant="outlined">Read Full Post</Button>
            </NavLink>
        </Grid>
    );
};

export default NewItem;