import React, {useState} from "react";
import {INewsWithOutID} from "../../type";
import {useAppDispatch, useAppSelector} from "../../app/hook.ts";
import {selectCreateNewsLoading} from "../../app/newsSlice.ts";
import {createNews, fetchNews} from "../../app/newsThunk.ts";
import {Button, CircularProgress, Grid, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";
import FileInput from "../../components/FileInput/FileInput.tsx";

const AddNew = () => {

    const [newItem, setNewItem] = useState<INewsWithOutID>({
        title: '',
        content: '',
        dateTime: '',
        image: null,
    });
    const dispatch = useAppDispatch();
    const sendLoading = useAppSelector(selectCreateNewsLoading);
    const navigate = useNavigate();

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setNewItem(prevState => {
            return {...prevState, [name]: value};
        });
    };

    const filesInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target;

        if(files) {
            setNewItem((prevState) => ({
                ...prevState,
                [name]: files[0],
            }));
        }
    };

    const onSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        await dispatch(createNews(newItem));
        await dispatch(fetchNews());
        navigate('/');
    };

    return (
        <form style={{display: "flex", flexDirection: "column", marginTop: "50px"}} onSubmit={onSubmitHandler}>
            <Grid container direction="column" spacing={2}>
                <Grid item xs>
                    <TextField
                        id="title"
                        label="Title"
                        name="title"
                        type="text"
                        value={newItem.title}
                        onChange={inputChangeHandler}
                    />
                </Grid>
                <Grid item xs>
                    <TextField
                        id="content"
                        label="Text..."
                        name="content"
                        type="text"
                        value={newItem.content}
                        onChange={inputChangeHandler}
                        required
                    />
                </Grid>
                <Grid item xs>
                    <FileInput
                        onChange={filesInputChangeHandler}
                        name="image"
                        label="Image"
                    />
                </Grid>
            </Grid>
            <Button
                sx={{
                    margin: "50px auto 0",
                    width: "200px"
                }}
                variant="contained"
                type="submit"
            >
                {!sendLoading ? 'Send' : <CircularProgress/>}
            </Button>
        </form>
    );
};

export default AddNew;