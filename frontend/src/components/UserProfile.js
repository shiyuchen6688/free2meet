import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import { changePasswordAsync, changeUsernameAsync } from '../redux/users/thunks';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const FullScreenTransition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
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
        if (toChange == "username") {
            dispatch(changeUsernameAsync({ email, password, newUsername }))
        } else if (toChange == "password") {
            dispatch(changePasswordAsync({ email, oldPassword, newPassword }))
        }
    }

    // errors
    let error = useSelector(state => state.usersReducer.error)
    // console.log(error)


    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
        >
            <DialogTitle>{"Welcome"}</DialogTitle>

            {error && (
                <DialogContentText>
                    <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        {error.message} — <strong>request failed, please retry!</strong>
                    </Alert>
                </DialogContentText>
            )}

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
            </DialogContent>

            {/* <ChangeForm toChange={toChange} open={fullScreenOpen} handleClose={handleFullScreenClose}
                password={password} newUsername={newUsername} oldPassword={oldPassword} newPassword={newPassword}
                setPassword={setPassword} setNewUsername={setNewUsername} setOldPassword={setOldPassword} setNewPassword={setNewPassword}
            /> */}
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
                        {"To change your " + toChange + ", please enter your " +
                            (toChange == "username" ? "password" : "old password") + " and new " + toChange}
                    </DialogContentText>
                    {toChange == "username" ? (
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
                    ) : (
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
                    )}

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


// function ChangeForm(prop) {
//     let { toChange, open, handleClose, password, newUsername, oldPassword, newPassword,
//         setPassword, setNewUsername, setOldPassword, setNewPassword } = prop


//     return (
//         <Dialog
//             fullScreen
//             open={open}
//             onClose={handleClose}
//             TransitionComponent={Transition}
//         >
//             <AppBar sx={{ position: 'relative' }}>
//                 <Toolbar>
//                     <IconButton
//                         edge="start"
//                         color="inherit"
//                         onClick={handleClose}
//                         aria-label="close"
//                     >
//                         <CloseIcon />
//                     </IconButton>
//                     <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
//                         {"Change " + toChange}
//                     </Typography>
//                     <Button autoFocus type="contained" onClick={handleClose} endIcon={<SendIcon />}>
//                         Update
//                     </Button>
//                 </Toolbar>
//             </AppBar>
//             <DialogContent>
//                 <DialogContentText>
//                     {"To change your " + toChange + ", please enter your " +
//                         (toChange == "email" ? "password" : "old password") + " and new " + toChange}
//                 </DialogContentText>
//                 {toChange == "email" ? (
//                     <div>
//                         <TextField
//                             autoFocus
//                             margin="dense"
//                             id="password"
//                             label="Password"
//                             type="text"
//                             fullWidth
//                             variant="standard"
//                             value={password}
//                             onChange={e => setPassword(e.target.value)}
//                         />
//                         <TextField
//                             autoFocus
//                             margin="dense"
//                             id="new_email"
//                             label="New Email Address"
//                             type="email"
//                             fullWidth
//                             variant="standard"
//                             value={newUsername}
//                             onChange={e => setnewUsername(e.target.value)}
//                         />
//                     </div>
//                 ) : (
//                     <div>
//                         <TextField
//                             autoFocus
//                             margin="dense"
//                             id="old_password"
//                             label="Old Password"
//                             type="text"
//                             fullWidth
//                             variant="standard"
//                             value={oldPassword}
//                             onChange={e => setOldPassword(e.target.value)}
//                         />
//                         <TextField
//                             autoFocus
//                             margin="dense"
//                             id="new_password"
//                             label="New Password"
//                             type="text"
//                             fullWidth
//                             variant="standard"
//                             value={newPassword}
//                             onChange={e => setNewPassword(e.target.value)}
//                         />
//                     </div>
//                 )}

//             </DialogContent>


//         </Dialog>
//     )
// }
