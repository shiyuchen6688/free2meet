import { Avatar, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import * as React from 'react';
import ToolBar from './ToolBar';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { getMeetupsAsync } from '../redux/meetups/thunks';

// const eventsJSON = [{title: "Party 3", 
//                     id: 3,
//                     description: "a description of party 1...", 
//                     startDate: "2022-07-03", 
//                     startTime: "12:00PM", 
//                     endDate: "2022-07-03", 
//                     endTime: "08:00PM", 
//                     host: 
//                         {
//                             userID: 1, 
//                             profilePictureLink: "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
//                         }, 
//                     attendees: [
//                         {userID: 2, profilePictureLink: "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"}, 
//                         {userID: 3, profilePictureLink: "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"}, 
//                         {userID: 4, profilePictureLink: "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"}
//                     ]},
//                     {title: "Party 2", 
//                     id: 2,
//                     description: "a description of party 2...", 
//                     startDate: "2022-07-02", 
//                     startTime: "12:01PM", 
//                     endDate: "2022-07-02", 
//                     endTime: "08:01PM", 
//                     host: 
//                         {
//                             userID: 5, 
//                             profilePictureLink: "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
//                         }, 
//                     attendees: [
//                         {userID: 6, profilePictureLink: "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"}, 
//                         {userID: 7, profilePictureLink: "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"}, 
//                         {userID: 8, profilePictureLink: "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"}
//                     ]},
//                     {title: "Party 1", 
//                     id: 1,
//                     description: "a description of party 3...", 
//                     startDate: "2022-07-01", 
//                     startTime: "12:02PM", 
//                     endDate: "2022-07-01", 
//                     endTime: "08:02PM", 
//                     host: 
//                         {
//                             userID: 9, 
//                             profilePictureLink: "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
//                         }, 
//                     attendees: [
//                         {userID: 10, profilePictureLink: "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"}, 
//                         {userID: 11, profilePictureLink: "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"}, 
//                         {userID: 12, profilePictureLink: "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"}
//                     ]},
//                 ];

const peopleJSON = [
    {
        name: "Person 1",
        userID: 1,
        profilePictureLink: "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
    },
    {
        name: "Person 2",
        userID: 2,
        profilePictureLink: "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
    },
    {
        name: "Person 3",
        userID: 3,
        profilePictureLink: "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
    },]


export default function History() {
    const dispatch = useDispatch();
    const eventsJSON = useSelector(state => state.meetupsReducer.list);
    useEffect(() => {
        dispatch(getMeetupsAsync());
    }, [dispatch]);
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
            <Box sx={{ minWidth: 275, maxWidth: 600, margin: 5 }} key={eventJSON.id}>
                <Card variant="outlined">
                    <CardHeader
                        avatar={
                            <Avatar
                                alt={eventJSON.creator.username}
                                src={eventJSON.creator.profilePictureLink}
                            />
                        }
                        title={eventJSON.title}
                        subheader={`${eventJSON.schedule.schedule.length === 0 ? 'NA' : eventJSON.schedule.schedule[0].split("T")[0]} - ${eventJSON.schedule.schedule.length === 0 ? 'NA' : eventJSON.schedule.schedule[eventJSON.schedule.schedule.length - 1].split("T")[0]}`}
                    // subheader={`${eventJSON.startDate} ${eventJSON.startTime} - ${eventJSON.endDate} ${eventJSON.endTime}`}
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            {eventJSON.description}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={e => navigate(`/meetup/${eventJSON.id}`)}>View</Button>
                    </CardActions>
                </Card>
            </Box >
        );
    }

    function mapPeopleToCard(peopleJSON) {
        return (
            <Box sx={{ minWidth: 275, maxWidth: 600, margin: 5 }} key={peopleJSON.userID}>
                <Card variant="outlined">
                    <CardHeader
                        title={peopleJSON.name}
                    />
                    <CardMedia
                        component="img"
                        height="194"
                        image={peopleJSON.profilePictureLink}
                        alt={peopleJSON.name}
                    />
                    <CardActions>
                        <Button size="small">View</Button>
                    </CardActions>
                </Card>
            </Box>
        );
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <ToolBar />
            <Container component="main" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
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

                    <Typography component="h1" variant="h4" align="center">
                        People
                    </Typography>
                    <Grid
                        container
                        spacing={2}
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                    >
                        {peopleJSON.map(mapPeopleToCard)}
                    </Grid>
                </Paper>
            </Container>

        </ThemeProvider>
    );
}