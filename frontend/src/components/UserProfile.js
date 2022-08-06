import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changePasswordAsync, changeUsernameAsync, deleteUserAccountAsync } from '../redux/users/thunks';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export default function UserProfile(prop) {
    let { open, handleClose, currentUser } = prop
    const [fullScreenOpen, setFullScreenOpen] = React.useState(false);
    const [toChange, setToChange] = React.useState(null);

    let [password, setPassword] = React.useState("");
    let [newUsername, setNewUsername] = React.useState("");
    let [oldPassword, setOldPassword] = React.useState("");
    let [newPassword, setNewPassword] = React.useState("");


    const dispatch = useDispatch();
    let email = useSelector(state => state.usersReducer.email);

    const handleFullScreenClickOpen = () => {
        setFullScreenOpen(true);
    };

    const handleFullScreenClose = () => {
        setFullScreenOpen(false);
    };

    const update = () => {
        console.log("in update", email)
        console.log("in update", password)
        console.log("in update", newUsername)
        if (toChange === "username") {
            dispatch(changeUsernameAsync({ email, password, newUsername }))
        } else if (toChange === "password") {
            dispatch(changePasswordAsync({ email, oldPassword, newPassword }))
        } else {
            let curr_email = currentUser.email
            dispatch(deleteUserAccountAsync(curr_email))
        }
    }

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
        >
            <DialogTitle>{"Welcome"}</DialogTitle>


            <DialogContent>
                <DialogContentText>
                    Hello, {currentUser.username}! You can change your password or username here.
                </DialogContentText>

                <DialogContentText>
                    <Button variant="text" onClick={e => {
                        setToChange("username")
                        handleFullScreenClickOpen()
                    }}>Change Username</Button>
                </DialogContentText>

                <DialogContentText>
                    <Button variant="text" onClick={e => {
                        setToChange("password")
                        handleFullScreenClickOpen()
                    }}>Change Password</Button>
                </DialogContentText>

                <DialogContentText>
                    <Button variant="text" onClick={e => {
                        setToChange("delete-account")
                        handleFullScreenClickOpen()
                    }}>Delete Account</Button>
                </DialogContentText>
            </DialogContent>

            {/* Change Form */}
            <Dialog
                fullScreen
                open={fullScreenOpen}
                onClose={handleFullScreenClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleFullScreenClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            {"Change " + toChange}
                        </Typography>
                        <Button autoFocus type="contained" color="inherit" onClick={e => {
                            update()
                            handleFullScreenClose()
                        }} endIcon={<SendIcon />}>
                            Update
                        </Button>
                    </Toolbar>
                </AppBar>
                <DialogContent>
                    <DialogContentText>
                        {toChange === "delete-account" ? "Press Update button above if you are sure that you want to delete the account"
                            : "To change your " + toChange + ", please enter your " +
                            (toChange !== "username" ? "password" : "old password") + " and new " + toChange}
                    </DialogContentText>
                    {(toChange === "username") ? (
                        <div>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="password"
                                label="Password"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="new_usernsme"
                                label="New Username"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={newUsername}
                                onChange={e => setNewUsername(e.target.value)}
                            />
                        </div>
                    ) : ((toChange === "password") ? (
                        <div>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="old_password"
                                label="Old Password"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={oldPassword}
                                onChange={e => setOldPassword(e.target.value)}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="new_password"
                                label="New Password"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={newPassword}
                                onChange={e => setNewPassword(e.target.value)}
                            />
                        </div>
                    ) : (
                        <div></div>
                    ))
                    }

                </DialogContent>
            </Dialog>

            <DialogActions>
                <Button onClick={e => {
                    handleClose()
                }}>Close</Button>
            </DialogActions>
        </Dialog>
    )
}


