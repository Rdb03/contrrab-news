import {Button, CardMedia, Grid, styled} from "@mui/material";
import imageNotAvailable from '../../assets/images/no-image-available.png';
import {apiURL} from "../../constants.ts";
import React from "react";

const ImageCardMedia = styled(CardMedia)({
    height: '130px',
    width: '130px',
});

interface Props {
    id: string,
    title: string,
    content: string,
    date: string,
    image: string | null,
}

const NewItem: React.FC<Props> = ({id, content, image, title, date}) => {

    let cardImage = imageNotAvailable;

    if(image) {
        cardImage = apiURL + '/' + image;
    }

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
            <p style={{fontWeight: 'bold', fontSize: '30px', margin: 0}}>{title}</p>
            <p style={{fontSize: '20px', margin: 0}}>{content}</p>
            <p style={{fontSize: '20px', margin: 0}}>{date}</p>
            <Button variant="outlined" color="error">Delete</Button>
        </Grid>
    );
};

export default NewItem;