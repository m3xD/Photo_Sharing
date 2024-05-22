import {Grid, Paper} from "@mui/material";
import TopBar from "../TopBar";
import UserList from "../UserList";
import {Navigate, Route, Routes} from "react-router-dom";
import UserDetail from "../UserDetail";
import UserPhotos from "../UserPhotos";
import React from "react";

export default function Home({isLoggedIn}) {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TopBar/>
            </Grid>
            <div className="main-topbar-buffer"/>
            <Grid item sm={3}>
                <Paper className="main-grid-item">
                    <UserList/>
                </Paper>
            </Grid>
            <Grid item sm={9}>
                <Paper className="main-grid-item">
                    <Routes>
                        <Route
                            path="/users/:userId"
                            element={isLoggedIn ? <UserDetail/> : <Navigate to="/login"/>}
                        />
                        <Route
                            path="/photos/:userId"
                            element={isLoggedIn ? <UserPhotos/> : <Navigate to="/login"/>}
                        />
                        <Route
                            path="/users"
                            element={isLoggedIn ? <UserList/> : <Navigate to="/login"/>}
                        />
                    </Routes>
                </Paper>
            </Grid>
        </Grid>
    )
}