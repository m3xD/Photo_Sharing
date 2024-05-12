import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

export default function TopBar() {
  const navigate = useNavigate();
  const [selected, set] = useState();
  const handleLoginClick = () => {
    navigate('/login');
  }

  useEffect(() => {

  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Photo Sharing
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Hello
          </Typography>
          <Button color="inherit" onClick = {handleLoginClick}>Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

