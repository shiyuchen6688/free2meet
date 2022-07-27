import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery';
import Fab from '@mui/material/Fab';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
import { Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { Avatar } from '@mui/material';

import { getFriendsAsync, deleteFriendAsync } from '../../redux/users/thunks';

export default function FriendList() {
    // get user information 
    const currentUserEmail = useSelector(state => state.usersReducer.email);
    const friendList = useSelector(state => state.usersReducer.friends);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getFriendsAsync(currentUserEmail));
    }, [dispatch, currentUserEmail]);

    const refresh = () => {
        dispatch(getFriendsAsync(currentUserEmail));
    }

    console.log(friendList)


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
                    {friendList.slice().sort((a, b) => a.username.localeCompare(b.username)).map(friend => (
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
    const navigate = useNavigate();


    // Delete friend handler
    const handleDeleteFriend = () => {
        console.log("handleDeleteFriend", userEmail)
        dispatch(deleteFriendAsync({ email: userEmail, friendEmail }))
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
                    title={friend.username}
                />

                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Friend Email: {friend.email}
                    </Typography>
                </CardContent>

                {/* delete friend */}
                <CardActions disableSpacing>

                    <IconButton
                        aria-label="delete-friend"
                        onClick={handleDeleteFriend}
                    >
                        <CloseIcon />
                    </IconButton>
                </CardActions>

            </Card>
        </Box>
    )
}