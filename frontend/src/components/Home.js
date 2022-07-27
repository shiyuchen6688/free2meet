import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMeetupsCreatedAsync } from '../redux/meetups/thunks';
import MeetupCard from './MeetupCard';
import ToolBar from './ToolBar';

export default function Home() {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.usersReducer);
    const createdMeetups = useSelector(state => state.meetupsReducer.meetupsCreated);

    useEffect(() => {
        dispatch(getMeetupsCreatedAsync(currentUser.email));
    }, [dispatch, currentUser.email]);

    let meetupsWaiting = createdMeetups.filter(meetup => meetup.state === 'PENDING');
    let meetupsCompletedResponse = createdMeetups.filter(meetup => meetup.state === 'COMPLETED');
    // let meetupsDone = createdMeetups.filter(meetup => meetup.state === 'DONE');

    const refresh = () => {
        dispatch(getMeetupsCreatedAsync(currentUser.email));
    }

    return (
        <>
            <CssBaseline />
            <ToolBar />
            <Container component="main" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h5" variant="h5" align="center">
                        Meetups Waiting For Response ({meetupsWaiting.length})
                    </Typography>

                    {meetupsWaiting.map(meetup => (
                        <MeetupCard meetup={meetup} refresh={refresh} state={"PENDING"} key={meetup.id} />
                    ))}

                </Paper>

                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h5" variant="h5" align="center">
                        Meetups Completed Response ({meetupsCompletedResponse.length})
                    </Typography>

                    {meetupsCompletedResponse.map(meetup => (
                        <MeetupCard meetup={meetup} refresh={refresh} state={"COMPLETED"} key={meetup.id} />
                    ))}

                </Paper>
                {/* <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h5" variant="h5" align="center">
                        Meetups Done ({meetupsDone.length})
                    </Typography>

                </Paper> */}
            </Container>
        </>
    )
}