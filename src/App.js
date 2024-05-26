import './App.css';
import React, {useEffect, useState} from "react";
import {Grid, Paper} from "@mui/material";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import PrivateRoute from "./components/PrivateRoute";
import UploadPhoto from "./components/Upload";

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const token = localStorage.getItem('token');
    const [isReload, setIsReload] = useState(false);
    useEffect(() => {
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
        console.log(localStorage.getItem('token'));
    }, [token]);


    return (
        <Router>
            <div>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TopBar isLoggedIn={isLoggedIn}/>
                    </Grid>
                    <div className="main-topbar-buffer"/>
                    <Grid item sm={3}>
                        <Paper className="main-grid-item">
                            {isLoggedIn ? <UserList/> : ""}
                        </Paper>
                    </Grid>
                    <Grid item sm={9}>
                        <Paper className="main-grid-item">
                            <Routes>
                                <Route element={<PrivateRoute/>}>
                                    <Route path="/users/:userId" element={<UserDetail/>}/>
                                    <Route path="/photos/:userId" element={<UserPhotos/>}/>
                                    <Route path="/users" element={<UserList/>}/>
                                    <Route path="/upload" element={<UploadPhoto/>}/>
                                </Route>
                                <Route path="/login" element={<Login/>}/>
                                <Route path="/signup" element={<SignUp/>}/>
                            </Routes>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </Router>
    );
};

export default App;
