import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

export default function TopBar( {isLoggedIn} ) {
    const navigate = useNavigate();
    const name = localStorage.getItem('username')
    const handleLogoutClick = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('userID')
        console.log(localStorage.getItem('userID'));
        navigate('/login');
        window.location.reload();
    }

    const handleUploadClick = () => {
        navigate('/upload');
    }

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Photo Sharing
                    </Typography>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        {name === null ? 'Hello, guest' : 'Hello, ' + name}
                    </Typography>
                    {isLoggedIn ? <Button color="inherit" onClick={handleUploadClick}>Upload Photo</Button> : null}
                    {isLoggedIn ? <Button color="inherit" onClick={handleLogoutClick}>Logout</Button> : null}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

