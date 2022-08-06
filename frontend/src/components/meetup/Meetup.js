import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { getMeetupAsync } from '../../redux/meetups/thunks';
import ToolBar from '../ToolBar';
import { useEffect, useRef } from 'react';
import { darkStyle } from '../../pages/CreateMeetup/CreateMeetupLocation';

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
    console.log(locations);
    for (let i = 0; i < locations.length; i++) {
        createMarker(locations[i].place_id, locations[i].name, locations[i].formatted_address, locations[i].lat, locations[i].lng);
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

export default function Meetup() {
    const dispatch = useDispatch();
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const location = useLocation();
    const id = location.pathname.split("/")[2];

    const meetup = useSelector(state => state.meetupsReducer.meetup);
    useEffect(() => {
        dispatch(getMeetupAsync(id));
    }, [dispatch, id]);

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode: prefersDarkMode ? 'dark' : 'light',
                },
                Media: {
                    height: '100%',
                    width: '100%'
                }
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
        if (meetup.state === "PENDING") {
            locations = meetup.location;
        } else {
            locations = meetup.bestLocation;
        }
        const mapRef = useRef(null);
        script = document.createElement("script");
        useEffect(() => {
            removeGoogleMapScript();
            if (meetup) {
                loadScript(
                    `https://maps.googleapis.com/maps/api/js?key=${k}&libraries=places&language=en`,
                    () => handleScriptLoad(mapRef)
                );
            }
        }, [meetup]);
        document.getElementsByTagName("head")[0].appendChild(script);
        // for google map -------------------------------------------------------------->>>>>

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />

            <ToolBar />
            <Container component="main" sx={{ mb: 4 }}>
                {(meetup !== null && meetup !== undefined && Object.keys(meetup).length !== 0) ?
                    <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                        <Typography component="h1" variant="h4" align="center" style={{ wordWrap: 'break-word' }}>
                            {meetup.title}
                        </Typography>
                        <Card variant="outlined">
                            <CardHeader
                                avatar={
                                    <Avatar
                                        alt={meetup.creator.username}
                                        src={meetup.creator.profilePictureLink}
                                    />
                                }
                                title={meetup.title}
                                subheader={`${meetup.schedule.schedule === undefined ? 'NA' : (meetup.state === "PENDING" ? (Object.keys(meetup.schedule.schedule).length === 0 ? 'NA' : Object.keys(meetup.schedule.schedule)[0].split("T")[0]) : (meetup.bestTime.length === 0 ? 'NA' : meetup.bestTime[0].split("T")[0]))} 
                                            ${meetup.schedule.schedule === undefined ? 'NA' : (meetup.state === "PENDING" ? (Object.keys(meetup.schedule.schedule).length === 0 ? 'NA' : Object.keys(meetup.schedule.schedule)[0].split("T")[1].split(":00.")[0]) : (meetup.bestTime.length === 0 ? 'NA' : meetup.bestTime[0].split("T")[1].split(":00.")[0]))} - 
                                            ${meetup.schedule.schedule === undefined ? 'NA' : (meetup.state === "PENDING" ? (Object.keys(meetup.schedule.schedule).length === 0 ? 'NA' : Object.keys(meetup.schedule.schedule)[Object.keys(meetup.schedule.schedule).length - 1].split("T")[0]) : (meetup.bestTime.length === 0 ? 'NA' : meetup.bestTime[meetup.bestTime.length - 1].split("T")[0]))} 
                                            ${meetup.schedule.schedule === undefined ? 'NA' : (meetup.state === "PENDING" ? (Object.keys(meetup.schedule.schedule).length === 0 ? 'NA' : Object.keys(meetup.schedule.schedule)[Object.keys(meetup.schedule.schedule).length - 1].split("T")[1].split(":00.")[0]) : (meetup.bestTime.length === 0 ? 'NA' : meetup.bestTime[meetup.bestTime.length - 1].split("T")[1].split(":00.")[0]))}`}
                            />
                            <CardContent>
                                <CardMedia
                                    component="img"
                                    width="100%"
                                    image={meetup.meetupImage}
                                />
                                <Typography variant="body2" color="text.secondary" style={{ wordWrap: 'break-word' }}>
                                    {meetup.description}
                                </Typography>
                                <div ref={mapRef} id='map' />
                            </CardContent>
                        </Card>
                    </Paper>
                    :
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        minHeight="100vh"
                    >
                        <CircularProgress />
                    </Box>}
            </Container>
        </ThemeProvider>
    )
}