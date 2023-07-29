import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Toolbar, Typography, IconButton, Avatar } from '@mui/material';
import { Logout } from '@mui/icons-material';
import { logout } from '../auth/authSlice';

const Layout = ({ children }) => {
    const dispatch = useDispatch();
    const { profile, loading } = useSelector((state) => state.auth);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <AppBar position="static" sx={{ height: 60, backgroundColor: '#212121' }}>
            <Toolbar sx={{ display: 'flex', alignItems: 'center', padding: '0 16px' }}>
                <Typography variant="h6" component="h1" sx={{ fontSize: 20, flexGrow: 1, color: '#ffffff' }}>
                Expense Tracker
                </Typography>
                {profile && (
                <IconButton onClick={() => dispatch(logout())} color="inherit">
                    <Logout sx={{ color: '#ffffff' }} />
                </IconButton>
                )}
            </Toolbar>
            </AppBar>
            <div>{children}</div>
        </>
    );
};

export default Layout;