import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {
    List,
    Divider,
    Typography,
    Grid,
    Avatar,
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    CircularProgress, keyframes
} from "@mui/material";
import "./styles.css";
import models from "../../modelData/models";
import fetchModel from "../../lib/fetchModelData";
import Box from "@mui/material/Box";
import FullScreenLoader from "../Loader";
import axios from "axios";
import DialogCmt from "../Comment";

function UserPhotos() {
    const user = useParams();
    const [selectedPhotos, setPhoto] = useState();
    const [selectedUser, setUser] = useState();

    let linkToAuthor; // Link component to Author
    const style = {
        media: {
            width: '100%',
            height: 'auto',
            objectFit: 'cover'
        }
    };

    async function fetchData() {
        const token = localStorage.getItem('token');
        await axios.get('http://localhost:8081/api/photo/photosOfUser/' + user.userId, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            setPhoto(response.data);
        }).catch((error) => {
            console.log(error);
        });

        await axios.get('http://localhost:8081/api/user/find/' + user.userId, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            setUser(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        fetchData();
    }, [user.userId]);

    const handleCommentSubmit = () => {
        fetchData();
    }


    if (selectedUser) {
        linkToAuthor = (
            <Link to={`/users/${selectedUser._id}`}>
                {`${selectedUser.first_name} ${selectedUser.last_name}`}
            </Link>
        );
    } else {
        linkToAuthor = <p>Loading...</p>;
    }

    return selectedPhotos ? (
        <Grid justifyContent="center" container spacing={3}>
            {selectedPhotos.map((photo, index) => (
                <Grid item xs={6} key={photo._id}>
                    <Card variant="outlined">
                        <CardHeader
                            title={linkToAuthor}
                            subheader={photo.date_time}
                            avatar={<Avatar style={{backgroundColor: '#FF7F50'}}>A</Avatar>}
                        />
                        <CardMedia
                            component="img"
                            image={require(`../../images/${photo.file_name}`)}
                            alt="Picture of Author"
                            style={style.media}
                        />

                        <CardContent>
                            {photo.comments && (
                                <Typography variant="subtitle1">
                                    Comments:
                                    <Divider/>
                                </Typography>
                            )}
                            {photo.comments &&
                                photo.comments.map((c) => (
                                    <List key={c._id}>
                                        <Typography variant="subtitle2">
                                            <Link to={`/users/${c.user._id}`}>
                                                {`${c.user.first_name} ${c.user.last_name}`}
                                            </Link>
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            color="textSecondary"
                                            gutterBottom
                                        >
                                            {c.date_time}
                                        </Typography>
                                        <Typography variant="body1">
                                            {`"${c.comment}"`}
                                        </Typography>
                                    </List>
                                ))}
                            <DialogCmt photo_id={selectedPhotos[index]._id} onCommentSubmit = {handleCommentSubmit}></DialogCmt>
                        </CardContent>

                    </Card>
                </Grid>
            ))}
        </Grid>
    ) : (
        <FullScreenLoader loading={selectedPhotos}/>
    );
}

export default UserPhotos;