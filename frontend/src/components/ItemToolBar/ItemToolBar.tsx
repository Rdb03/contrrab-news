import {Grid} from "@mui/material";
import {NavLink} from "react-router-dom";

const ItemToolBar = () => {
    return (
        <Grid sx={{
            borderBottom:'2px solid black',
            padding: '10px 50px',
        }}>
            <NavLink style={{color: 'black', textDecoration: 'none'}} to={'/'}>
                <h1 style={{fontSize: '40px'}}>News</h1>
            </NavLink>
        </Grid>
    );
};

export default ItemToolBar;