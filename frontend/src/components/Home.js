import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import ToolBar from './ToolBar';
import Typography from '@mui/material/Typography';
import TimeLine from './TimeLine';
import { useDispatch, useSelector } from 'react-redux';
import { getMeetupsCreatedAsync } from '../redux/meetups/thunks';
import { useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

export default function Home() {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.usersReducer);
    const createdMeetups = useSelector(state => state.meetupsReducer.meetupsCreated);

    useEffect(() => {
        console.log(currentUser.email);
        dispatch(getMeetupsCreatedAsync(currentUser.email)).then(() => {
            console.log(createdMeetups);
        });
    }, [dispatch, currentUser.email]);
    return (
        <>
            <CssBaseline />
            <ToolBar />
            <Container component="main" sx={{ mb: 4 }}>
                {/* <Box sx={{ '& > :not(style)': { m: 1 } }} style={fabStyle}>
                    <Fab color="primary" aria-label="fresh" onClick={refresh}>
                        <AutorenewIcon />
                    </Fab>
                </Box> */}
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h5" variant="h5" align="center">
                        Meetups Created ({createdMeetups.length})
                    </Typography>
                    <Grid
                        container
                        spacing={2}
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                    >

                    </Grid>
                </Paper>
            </Container>
        </>
    )
}