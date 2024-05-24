import { Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function UploadPhoto() {
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    const handleOnChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        console.log('submitting');
        const formData = new FormData();
        formData.append('images', selectedFile);
        formData.append('user_id', localStorage.getItem('id'));
        await axios.post('http://localhost:8081/api/photo/new', formData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then((response) => {
            console.log(response);
            navigate('/users'+`/${localStorage.getItem('id')}`);
        }).catch((error) => {
            console.log(error);
        });
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography color="textSecondary">Upload Photo</Typography>
            </Grid>
            <Grid item xs={4} />
            <Grid item xs={4}>
                <form onSubmit={handleOnSubmit}>
                    <input type="file" ref={fileInputRef} onChange={handleOnChange} />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        style={{ marginTop: '10px' }}
                        disabled={!selectedFile}
                    >
                        Submit
                    </Button>
                </form>
            </Grid>
            <Grid item xs={4} />
        </Grid>
    );
}
