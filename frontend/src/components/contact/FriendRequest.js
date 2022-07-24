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

import {
    getFriendRequestsAsync, getFriendRequestsSentAsync,
    sendFriendRequestAsync
} from '../../redux/users/thunks';

export default function FriendRequest() {
    // get user information 
    const currentUserEmail = useSelector(state => state.usersReducer.email);
    const friendsRequestsReceived = useSelector(state => state.usersReducer.friendsRequests);
    const friendsRequestsSent = useSelector(state => state.usersReducer.friendsRequestsSent);

    console.log("friendsRequestsReceived", friendsRequestsReceived)
    console.log("friendsRequestsSent", friendsRequestsSent)

    const dispatch = useDispatch();
    const navigate = useNavigate();

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
    const [friendEmail, setFriendEmail] = useState("")

    // TODO: Send friend request to friendEmail
    const handleSendFriendRequest = () => {
        dispatch(sendFriendRequestAsync({ currentUserEmail, friendEmail }))
        navigate("/contact")
    }




    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ '& > :not(style)': { m: 1 } }} style={fabStyle}>
                <Fab color="primary" aria-label="fresh" onClick={refresh}>
                    <AutorenewIcon />
                </Fab>
                <Fab color="secondary" aria-label="add" onClick={() => navigate("/contact")}>
                    <AddIcon />
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
                        fullWidth
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
                    Friend Request Sent ({friendsRequestsSent.length})
                </Typography>
                <Grid
                    container
                    spacing={2}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >
                    {friendsRequestsSent.map(friend => (
                        <FriendCard key={friend.email} friend={friend} userEmail={currentUserEmail} state="pending" />
                    ))}
                </Grid>
            </Paper>

            {/* Request Received */}
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                <Typography component="h5" variant="h5" align="center">
                    Friend Request Received ({friendsRequestsReceived.length})
                </Typography>
                <Grid
                    container
                    spacing={2}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >
                    {friendsRequestsReceived.map(friend => (
                        <FriendCard key={friend.email} friend={friend} userEmail={currentUserEmail} state="pending" />
                    ))}
                </Grid>
            </Paper>




        </ThemeProvider>
    )

}

function FriendCard(props) {
    const { friend, userEmail } = props
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
                    title={friend.username}
                />

                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Friend Email: {friend.email}
                    </Typography>
                </CardContent>


            </Card>
        </Box>
    )
}