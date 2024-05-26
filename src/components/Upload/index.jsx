import { Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
export default function UploadPhoto() {
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const [snackbarSeverity, setSnackbarSeverity] = React.useState('success');
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
            setSnackbarMessage('Upload successfully. Redirect you to your album');
            setSnackbarSeverity('success');
            setOpenSnackbar(true);
            setTimeout(() => {
                   navigate('/photos'+`/${localStorage.getItem('id')}`);
                }, 3000);

        }).catch((error) => {
            console.log(error);
            setSnackbarMessage('Upload failed');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        });
    };

    function handleCloseSnackbar() {
        setOpenSnackbar(false);
    }


    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography color="textSecondary">Upload Photo</Typography>
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={3000}
                    onClose={handleCloseSnackbar}
                >
                    <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{width: '100%'}}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
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
