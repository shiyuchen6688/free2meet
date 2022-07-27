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
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getMeetupsAsync } from '../redux/meetups/thunks';
import { darkStyle } from './MeetupLocation';
import ToolBar from './ToolBar';
import { getFriendsAsync } from '../redux/users/thunks';

// const peopleJSON = [
//     {
//         name: "Person 1",
//         userID: 1,
//         profilePictureLink: "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
//     },
//     {
//         name: "Person 2",
//         userID: 2,
//         profilePictureLink: "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
//     },
//     {
//         name: "Person 3",
//         userID: 3,
//         profilePictureLink: "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
//     },]

// for google map <<<<<--------------------------------------------------------------
let script;
let map;
let locations;
let firstLoadDarkMode;
let markers = [];
const k1 = "AIzaSyDHH_p0fbbZSRyr";
const k2 = "HqvLAc5WcM7Ic26ypP4";
const k = k1 + k2;

function removeGoogleMapScript() {
    let keywords = ['maps.googleapis'];
    // Remove google from BOM (window object)
    window.google = undefined;
    // Remove google map scripts from DOM
    let scripts = document.head.getElementsByTagName("script");
    for (let i = scripts.length - 1; i >= 0; i--) {
        let scriptSource = scripts[i].getAttribute('src');
        if (scriptSource != null) {
            if (keywords.filter(item => scriptSource.includes(item)).length) {
                scripts[i].remove();
            }
        }
    }
}

const loadScript = (url, callback) => {
    script.type = "text/javascript";
    if (script.readyState) {
        script.onreadystatechange = function () {
            if (script.readyState === "loaded" || script.readyState === "complete") {
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {
        script.onload = () => callback();
    }
    script.src = url;
};

function handleScriptLoad(mapRef) {
    map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 49.265395, lng: -123.246727 },
        zoom: 15,
        styles: firstLoadDarkMode ? darkStyle : [],
    });
    showMarkers();
    fitBounds();
}

function showMarkers() {
    markers = [];
    for (let i = 0; i < locations.length; i++) {
        const d = locations[i];
        for (let j = 0; j < d.location.length; j++) {
            createMarker(d.location[j].place_id, d.location[j].name, d.location[j].formatted_address, d.location[j].lat, d.location[j].lng);
        }
        // if (d.location.length > 0) {
        //     createMarker(d.location[0].place_id, d.location[0].name, d.location[0].formatted_address, d.location[0].lat, d.location[0].lng);
        // }
    }
}

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
        let s = marker.times === 1 ? "" : "s";
        let infowindow = new window.google.maps.InfoWindow({
            content: '<div class="infoWindow" style="color:#000">' +
                '<h3>' + name + '</h3>' +
                '<p>You have been here for ' + marker.times + ' time' + s + '!</p>' +
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
// for google map -------------------------------------------------------------->>>>>

export default function History() {
    const dispatch = useDispatch();

    const email = useSelector(state => state.usersReducer.email);

    let fbp = "";

    const [filterByPerson, setFilterByPerson] = useState("");
    
    const [filterPeopleOption, setFilterPeopleOption] = useState("all");

    const peopleJSON = useSelector(state => state.usersReducer.friends);
    useEffect(() => {
        dispatch(getFriendsAsync(email));
        console.log(peopleJSON);
    }, [dispatch]);
    const eventsJSON = useSelector(state => state.meetupsReducer.list);
    useEffect(() => {
        console.log(email);
        dispatch(getMeetupsAsync({filterPeopleOption, filterByPerson, email}));
    }, [dispatch, filterPeopleOption, filterByPerson, email]);
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

    // for google map <<<<<--------------------------------------------------------------
    firstLoadDarkMode = prefersDarkMode;
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            map.setOptions({ styles: darkStyle });
        } else {
            map.setOptions({ styles: [] });
        }
    });
    locations = eventsJSON;
    const mapRef = useRef(null);
    script = document.createElement("script");
    useEffect(() => {
        removeGoogleMapScript();
        if (eventsJSON.length > 0) {
            loadScript(
                `https://maps.googleapis.com/maps/api/js?key=${k}&libraries=places&language=en`,
                () => handleScriptLoad(mapRef)
            );
        }
    }, [eventsJSON.length]);
    document.getElementsByTagName("head")[0].appendChild(script);
    // for google map -------------------------------------------------------------->>>>>

    function refreshCards() {
        console.log("Refresh Cards");
        console.log("filterPeopleOption", filterPeopleOption);
        console.log("filter by person", filterByPerson);
        console.log(typeof filterByPerson);
        dispatch(getMeetupsAsync({filterPeopleOption, filterByPerson, email}));
    }
    
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
                        <CardMedia
                            component="img"
                            image={eventJSON.meetupImage}
                        />
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

    function mapPeopleToSelect(peopleJSON) {
        return <MenuItem key={peopleJSON.email} value={peopleJSON.email}>{peopleJSON.username}</MenuItem>
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
                    {eventsJSON.length === 0 ? <Typography component="h1" variant="body1" align="center">
                        No past locations
                    </Typography> :
                        <>
                            <Typography component="h1" variant="body1" align="center">
                                Click on the marker to see more information!
                            </Typography>
                            <div ref={mapRef} id='map' />
                            <Button variant="outlined" fullWidth sx={{ my: 1 }} onClick={fitBounds}>Display All Locations On The Map</Button>
                        </>
                    }

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
                        <FormControl>
                            <FormLabel id="events-people-filter">Show:</FormLabel>
                            <RadioGroup
                              aria-labelledby="events-people-filter"
                              value={filterPeopleOption}
                              name="events-people-filter-group"
                              onChange={e => {setFilterPeopleOption(e.target.value)}}
                            >
                              <FormControlLabel key="all" value="all" control={<Radio />} label="All" />
                              <FormControlLabel key="created-by-me" value="created-by-me" control={<Radio />} label="Created By Me" />
                              <FormControlLabel key="attended-by-me" value="attended-by-me" control={<Radio />} label="Attended By Me" />
                              <FormControlLabel key="custom" value="custom" control={<Radio />} label="Custom" />
                            </RadioGroup>
                            <Select
                              labelId="events-person-select"
                              id="events-person-select"
                              value={filterByPerson}
                              disabled={filterPeopleOption !== "custom"}
                              label="Filter By Person"
                              onChange={e => {setFilterByPerson(e.target.value)}}
                            >
                                {peopleJSON.map(mapPeopleToSelect)}
                            </Select>
                            {console.log(filterByPerson)}
                        </FormControl>
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