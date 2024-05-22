import './App.css';

import React from "react";
import {Grid, Typography, Paper} from "@mui/material";
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import Login from "./components/Login"
import SignUp from "./components/SignUp";
import Home from './components/Home'

const App = (props) => {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    return (
        <Router>
            <div>

                {isLoggedIn ? (
                    <Home isLoggedIn={isLoggedIn}/>
                ) : (<Routes>
                    <Route path="*" element={<Navigate to="/login"/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/signup" element={<SignUp/>}/>
                </Routes>)}
            </div>
        </Router>
    );
}

export default App;