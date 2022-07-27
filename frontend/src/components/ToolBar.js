import Logout from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { logout } from '../redux/users/reducer';
import UserProfile from './UserProfile';
import { useEffect } from 'react';
import  { Navigate } from 'react-router-dom'

export default function ToolBar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    let currentUser = useSelector(state => state.usersReducer);

    const handleClickOpen = () => {
        setOpen(true);
        handleCloseUserMenu();
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onSignOut = () => {
        navigate("/");
        dispatch(logout());
    }

    const settings = [
        { text: 'Profile', actions: handleClickOpen, icon: <PersonIcon /> },
        { text: 'Logout', actions: onSignOut, icon: <Logout /> }
    ];

    const pages = [
        { text: 'Home', actions: () => navigate("/") },
        { text: 'Schedule New Meetup', actions: () => navigate("/meetups/new") },
        // { text: 'View Existing Meetups', actions: () => navigate("/meetups") },
        { text: 'Invitations', actions: () => navigate("/invitations") },
        { text: 'History', actions: () => navigate("/history") },
        { text: 'Contact', actions: () => navigate("/contact") },
    ];

    const [user, setUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setUser(null);
    };

    return (
        <div>
            {currentUser.username === null ? <Navigate to="/" /> :
            <AppBar
                position="sticky"
                color="default"
                sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
            >
                <Toolbar sx={{ flexWrap: 'wrap' }}>
                    <Typography variant="h6" color="inherit" noWrap align='left' sx={{ flexGrow: 1 }}>
                        free2meet
                    </Typography>
                    <Box sx={{ flexGrow: 1, flexWrap: 'wrap', display: { xs: 'flex' } }}>
                        {pages.map((page) => (
                            <MenuItem key={page.text} onClick={page.actions} >
                                <Typography textAlign="center">{page.text}</Typography>
                            </MenuItem>
                        ))}
                    </Box>
                    <Box sx={{ flexGrow: 0, m: 2 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar>{currentUser.username.charAt(0)}</Avatar>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            anchorEl={user}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(user)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting.text} onClick={setting.actions}>
                                    <ListItemIcon>
                                        {setting.icon}
                                    </ListItemIcon>
                                    <Typography textAlign="center">{setting.text}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <UserProfile open={open} handleClose={handleClose} currentUser={currentUser} />
                </Toolbar>
            </AppBar>}
        </div>
    )
}