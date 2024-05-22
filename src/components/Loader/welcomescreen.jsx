import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {keyframes} from '@emotion/react';

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const fadeOut = keyframes`
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
`;

function FullScreenWelcome({username, onExit}) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(false), 3000); // Show for 3 seconds
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!visible) {
            const timer = setTimeout(() => onExit(), 500); // Match fade-out duration
            return () => clearTimeout(timer);
        }
    }, [visible, onExit]);

    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'linear-gradient(135deg, #4e54c8 10%, #8f94fb 90%)',
                color: 'white',
                zIndex: 9999,
                animation: `${visible ? fadeIn : fadeOut} 0.5s ease-in-out`,
                opacity: visible ? 1 : 0,
            }}
        >
            <Typography variant="h2" component="h1" sx={{
                fontFamily: 'Arial, sans-serif',
                fontSize: '2rem',
                color: 'white',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                textAlign: 'center'
            }}>
                Welcome, {username}!
            </Typography>
        </Box>
    );
}

export default FullScreenWelcome;
