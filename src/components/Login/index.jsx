import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import FullScreenWelcome from "../Loader/welcomescreen";


// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();


export default function LoginUser(props) {
    const navigate = useNavigate();
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const [snackbarSeverity, setSnackbarSeverity] = React.useState('success'); // 'success' or 'error'
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [username, setUsername] = React.useState('');
    const [userID, setUserID] = React.useState('');
    const [formData, setFormData] = useState({'loginname': '', 'password': ''});

    const handleSingUp = () => {
        navigate('/signup');
    }

    const handleExitWelcome = () => {
        navigate('/users/' + userID);
        window.location.reload();
        setIsLoggedIn(false);
    }

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    }

    const handleOnChange = (event) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const name = formData.loginname;
        axios.post('http://localhost:8081/api/user/login', {
            username: formData.loginname,
            password: formData.password,
        }).then(function (response) {
            // navigate('...');
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                setUserID(response.data.id)
                localStorage.setItem("username", name);
                localStorage.setItem("id", response.data.id);
                setIsLoggedIn(true);
                setOpenSnackbar(true);
                setSnackbarMessage('Login successfully');
                setSnackbarSeverity('success');
                setUsername(name);

            }
        }).catch(function (error) {
            setOpenSnackbar(true);
            setSnackbarMessage('Failed to login. ' + error.response.data);
            console.log(error.response);
            setSnackbarSeverity('error');
        });
    };


    return (
        <ThemeProvider theme={defaultTheme}>
            {isLoggedIn && <FullScreenWelcome username={username} onExit={handleExitWelcome}/>}
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="loginName"
                            label="User name"
                            name="loginname"
                            type="text"
                            value={formData.username}
                            onChange={handleOnChange}
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={formData.password}
                            onChange={handleOnChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href="#" variant="body2" onClick={handleSingUp}>
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={3000}
                    onClose={handleCloseSnackbar}
                >
                    <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{width: '100%'}}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </Container>
        </ThemeProvider>
    );
}