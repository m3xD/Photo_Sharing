import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {List, Divider, Typography, Grid, Avatar, Card, CardHeader, CardMedia, CardContent} from "@mui/material";
import "./styles.css";
import models from "../../modelData/models";
import fetchModel from "../../lib/fetchModelData";

function UserPhotos() {
    const user = useParams();
    const [selectedPhotos, setPhoto] = useState();
    const [selectedUser, setUser] = useState();

    let linkToAuthor; // Link component to Author

    useEffect(() => {
        fetchModel("https://49lq8p-8081.csb.app/api/photo/photosOfUser/" + user.userId).then(
            (response) => {
                setPhoto(response.data);
            }
        )
        fetchModel("https://49lq8p-8081.csb.app/api/user/find/" + user.userId).then(
            (response) => {
                setUser(response.data);
            }
        )
    }, [user.userId]);


    if (selectedUser) {
        linkToAuthor = (
            <Link to={`/users/${selectedUser._id}`}>
                {`${selectedUser.first_name} ${selectedUser.last_name}`}
            </Link>
        );
    } else {
        linkToAuthor = <p>Loading...</p>;
    }

    const styles = {
    media: {
        width: 'auto',
        height: 'auto',
        objectFit: 'cover'
    }
};

    // If there is user photo, then display user photos
    return selectedPhotos ? (
        <Grid justifyContent="center" container spacing={3}>
            {selectedPhotos.map((photo) => (
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
                            style={styles.media}
                        />

                        <CardContent>
                            {photo.comments && (
                                <Typography variant="subtitle1">
                                    Comments:
                                    <Divider/>
                                </Typography>
                            )}
                            {/* Only when photo has comments, then display related comments */}
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
                        </CardContent>

                    </Card>
                </Grid>
            ))}
        </Grid>
    ) : (
        <div>Loading User Photos on &quot;userPhotos.jsx&quot;</div>
    );
}

export default UserPhotos;