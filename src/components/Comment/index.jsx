import React, {useEffect, useState} from "react";
import {Button, Dialog, DialogContent, DialogContentText, TextField, DialogActions, Chip} from "@mui/material";
import axios from "axios";
import './style.css'
import {useNavigate} from "react-router-dom";

export default function DialogCmt(props) {
    const [open, setOpen] = useState(false);
    const [comment, setComment] = useState("");
    const [isSummited, setIsSummited] = useState(false);

    const handleClickOpen = () => setOpen(true);
    const handleClickClose = () => setOpen(false);
    const handleCommentChange = event => setComment(event.target.value);


    const handleCommentSubmit = async () => {
        const commentText = comment;
        setComment("");
        setOpen(false);

        await axios.post(`http://localhost:8081/api/photo/commentsOfPhoto/${props.photo_id}`, {
                comment: commentText,
                id: localStorage.getItem("id")}, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then((response) => {
            props.onCommentSubmit();
            console.log(response);
        }).catch(err => {
            console.log(err)
        });
    };


    // Rendering components
    return (
        <div className="comment-dialog">
            <Chip label="Reply" onClick={handleClickOpen}
                  style={{backgroundColor: "#abd1c6", border: "1px solid black"}}/>
            {/* onClose: when mouse click outside of the dialog box, then close the dialog */}
            <Dialog open={open} onClose={handleClickClose}>
                <DialogContent>
                    <DialogContentText>Add a comment...</DialogContentText>
                    <TextField value={comment} onChange={handleCommentChange} autoFocus multiline margin="dense"
                               fullWidth/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClickClose}>Cancel</Button>
                    <Button onClick={handleCommentSubmit}
                            style={{backgroundColor: "#f9bc60", border: "1px solid black"}}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}