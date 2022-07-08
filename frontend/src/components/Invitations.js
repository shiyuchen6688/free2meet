import { IconButton, Paper } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Container } from '@mui/system';
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMeetupsAcceptedAsync, getMeetupsCreatedAsync, getMeetupsDeclinedAsync, getMeetupsPendingAsync } from '../redux/users/thunks';
import InvitationCard from './InvitationCard';
import ToolBar from './ToolBar';
import Fab from '@mui/material/Fab';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";

export default function Meetups() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
    const currentUser = useSelector(state => state.usersReducer);
    const invitations = useSelector(state => state.usersReducer.meetupsPending);
    const acceptedMeetups = useSelector(state => state.usersReducer.meetupsAccepted);
    const declinedMeetups = useSelector(state => state.usersReducer.meetupsDeclined);
    // const createdMeetups = useSelector(state => state.usersReducer.meetupsCreated);
    useEffect(() => {
        dispatch(getMeetupsPendingAsync(currentUser.email));
        dispatch(getMeetupsAcceptedAsync(currentUser.email));
        dispatch(getMeetupsDeclinedAsync(currentUser.email));
        // dispatch(getMeetupsCreatedAsync(currentUser.email));
    }, [dispatch, currentUser.email]);

    const fabStyle = {
        bottom: theme.spacing(6),
        right: theme.spacing(6),
        position: 'fixed'
    };

    const refresh = () => {
        console.log('refreshing');
        dispatch(getMeetupsPendingAsync(currentUser.email));
        dispatch(getMeetupsAcceptedAsync(currentUser.email));
        dispatch(getMeetupsDeclinedAsync(currentUser.email));
        // dispatch(getMeetupsCreatedAsync(currentUser.email));
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />

            <ToolBar />
            <Container component="main" sx={{ mb: 4 }}>
                <Box sx={{ '& > :not(style)': { m: 1 } }} style={fabStyle}>
                    <Fab color="primary" aria-label="fresh" onClick={refresh}>
                        <AutorenewIcon />
                    </Fab>
                    <Fab color="secondary" aria-label="add" onClick={() => navigate("/meetups/new")}>
                        <AddIcon />
                    </Fab>
                </Box>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h5" variant="h5" align="center">
                        Pending Invitations ({invitations.length})
                    </Typography>
                    <Grid
                        container
                        spacing={2}
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                    >
                        {invitations.map(invitation => (
                            <InvitationCard key={invitation.id} invitation={invitation} />
                        ))}
                    </Grid>
                </Paper>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h5" variant="h5" align="center">
                        Accepted Invitations ({acceptedMeetups.length})
                    </Typography>
                    <Grid
                        container
                        spacing={2}
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                    >
                        {acceptedMeetups.map(invitation => (
                            <InvitationCard key={invitation.id} invitation={invitation} />
                        ))}
                    </Grid>
                </Paper>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h5" variant="h5" align="center">
                        Declined Invitations ({declinedMeetups.length})
                    </Typography>
                    <Grid
                        container
                        spacing={2}
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                    >
                        {declinedMeetups.map(invitation => (
                            <InvitationCard key={invitation.id} invitation={invitation} />
                        ))}
                    </Grid>
                </Paper>
            </Container>
        </ThemeProvider>
    )
}