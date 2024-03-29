import ArchiveIcon from '@mui/icons-material/Archive';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';
import SendIcon from '@mui/icons-material/Send';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import {
    Alert, AlertTitle, Avatar, Badge, Box, Button,
    Card, CardActions, CardHeader, Collapse,
    Fab, Grid, IconButton, Paper, TextField, Typography, useMediaQuery
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    acceptFriendRequestAsync, declineFriendRequestAsync, getFriendRequestsAsync,
    getFriendRequestsSentAsync, sendFriendRequestAsync
} from '../../redux/users/thunks';
import { REQUEST_STATE } from '../../redux/utils';

export default function FriendRequest() {
    // get user information 
    const currentUserEmail = useSelector(state => state.usersReducer.email);
    const friendRequestsReceived = useSelector(state => state.usersReducer.friendRequests);
    const friendRequestsSent = useSelector(state => state.usersReducer.friendRequestsSent);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFriendRequestsAsync(currentUserEmail));
        dispatch(getFriendRequestsSentAsync(currentUserEmail));
    }, [dispatch, currentUserEmail]);

    const refresh = () => {
        dispatch(getFriendRequestsAsync(currentUserEmail));
        dispatch(getFriendRequestsSentAsync(currentUserEmail));
    }

    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode: prefersDarkMode ? 'dark' : 'light',
                },
            }),
        [prefersDarkMode],
    );

    const fabStyle = {
        bottom: theme.spacing(6),
        right: theme.spacing(6),
        position: 'fixed'
    };

    // Send Friend Request form
    const [friendEmail, setFriendEmail] = useState("");

    // Error message
    const [open, setOpen] = React.useState(true);

    const handleSendFriendRequest = () => {
        setOpen(true);
        dispatch(sendFriendRequestAsync({ email: currentUserEmail, friendEmail })).then(() => {
            refresh();
        });
    }

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ '& > :not(style)': { m: 1 } }} style={fabStyle}>
                <Fab color="primary" aria-label="fresh" onClick={refresh}>
                    <AutorenewIcon />
                </Fab>
            </Box>

            <ErrorMessage open={open} setOpen={setOpen} />

            {/* Send Friend Request */}
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                <Typography component="h5" variant="h5" align="center" gutterBottom>
                    Send Friend Request
                </Typography>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <TextField
                            required
                            id="friend-email"
                            name="friend-email"
                            label="Friend Email"
                            variant="standard"
                            defaultValue={friendEmail}
                            onChange={e => setFriendEmail(e.target.value)}
                        />
                    </Box>
                    <Button
                        variant="contained"
                        onClick={handleSendFriendRequest}
                        endIcon={<SendIcon />}
                        sx={{ m: 1 }}
                    >
                        Confirm and Send
                    </Button>
                </Grid>
            </Paper>

            {/* Request Sent */}
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                <CardHeader
                    title={
                        <Grid container direction="row" alignItems="center" justifyContent="center" spacing={2}>
                            <Grid item>
                                Friend Request Sent
                            </Grid>
                            <Grid item>
                                <Badge badgeContent={friendRequestsSent.length} color="primary">
                                    <UnarchiveIcon />
                                </Badge>
                            </Grid>
                        </Grid>
                    }
                />
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >
                    {friendRequestsSent.map(friend => (
                        <FriendCard key={friend.email} friend={friend} userEmail={currentUserEmail} type="request-sent" state="pending" />
                    ))}
                </Grid>
            </Paper>

            {/* Request Received */}
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                <CardHeader
                    title={
                        <Grid container direction="row" alignItems="center" justifyContent="center" spacing={2}>
                            <Grid item>
                                Friend Request Received
                            </Grid>
                            <Grid item>
                                <Badge badgeContent={friendRequestsReceived.length} color="primary">
                                    <ArchiveIcon />
                                </Badge>
                            </Grid>
                        </Grid>
                    }
                />
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >
                    {friendRequestsReceived.map(friend => (
                        <FriendCard key={friend.email} friend={friend} userEmail={currentUserEmail} type="request-received" state="pending" />
                    ))}
                </Grid>
            </Paper>
        </ThemeProvider>
    )
}

function ErrorMessage({ open, setOpen }) {
    // get request state
    const sendFriendRequest = useSelector(state => state.usersReducer.sendFriendRequest);
    // get error
    const usersReducerError = useSelector(state => state.usersReducer.sendFriendRequestError)

    if (sendFriendRequest === REQUEST_STATE.REJECTED) {
        return (
            <Box sx={{ width: '100%' }}>
                <Collapse in={open}>
                    <Alert
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setOpen(false);
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        severity="error"
                    >
                        <AlertTitle>Error</AlertTitle>
                        {usersReducerError?.message}
                    </Alert>
                </Collapse>
            </Box>
        )
    } else if (sendFriendRequest === REQUEST_STATE.FULFILLED) {
        return (
            <Box sx={{ width: '100%' }}>
                <Collapse in={open}>
                    <Alert
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setOpen(false);
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        severity="success"
                    >
                        <AlertTitle>Success</AlertTitle>
                        Friend request sent!
                    </Alert>
                </Collapse>
            </Box>
        )
    } else {
        return null;
    }
}

function FriendCard(props) {
    const { friend, userEmail, type } = props;
    let friendEmail = friend.email;

    const dispatch = useDispatch();

    const handleAcceptClick = () => {
        dispatch(acceptFriendRequestAsync({ email: userEmail, friendEmail }));
    }

    const handleDeclineClick = () => {
        dispatch(declineFriendRequestAsync({ email: userEmail, friendEmail }));
    }

    return (
        <Box sx={{ minWidth: 275, margin: 2 }}>
            <Card variant="outlined">
                <CardHeader
                    avatar={
                        <Avatar
                            alt={friend.username}
                            src={friend.profilePictureLink}
                        />
                    }
                    title={"Username: " + friend.username}
                    subheader={"Friend Email: " + friendEmail}
                />

                {type === "request-received" ? (
                    <CardActions disableSpacing>
                        <Button
                            aria-label="accept-friend"
                            onClick={handleAcceptClick}
                            variant="contained"
                            startIcon={<CheckIcon />}
                        >
                            Accept
                        </Button>
                        <Button
                            aria-label="decline-friend"
                            onClick={handleDeclineClick}
                            startIcon={<CloseIcon />}
                        >
                            Decline
                        </Button>
                    </CardActions>
                ) : null}
            </Card>
        </Box>
    )
}