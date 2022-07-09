import { Paper } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Container } from '@mui/system';
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInvitationsAcceptedAsync, getInvitationsDeclinedAsync, getInvitationsPendingAsync } from '../redux/invitations/thunks';
import InvitationCard from './InvitationCard';
import ToolBar from './ToolBar';

export default function Meetups() {
    const dispatch = useDispatch();
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
    const pendingInvitations = useSelector(state => state.invitationsReducer.invitationsPending);
    const acceptedInvitations = useSelector(state => state.invitationsReducer.invitationsAccepted);
    const declinedInvitations = useSelector(state => state.invitationsReducer.invitationsDeclined);
    // const createdMeetups = useSelector(state => state.usersReducer.meetupsCreated);
    useEffect(() => {
        dispatch(getInvitationsPendingAsync(currentUser.email));
        dispatch(getInvitationsAcceptedAsync(currentUser.email));
        dispatch(getInvitationsDeclinedAsync(currentUser.email));
        // dispatch(getMeetupsCreatedAsync(currentUser.email));
    }, [dispatch, currentUser.email]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />

            <ToolBar />
            <Container component="main" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h5" variant="h5" align="center">
                        Pending Invitations ({pendingInvitations.length})
                    </Typography>
                    <Grid
                        container
                        spacing={2}
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                    >
                        {pendingInvitations.map(invitation => (
                            <InvitationCard key={invitation.id} invitation={invitation} />
                        ))}
                    </Grid>
                </Paper>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h5" variant="h5" align="center">
                        Accepted Invitations ({acceptedInvitations.length})
                    </Typography>
                    <Grid
                        container
                        spacing={2}
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                    >
                        {acceptedInvitations.map(invitation => (
                            <InvitationCard key={invitation.id} invitation={invitation} />
                        ))}
                    </Grid>
                </Paper>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h5" variant="h5" align="center">
                        Declined Invitations ({declinedInvitations.length})
                    </Typography>
                    <Grid
                        container
                        spacing={2}
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                    >
                        {declinedInvitations.map(invitation => (
                            <InvitationCard key={invitation.id} invitation={invitation} />
                        ))}
                    </Grid>
                </Paper>
            </Container>
        </ThemeProvider>
    )
}