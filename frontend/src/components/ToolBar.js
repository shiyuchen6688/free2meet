import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Slide from '@mui/material/Slide';
import { useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { logout } from '../redux/users/reducer';
import UserProfile from './UserProfile';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export default function ToolBar() {
    const theme = useTheme();
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
        { text: 'Profile', actions: handleClickOpen },
        { text: 'Logout', actions: onSignOut }
    ];

    const pages = [
        { text: 'Home', actions: () => navigate("/") },
        { text: 'Schedule New Meetup', actions: () => navigate("/meetups/new") },
        { text: 'View Existing Meetups', actions: () => navigate("/meetups") },
        { text: 'View Invitations', actions: () => navigate("/invitations") },
        { text: 'View Full History', actions: () => navigate("/history") },
        { text: 'Explore', actions: () => navigate("/explore") },
    ];

    const [user, setUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setUser(null);
    };

    return (
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
                <Icon sx={{ ml: 1 }} color="inherit">
                    {theme.palette.mode === 'dark' ? <Brightness4Icon /> : <Brightness7Icon />}
                </Icon>
                <Box sx={{ flexGrow: 0, m: 2 }}>
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar alt="" src="" />
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
                                <Typography textAlign="center">{setting.text}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>

                <UserProfile open={open} handleClose={handleClose} currentUser={currentUser} />
            </Toolbar>
        </AppBar>
    )
}