import AutorenewIcon from '@mui/icons-material/Autorenew';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Fab from '@mui/material/Fab';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    acceptFriendRequestAsync,
    declineFriendRequestAsync, getFriendRequestsAsync, getFriendRequestsSentAsync,
    sendFriendRequestAsync
} from '../../redux/users/thunks';

export default function FriendRequest() {
    // get user information 
    const currentUserEmail = useSelector(state => state.usersReducer.email);
    const friendRequestsReceived = useSelector(state => state.usersReducer.friendRequests);
    const friendRequestsSent = useSelector(state => state.usersReducer.friendRequestsSent);

    console.log("friendRequestsReceived", friendRequestsReceived)
    console.log("friendRequestsSent", friendRequestsSent)

    const dispatch = useDispatch();

    useEffect(() => {
        console.log("userEffect get friend request info")
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

    // TODO: Send friend request to friendEmail
    const handleSendFriendRequest = () => {
        console.log({ currentUserEmail, friendEmail })
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

            {/* Send Friend Request */}
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                <Typography component="h5" variant="h5" align="center">
                    Send Friend Request
                </Typography>
                <Grid
                    container
                    spacing={2}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >
                    <TextField
                        required
                        id="friend-email"
                        name="friend-email"
                        label="Friend Email"
                        variant="standard"
                        defaultValue={friendEmail}
                        onChange={e => setFriendEmail(e.target.value)}
                    />

                    <Button
                        variant="contained"
                        onClick={handleSendFriendRequest}
                        sx={{ mt: 3, ml: 1 }}
                    >
                        Confirm and Send
                    </Button>
                </Grid>
            </Paper>

            {/* Request Sent */}
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                <Typography component="h5" variant="h5" align="center">
                    Friend Request Sent ({friendRequestsSent.length})
                </Typography>
                <Grid
                    container
                    spacing={2}
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
                <Typography component="h5" variant="h5" align="center">
                    Friend Request Received ({friendRequestsReceived.length})
                </Typography>
                <Grid
                    container
                    spacing={2}
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

function FriendCard(props) {
    const { friend, userEmail, type } = props
    let friendEmail = friend.email

    const dispatch = useDispatch();

    const handleAcceptClick = () => {
        dispatch(acceptFriendRequestAsync({ email: userEmail, friendEmail }))
    }

    const handleDeclineClick = () => {
        dispatch(declineFriendRequestAsync({ email: userEmail, friendEmail }))
    }

    return (
        <Box sx={{ minWidth: 275, margin: 5 }}>
            <Card variant="outlined">
                <CardHeader
                    avatar={
                        <Avatar
                            alt={friend.username}
                            src={friend.profilePictureLink}
                        />
                    }
                    title={friendEmail}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Friend Email: {friendEmail}
                    </Typography>
                </CardContent>
                {type === "request-received" ? (
                    <CardActions disableSpacing>
                        <ButtonGroup variant="text" color="primary" aria-label="contained primary button group">
                            <Button
                                aria-label="accept-friend"
                                onClick={handleAcceptClick}
                                variant="contained"
                            >
                                Accept
                            </Button>
                            <Button
                                aria-label="decline-friend"
                                onClick={handleDeclineClick}
                            >
                                Decline
                            </Button>
                        </ButtonGroup>
                    </CardActions>
                ) : null}
            </Card>
        </Box>
    )
}