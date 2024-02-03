import {Button, Grid, TextField} from "@mui/material";
import React, {useRef, useState} from "react";

interface Props {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name: string,
    label: string,
}

const FileInput: React.FC<Props> = ({onChange, name, label}) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const [fileName, setFileName] = useState('');

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files && e.target.files[0]) {
            setFileName(e.target.files[0].name);
        } else {
            setFileName('');
        }

        onChange(e);
    }

    const activeInput = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    return (
        <>
            <input
                type="file"
                style={{ display: "none"}}
                ref={inputRef}
                onChange={onFileChange}
                name={name}
            />
            <Grid
                container
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Grid item xs style={{display: 'flex'}}>
                    <TextField
                        disabled
                        label={label}
                        value={fileName}
                    />
                </Grid>
                <Grid item>
                    <Button sx={{ marginLeft: "50px"}} variant="contained" onClick={activeInput}>
                        BROWSE
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default FileInput;