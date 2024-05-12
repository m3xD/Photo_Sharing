import React, {useEffect, useState} from "react";
import {Grid, Typography} from "@mui/material";

import "./styles.css";
import {Link, useParams} from "react-router-dom";
import models from "../../modelData/models";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import fetchModel from "../../lib/fetchModelData";

/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
    const {userId} = useParams();
    const [selected, set] = useState(null);


    useEffect(() => {
       fetchModel("https://49lq8p-8081.csb.app/api/user/find/" + userId).then(
           (response) => {
               set(response.data);
           }
       )
    }, [userId]);

    return (
        selected ? (
            <Grid container>
                <Grid item xs={12}>
                    <Typography color="textSecondary">Name:</Typography>
                    <Typography variant="h6" gutterBottom>
                        {`${selected.first_name} ${selected.last_name}`}
                    </Typography>
                    <Typography color="textSecondary">Description:</Typography>
                    <Typography variant="h6" gutterBottom>
                        {`${selected.description}`}
                    </Typography>
                    <Typography color="textSecondary">Location:</Typography>
                    <Typography variant="h6" gutterBottom>
                        {`${selected.location}`}
                    </Typography>
                    <Typography color="textSecondary">Occupation:</Typography>
                    <Typography variant="h6" gutterBottom>
                        {`${selected.occupation}`}
                    </Typography>
                </Grid>
                <Grid item xs={4}/>
                <Grid item xs={4}>
                    <Button
                        size="large"
                        to={selected && `/photos/${selected._id}`}
                        component={Link}
                        variant="contained"
                        color="primary"
                    >
                        See Photos
                    </Button>
                </Grid>
                <Grid item xs={4}/>
            </Grid>
        ) : (<Box sx={{minWidth: 300}}>Loading...</Box>))

}

export default UserDetail;
