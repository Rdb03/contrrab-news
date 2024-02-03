import {useAppDispatch, useAppSelector} from '../../app/hook.ts';
import {useParams} from 'react-router-dom';
import {selectNew, selectOneFetchLoading} from '../../app/newsSlice.ts';
import {useEffect} from 'react';
import {fetchSingleNews} from '../../app/newsThunk.ts';
import Comments from "../Comments/Comments.tsx";

const FullPost = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const newItem = useAppSelector(selectNew);
    const fetchLoading = useAppSelector(selectOneFetchLoading);

    useEffect(() => {
        if (id) {
            dispatch(fetchSingleNews(id));
        }
    }, [fetchSingleNews, id]);

    if (fetchLoading) {
        return <p>Loading...</p>;
    }

    if (!newItem) {
        return <p>News item not found</p>;
    }

    return (
        <div>
            <div>
                <p style={{fontSize: '50px', margin: '20px 0'}}>{newItem.title}</p>
                <p style={{fontSize: '20px', margin: '0', color: 'grey'}}>{newItem.dateTime}</p>
                <p style={{fontSize: '30px'}}>{newItem.content}</p>
            </div>
            <div>
                <Comments newsId={id}/>
            </div>
        </div>

    );
};

export default FullPost;
