import {useAppDispatch, useAppSelector} from "../../app/hook.ts";
import {selectNews} from "../../app/newsSlice.ts";
import {useEffect} from "react";
import {fetchNews} from "../../app/newsThunk.ts";
import {Button, Grid} from "@mui/material";
import NewItem from "../NewItem/NewItem.tsx";
import {NavLink} from "react-router-dom";

const NewsList = () => {
    const dispatch = useAppDispatch();
    const news = useAppSelector(selectNews);

    useEffect(() => {
        dispatch(fetchNews());
    }, [dispatch]);

    return (
       <>
           <Grid sx={{display: 'flex', justifyContent: 'space-between', padding: '0 20px', alignItems: 'center'}}>
               <h2 style={{fontSize: '40px'}}>Posts</h2>
               <NavLink to={'/add-news'}>
                   <Button sx={{height: '40px'}} variant="contained">Add New Post</Button>
               </NavLink>
           </Grid>
           <Grid sx={{padding: '0 70px'}} container direction="column" spacing={2}>
               {news?.length ? (
                   news.map((newItem) => (
                    <NewItem
                        key={newItem.id}
                        id={newItem.id}
                        title={newItem.title}
                        content={newItem.content}
                        date={newItem.dateTime}
                        image={newItem.image}
                    />
                   ))
               ) : (
                   <h1 style={{margin: '100px auto'}}>No news available</h1>
               )}
           </Grid>
       </>
    );
};

export default NewsList;
