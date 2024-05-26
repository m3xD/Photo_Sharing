import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import {Avatar, Divider, List, ListItemAvatar, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {Person} from "@mui/icons-material";
import models from "../../modelData/models";
import {useEffect, useState} from "react";
import fetchModel from "../../lib/fetchModelData";
import axios from "axios";
import Login from '../Login/index'
import LoginUser from "../Login/index";
import UserDetailWrapper from "../Wrapper";


function UserList() {

    const [selected, set] = useState([]);

    async function fetchData() {
        const token = localStorage.getItem('token');
        await axios.get('http://localhost:8081/api/user/list', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            set(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }


    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <Typography variant="body1"></Typography>
            <List component="nav">
                {selected.map((element, index) => (
                    <ListItem key={index}>
                        <ListItemAvatar>
                            <Avatar>
                                <Person/>
                            </Avatar>
                        </ListItemAvatar>
                        <Link to={"/users/" + element._id}>
                            <ListItemText
                                primary={element.first_name + " " + element.last_name}
                                secondary={element.location}
                            />
                        </Link>
                        <Divider/>
                    </ListItem>))
                }
            </List>
            <Typography variant="body1"></Typography>
        </div>
    );
}


export default UserList;