import Logout from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import { AppBar, Avatar, Box, Drawer, Grid, IconButton, Link, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from "react-router-dom";
import { logout } from '../redux/users/reducer';
import UserProfile from './UserProfile';

export default function ToolBar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const [menu, setMenu] = React.useState(false);
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
        { text: 'Schedule', actions: () => navigate("/meetups/new") },
        { text: 'Invitations', actions: () => navigate("/invitations") },
        { text: 'History', actions: () => navigate("/history") },
        { text: 'Contact', actions: () => navigate("/contact") }
    ];

    const [user, setUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setUser(null);
    };

    const renderUserSettings = () => {
        return (
            <Box sx={{ flexGrow: 0, m: 2 }}>
                <Grid container justifyContent="center">
                    <Tooltip title="User settings" arrow>
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar>{currentUser.username.charAt(0)}</Avatar>
                        </IconButton>
                    </Tooltip>
                </Grid>
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
        )
    }
    return (
        <div>
            {currentUser.username === null ? <Navigate to="/" /> :
                <AppBar
                    position="sticky"
                    color="default"
                    sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
                >
                    <Toolbar sx={{ flexWrap: 'nowrap' }}>
                        <Link onClick={() => navigate("/")} color="inherit" underline="none" sx={{ flexGrow: 1 }}>
                            <Typography variant="h6" color="inherit" noWrap align='left' sx={{ flexGrow: 1 }}>
                                free2meet
                            </Typography>
                        </Link>
                        <Box sx={{ flexGrow: 1, flexWrap: 'wrap', display: { md: 'flex', xs: 'none' } }}>
                            {pages.map((page) => (
                                <MenuItem key={page.text} onClick={page.actions} >
                                    <Typography textAlign="center">{page.text}</Typography>
                                </MenuItem>
                            ))}
                        </Box>
                        <Box sx={{ flexGrow: 3, display: { md: 'none', xs: 'flex' } }}></Box>
                        <Box align='right' sx={{ flexGrow: 0, flexWrap: 'wrap', display: { md: 'none', xs: 'flex' } }}>
                            <IconButton onClick={() => setMenu(true)}>
                                <MenuIcon />
                            </IconButton>
                        </Box>
                        <Drawer
                            anchor="right"
                            open={menu}
                            onClose={() => setMenu(false)}
                        >
                            {renderUserSettings()}
                            {
                                pages.map((page) => (
                                    <ListItem key={page.text}>
                                        <ListItemButton onClick={page.actions}>
                                            <ListItemText>{page.text}</ListItemText>
                                        </ListItemButton>
                                    </ListItem>
                                ))
                            }
                        </Drawer>
                        <Box sx={{ display: { md: 'flex', xs: 'none' } }}>
                            {renderUserSettings()}
                        </Box>

                        <UserProfile open={open} handleClose={handleClose} currentUser={currentUser} />
                    </Toolbar>
                </AppBar>}
        </div>
    )
}