import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useNavigate} from "react-router-dom";
import bcrypt from 'bcryptjs';
import axios from "axios";

const defaultTheme = createTheme();

export default function SignUp() {
    const navigate = useNavigate();
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const [snackbarSeverity, setSnackbarSeverity] = React.useState('success'); // 'success' or 'error'
    const [formData, setFormData] = React.useState({
        first_name: '',
        last_name: '',
        occupation: '',
        location: '',
        description: '',
        username: '',
        password: ''
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userToList = {...formData};
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(userToList.password, salt);
        userToList.password = hashPassword;

        await axios.post('http://localhost:8081/api/user/signup', userToList).then((res) => {
            if (res.status === 200) {
                setSnackbarMessage('Registration successful! Redirecting to login...');
                setSnackbarSeverity('success');
                setOpenSnackbar(true);
                setTimeout(() => {
                    navigate('/login');
                }, 3000); // Chờ 3 giây trước khi chuyển hướng
            } else {
                throw new Error(res);
            }
        }).catch((error) => {
            console.log(error.response.data);
            setSnackbarMessage('Registration failed. ' + error.response.data);
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        })
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData((formData) => ({...formData, [name]: value}));
    }

    const handleSignIn = () => {
        navigate('/login');
    }

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    }

    return (
        <ThemeProvider theme={defaultTheme}>
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
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="first_name"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="last_name"
                                    autoComplete="family-name"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="username"
                                    label="Username"
                                    type="username"
                                    id="username"
                                    autoComplete="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="occupation"
                                    label="Occupation"
                                    type="occupation"
                                    id="occupation"
                                    value={formData.occupation}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="location"
                                    label="Location"
                                    type="location"
                                    id="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="description"
                                    label="Description"
                                    type="description"
                                    id="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="#" variant="body2" onClick={handleSignIn}>
                                    Already have an account? Sign in
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
