import { Avatar, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getMeetupsAsync } from '../redux/meetups/thunks';
import ToolBar from './ToolBar';
import styled, { createGlobalStyle } from 'styled-components'
import ScheduleSelector from './timetable/ScheduleSelector';
import { useState } from 'react';
import { getMeetupsCreatedAsync } from '../redux/users/thunks';


export default function Meetups() {
    const dispatch = useDispatch();
    const eventsJSON = useSelector(state => state.usersReducer.list);
    const userEmail = useSelector(state => state.usersReducer.email);
    console.log(userEmail);
    useEffect(() => {
        console.log("useEffect getmeetupscreatedasync")
        dispatch(getMeetupsCreatedAsync(userEmail));
    }, []);
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

    function mapJSONToCard(eventJSON) {
        return (
            <Box sx={{ minWidth: 275, maxWidth: 600, margin: 5 }} key={eventJSON._id}>
                <Card variant="outlined">
                    <CardHeader
                        avatar={
                            <Avatar
                                alt={eventJSON.creator.username}
                                src={eventJSON.creator.profilePictureLink}
                            />
                        }
                        title={eventJSON.title}
                        subheader={eventJSON.schedule.schedule === null || eventJSON.schedule.schedule === undefined ? "NA" :
                            `${Object.keys(eventJSON.schedule.schedule).length === 0 ? 'NA' :
                                Object.keys(eventJSON.schedule.schedule)[0].split("T")[0]} - ${Object.keys(eventJSON.schedule.schedule).length === 0 ? 'NA' :
                                    Object.keys(eventJSON.schedule.schedule)[Object.keys(eventJSON.schedule.schedule).length - 1].split("T")[0]}`}
                    // subheader={`${eventJSON.startDate} ${eventJSON.startTime} - ${eventJSON.endDate} ${eventJSON.endTime}`}
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            {eventJSON.description}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={e => navigate(`/meetup/${eventJSON._id}`)}>View</Button>
                    </CardActions>
                </Card>
            </Box >
        );
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />

            <ToolBar />
            <Container component="main" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    {/* COMMENT OUT FOR NOW FOR GOOGLE MAP. DO NOT DELETE */}
                    {/* <Typography component="h1" variant="h4" align="center">
                        Past Locations
                    </Typography>
                    <Typography component="h1" variant="body1" align="center">
                        Click on the marker to see more information!
                    </Typography>
                    <div ref={mapRef} id='map' />
                    <Button variant="outlined" fullWidth sx={{ my: 1 }} onClick={fitBounds}>Display All Locations On The Map</Button> */}

                    <Typography component="h1" variant="h4" align="center">
                        Past Events
                    </Typography>
                    <Grid
                        container
                        spacing={2}
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                    >
                        {eventsJSON.map(mapJSONToCard)}
                    </Grid>
                </Paper>
            </Container>
        </ThemeProvider>
    )
}