import AutorenewIcon from '@mui/icons-material/Autorenew';
import DeleteIcon from '@mui/icons-material/Delete';
import GroupIcon from '@mui/icons-material/Group';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Fab from '@mui/material/Fab';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { createTheme } from '@mui/material/styles';
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
        <>
            <Box sx={{ '& > :not(style)': { m: 1 } }} style={fabStyle}>
                <Fab color="primary" aria-label="fresh" onClick={refresh}>
                    <AutorenewIcon />
                </Fab>
            </Box>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                <CardHeader
                    title={
                        <Grid container direction="row" alignItems="center" justifyContent="center" spacing={2}>
                            <Grid item>
                                Friend List
                            </Grid>
                            <Grid item>
                                <Badge badgeContent={friendList.length} color="primary">
                                    <GroupIcon />
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
                    {friendList.map(friend => (
                        <FriendCard key={friend.email} friend={friend} userEmail={currentUserEmail} state="pending" />
                    ))}
                </Grid>
            </Paper>
        </>
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
                    title={"Username: " + friend.username}
                    subheader={"Friend Email: " + friend.email}
                />

                {/* delete friend */}
                <CardActions disableSpacing>
                    <Button
                        aria-label="delete-friend"
                        onClick={handleDeleteFriend}
                        startIcon={<DeleteIcon />}
                        color="error"
                    >
                        Delete Friend
                    </Button>
                </CardActions>
            </Card>
        </Box>
    )
}