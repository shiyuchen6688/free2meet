import CardHeader from '@material-ui/core/CardHeader';
import AddIcon from '@mui/icons-material/Add';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import RsvpIcon from '@mui/icons-material/Rsvp';
import { Badge, Box, CssBaseline, Fab, Grid, Paper, useMediaQuery } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container } from '@mui/system';
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import InvitationCard from '../components/cards/InvitationCard';
import ToolBar from '../components/ToolBar';
import { getInvitationsAcceptedAsync, getInvitationsDeclinedAsync, getInvitationsPendingAsync } from '../redux/invitations/thunks';

export default function Invitations() {
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
    const pendingInvitations = useSelector(state => state.invitationsReducer.invitationsPending);
    const acceptedInvitations = useSelector(state => state.invitationsReducer.invitationsAccepted);
    const declinedInvitations = useSelector(state => state.invitationsReducer.invitationsDeclined);
    useEffect(() => {
        dispatch(getInvitationsPendingAsync(currentUser.email));
        dispatch(getInvitationsAcceptedAsync(currentUser.email));
        dispatch(getInvitationsDeclinedAsync(currentUser.email));
    }, [dispatch, currentUser.email]);

    const fabStyle = {
        bottom: theme.spacing(6),
        right: theme.spacing(6),
        position: 'fixed'
    };

    const refresh = () => {
        dispatch(getInvitationsPendingAsync(currentUser.email));
        dispatch(getInvitationsAcceptedAsync(currentUser.email));
        dispatch(getInvitationsDeclinedAsync(currentUser.email));
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
                    <Fab color="secondary" aria-label="add" onClick={() => navigate("/schedule")}>
                        <AddIcon />
                    </Fab>
                </Box>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <CardHeader
                        title={
                            <Grid container direction="row" alignItems="center" justifyContent="center" spacing={2}>
                                <Grid item>
                                    Pending Invitations
                                </Grid>
                                <Grid item>
                                    <Badge badgeContent={pendingInvitations.length} color="primary">
                                        <RsvpIcon />
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
                        {pendingInvitations.map(invitation => (
                            <InvitationCard key={invitation.id} invitation={invitation} userEmail={currentUser.email} state="pending" />
                        ))}
                    </Grid>
                </Paper>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <CardHeader
                        title={
                            <Grid container direction="row" alignItems="center" justifyContent="center" spacing={2}>
                                <Grid item>
                                    Accepted Invitations
                                </Grid>
                                <Grid item>
                                    <Badge badgeContent={acceptedInvitations.length} color="primary">
                                        <EventAvailableIcon />
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
                        {acceptedInvitations.map(invitation => (
                            <InvitationCard key={invitation.id} invitation={invitation} userEmail={currentUser.email} state="accepted" />
                        ))}
                    </Grid>
                </Paper>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <CardHeader
                        title={
                            <Grid container direction="row" alignItems="center" justifyContent="center" spacing={2}>
                                <Grid item>
                                    Declined Invitations
                                </Grid>
                                <Grid item>
                                    <Badge badgeContent={declinedInvitations.length} color="primary">
                                        <EventBusyIcon />
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
                        {declinedInvitations.map(invitation => (
                            <InvitationCard key={invitation.id} invitation={invitation} userEmail={currentUser.email} state="declined" />
                        ))}
                    </Grid>
                </Paper>
            </Container>
        </ThemeProvider>
    )
}