import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery';
import Fab from '@mui/material/Fab';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
import { Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { Avatar } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

import {
    getFriendRequestsAsync, getFriendRequestsSentAsync,
    sendFriendRequestAsync, acceptFriendRequestAsync,
    declineFriendRequestAsync
} from '../../redux/users/thunks';

export default function FriendRequest() {
    // get user information 
    const currentUserEmail = useSelector(state => state.usersReducer.email);
    const friendRequestsReceived = useSelector(state => state.usersReducer.friendRequests);
    const friendRequestsSent = useSelector(state => state.usersReducer.friendRequestsSent);

    console.log("friendRequestsReceived", friendRequestsReceived)
    console.log("friendRequestsSent", friendRequestsSent)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("userEffect get friend request info")
        dispatch(getFriendRequestsAsync(currentUserEmail));
        dispatch(getFriendRequestsSentAsync(currentUserEmail));
    }, [dispatch, currentUserEmail]);

    const refresh = () => {
        dispatch(getFriendRequestsAsync(currentUserEmail));
        dispatch(getFriendRequestsSentAsync(currentUserEmail));
        navigate("/contact")
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
    const [friendEmail, setFriendEmail] = useState("")

    // TODO: Send friend request to friendEmail
    const handleSendFriendRequest = () => {
        console.log({ currentUserEmail, friendEmail })
        dispatch(sendFriendRequestAsync({ email: currentUserEmail, friendEmail }))
        navigate("/contact")
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
                    {friendRequestsSent.slice().sort((a, b) => a.username.localeCompare(b.username)).map(friend => (
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
                    {friendRequestsReceived.slice().sort((a, b) => a.username.localeCompare(b.username)).map(friend => (
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
    const navigate = useNavigate();

    const handleAcceptClick = () => {
        dispatch(acceptFriendRequestAsync({ email: userEmail, friendEmail }))
        navigate("/contact")
    }

    const handleDeclineClick = () => {
        dispatch(declineFriendRequestAsync({ email: userEmail, friendEmail }))
        navigate("/contact")
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
                    <Typography variant="h6" gutterBottom>
                        Friend Email: {friendEmail}
                    </Typography>
                </CardContent>

                {type === "request-received" ? (

                    <CardActions disableSpacing>
                        <IconButton
                            aria-label="accept-friend"
                            onClick={handleAcceptClick}
                        >
                            <CheckIcon />
                        </IconButton>
                        <IconButton
                            aria-label="decline-friend"
                            onClick={handleDeclineClick}
                        >
                            <CloseIcon />
                        </IconButton>

                    </CardActions>
                ) : null}


            </Card>
        </Box>
    )
}