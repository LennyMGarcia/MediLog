import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface IBanner {
    message: string; 
    status: string | number;
    isOpen: boolean;
    onClose: () => void; // Agrega una función onClose
}

export default function BannerSnackbar({ message, status, isOpen, onClose }: IBanner) {
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return; 
        }
        onClose(); 
    };

    return (
        <div>
            <Snackbar open={isOpen} autoHideDuration={5000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {`${status}: ${message}`}
                </Alert>
            </Snackbar>
        </div>
    );
}
