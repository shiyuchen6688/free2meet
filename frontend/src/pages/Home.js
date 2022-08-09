import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMeetupsCreatedAsync } from '../redux/meetups/thunks';
import MeetupCard from '../components/cards/MeetupCard';
import ToolBar from '../components/ToolBar';
import CardHeader from '@material-ui/core/CardHeader';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import TaskIcon from '@mui/icons-material/Task';
import { Badge, Container, CssBaseline, Grid, Paper, Typography } from '@mui/material';

export default function Home() {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.usersReducer);
    const createdMeetups = useSelector(state => state.meetupsReducer.meetupsCreated);

    useEffect(() => {
        dispatch(getMeetupsCreatedAsync(currentUser.email));
    }, [dispatch, currentUser.email]);

    let meetupsWaiting = createdMeetups.filter(meetup => meetup.state === 'PENDING');
    let meetupsCompletedResponse = createdMeetups.filter(meetup => meetup.state === 'COMPLETED');

    const refresh = () => {
        dispatch(getMeetupsCreatedAsync(currentUser.email));
    }

    return (
        <>
            <CssBaseline />
            <ToolBar />
            <Container component="main" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <CardHeader
                        title={
                            <Grid container direction="row" alignItems="center" justifyContent="center" spacing={2}>
                                <Grid item>
                                    Meetups Waiting
                                </Grid>
                                <Grid item>
                                    <Badge badgeContent={meetupsWaiting.length} color="primary">
                                        <PendingActionsIcon />
                                    </Badge>
                                </Grid>
                            </Grid>
                        }
                    />
                    <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
                        Meetups you created that are waiting for responses
                    </Typography>
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                    >
                        {meetupsWaiting.map(meetup => (
                            <MeetupCard meetup={meetup} refresh={refresh} state={"PENDING"} key={meetup.id} />
                        ))}
                    </Grid>
                </Paper>

                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <CardHeader
                        title={
                            <Grid container direction="row" alignItems="center" justifyContent="center" spacing={2}>
                                <Grid item>
                                    Meetups Completed
                                </Grid>
                                <Grid item>
                                    <Badge badgeContent={meetupsCompletedResponse.length} color="primary">
                                        <TaskIcon />
                                    </Badge>
                                </Grid>
                            </Grid>
                        }
                    />
                    <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
                        Meetups you created that stopped waiting for responses and are ready to be organized
                    </Typography>
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                    >
                        {meetupsCompletedResponse.map(meetup => (
                            <MeetupCard meetup={meetup} refresh={refresh} state={"COMPLETED"} key={meetup.id} />
                        ))}
                    </Grid>
                </Paper>
            </Container>
        </>
    )
}