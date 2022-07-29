import AutorenewIcon from '@mui/icons-material/Autorenew';
import { Avatar, Button, Paper } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Fab from '@mui/material/Fab';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { deleteFriendAsync, getFriendsAsync } from '../../redux/users/thunks';

export default function FriendList() {
    // get user information 
    const currentUserEmail = useSelector(state => state.usersReducer.email);
    const friendList = useSelector(state => state.usersReducer.friends);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFriendsAsync(currentUserEmail));
    }, [dispatch, currentUserEmail]);

    const refresh = () => {
        dispatch(getFriendsAsync(currentUserEmail));
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

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ '& > :not(style)': { m: 1 } }} style={fabStyle}>
                <Fab color="primary" aria-label="fresh" onClick={refresh}>
                    <AutorenewIcon />
                </Fab>
            </Box>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                <Typography component="h5" variant="h5" align="center">
                    Friend List ({friendList.length})
                </Typography>
                <Grid
                    container
                    spacing={2}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >
                    {friendList.map(friend => (
                        <FriendCard key={friend.email} friend={friend} userEmail={currentUserEmail} state="pending" />
                    ))}
                </Grid>
            </Paper>
        </ThemeProvider>
    )

}

function FriendCard(props) {
    const { friend, userEmail } = props
    const friendEmail = friend.email

    const dispatch = useDispatch();

    // Delete friend handler
    const handleDeleteFriend = () => {
        dispatch(deleteFriendAsync({ email: userEmail, friendEmail }))
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
                    title={friend.username}
                />

                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Friend Email: {friend.email}
                    </Typography>
                </CardContent>

                {/* delete friend */}
                <CardActions disableSpacing>
                    <Button
                        aria-label="delete-friend"
                        onClick={handleDeleteFriend}
                    >
                        Delete Friend
                    </Button>
                </CardActions>
            </Card>
        </Box>
    )
}