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
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getMeetupsAsync } from '../redux/meetups/thunks';
import { darkStyle } from './MeetupLocation';
import ToolBar from './ToolBar';

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

// for google map --------------------------------------------------------------
let script1;
let map;
let locations;
let firstLoadDarkMode;
const k1 = "AIzaSyDHH_p0fbbZSRyr";
const k2 = "HqvLAc5WcM7Ic26ypP4";
const k = k1 + k2;

const loadScript = (url, callback) => {
    if (map) {
        callback();
        return;
    }
    script1.type = "text/javascript";
    if (script1.readyState) {
        script1.onreadystatechange = function () {
            if (script1.readyState === "loaded" || script1.readyState === "complete") {
                script1.onreadystatechange = null;
                callback();
            }
        };
    } else {
        script1.onload = () => callback();
    }
    script1.src = url;
};

function handleScriptLoad(mapRef) {
    map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 49.265395, lng: -123.246727 },
        zoom: 15,
        styles: firstLoadDarkMode ? darkStyle : [],
    });
    markers = [];
    for (let i = 0; i < locations.length; i++) {
        const d = locations[i];
        if (d.location.length > 0) {
            createMarker(d.location[0].place_id, d.location[0].name, d.location[0].formatted_address, d.location[0].lat, d.location[0].lng);
        }
    }
    fitBounds();
}

let markers = [];

function createMarker(id, name, formatted_address, lat, lng) {
    for (let i = 0; i < markers.length; i++) {
        if (id === markers[i].id) {
            markers[i].times++;
            return;
        }
    }
    let marker = new window.google.maps.Marker({
        id: id,
        times: 1,
        position: new window.google.maps.LatLng(lat, lng),
        map: map,
        draggable: false,
        animation: window.google.maps.Animation.DROP
    });
    window.google.maps.event.addListener(marker, 'click', function () {
        let infowindow = new window.google.maps.InfoWindow({
            content: '<div class="infoWindow" style="color:#000">' +
                '<h3>' + name + '</h3>' +
                '<p>' + 'You have been here for ' + marker.times + ' time(s)!' + '</p>' +
                '<p>' + formatted_address + '</p>' +
                '</div>'
        });
        infowindow.open(map, marker);
    });
    markers.push(marker);
}

const fitBounds = () => {
    if (markers.length === 0) {
        return;
    } else if (markers.length === 1) {
        map.panTo({ lat: markers[0].position.lat(), lng: markers[0].position.lng() });
        map.setZoom(15);
        return;
    }
    let latlngbounds = new window.google.maps.LatLngBounds();
    for (let i = 0; i < markers.length; i++) {
        latlngbounds.extend(new window.google.maps.LatLng(markers[i].position.lat(), markers[i].position.lng()));
    }
    map.fitBounds(latlngbounds);
}
// for google map --------------------------------------------------------------

export default function History() {
    const dispatch = useDispatch();
    const eventsJSON = useSelector(state => state.meetupsReducer.list);
    useEffect(() => {
        dispatch(getMeetupsAsync());
    }, [dispatch]);
    const navigate = useNavigate();

    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    firstLoadDarkMode = prefersDarkMode; // for google map
    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode: prefersDarkMode ? 'dark' : 'light',
                },
            }),
        [prefersDarkMode],
    );

    // for google map --------------------------------------------------------------
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            map.setOptions({ styles: darkStyle });
        } else {
            map.setOptions({ styles: [] });
        }
    });
    locations = eventsJSON;
    const mapRef = useRef(null);
    script1 = document.createElement("script");
    useEffect(() => {
        loadScript(
            `https://maps.googleapis.com/maps/api/js?key=${k}&libraries=visualization&language=en`,
            () => handleScriptLoad(mapRef)
        );
    }, []);
    document.getElementsByTagName("head")[0].appendChild(script1);
    // for google map --------------------------------------------------------------

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
                        Past Locations
                    </Typography>
                    <div ref={mapRef} id='map' />
                    <Button variant="outlined" fullWidth sx={{ my: 1 }} onClick={fitBounds}>Display All Locations On The Map</Button>

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