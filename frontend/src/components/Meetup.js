import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Close';
import {
    Badge, Box, CardMedia, Chip, CircularProgress, Container, CssBaseline,
    Paper, Stack, Typography, useMediaQuery
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { darkStyle } from '../pages/CreateMeetup/CreateMeetupLocation';
import { getMeetupAsync } from '../redux/meetups/thunks';
import ScheduleSelector from './timetable/ScheduleSelector';
import ToolBar from './ToolBar';

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
        createMarker(locations[i].place_id, locations[i].name, locations[i].formatted_address, locations[i].lat, locations[i].lng);
    }
}

function createMarker(id, name, formatted_address, lat, lng) {
    let marker = new window.google.maps.Marker({
        id: id,
        position: new window.google.maps.LatLng(lat, lng),
        map: map,
        draggable: false,
        animation: window.google.maps.Animation.DROP
    });
    window.google.maps.event.addListener(marker, 'click', function () {
        let infowindow = new window.google.maps.InfoWindow({
            content: '<div class="infoWindow" style="color:#000">' +
                '<h3>' + name + '</h3>' +
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

    console.log("id is", id)

    let meetup = useSelector(state => state.meetupsReducer.meetup);
    useEffect(() => {
        console.log("useEffect dispatched")
        dispatch(getMeetupAsync(id));
    }, [dispatch, id]);

    console.log("meetup", meetup)

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
    console.log("line 156")

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
                            {meetup.title || "No title"}
                        </Typography>
                        <Typography component="h1" variant="h5" align="center" style={{ wordWrap: 'break-word' }}>
                            <Badge badgeContent={meetup.state} color="primary" align="center" />
                        </Typography>
                        <Typography component="h1" variant="h6" align="center" style={{ wordWrap: 'break-word' }}>
                            Creator: {meetup.creator.username}
                        </Typography>
                        <Typography component="h1" variant="h6" align="center" style={{ wordWrap: 'break-word' }}>
                            {meetup.invitees.length === 0 ? "No Invitees" : (meetup.invitees.length) + " Invitee(s)"}
                        </Typography>
                        <Stack
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            spacing={1}
                        >
                            {meetup.invitees.map((invitee) => {
                                return <Chip key={invitee} label={invitee} variant="outlined" />
                            })}
                        </Stack>
                        <Typography component="h1" variant="h6" align="center" style={{ wordWrap: 'break-word' }}>
                            {meetup.tags.length === 0 ? "No Tags" : "Tags"}
                        </Typography>
                        <Stack
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            spacing={1}
                        >
                            {meetup.tags.map((tag) => {
                                return <Chip label={tag} variant="outlined" />
                            })}
                        </Stack>
                        <Typography variant="h6" align="center" style={{ wordWrap: 'break-word' }}>
                            Description
                        </Typography>
                        <Typography variant="body2" align="center" style={{ wordWrap: 'break-word' }}>
                            {meetup.description || "No description"}
                        </Typography>
                        <CardMedia
                            component="img"
                            width="100%"
                            image={meetup.meetupImage}
                        />
                        {locations.length === 0 ?
                            <Typography variant="h6" align="center" style={{ wordWrap: 'break-word' }}>
                                No location available
                            </Typography>
                            :
                            <>
                                <Typography variant="h6" align="center" style={{ wordWrap: 'break-word' }}>
                                    Location(s)
                                </Typography>
                                <div ref={mapRef} id='map' />
                            </>
                        }
                        <Typography variant="h6" align="center" style={{ wordWrap: 'break-word' }}>
                            Time Zone
                        </Typography>
                        <Typography variant="body2" align="center">
                            {meetup.schedule.timezone.altName === undefined ? meetup.schedule.timezone.value : meetup.schedule.timezone.altName}
                        </Typography>
                        <Typography variant="body2" align="center">
                            {meetup.schedule.timezone.label}
                        </Typography>
                        <Typography variant="h6" align="center" style={{ wordWrap: 'break-word' }}>
                            {meetup.state === "PENDING" ? (meetup.schedule.schedule === null || meetup.schedule.schedule === undefined || Object.keys(meetup.schedule.schedule).length === 0 ? "No Time Slots" : "Time Slots") : (meetup.bestTime.length === 0 ? "No Best Time Slots" : "Best Time Slots")}
                        </Typography>
                        {(meetup.schedule.schedule === null || meetup.schedule.schedule === undefined || Object.keys(meetup.schedule.schedule).length === 0) && <div style={{ pointerEvents: "none" }}>
                            <ScheduleSelector
                                selection={meetup.state === "PENDING" ?
                                    ((meetup.schedule.schedule === null || meetup.schedule.schedule === undefined) ?
                                        []
                                        :
                                        Object.keys(meetup.schedule.schedule).map((key) => {
                                            return key.replace('|', '.');
                                        }))
                                    :
                                    meetup.bestTime.map((key) => {
                                        return key.replace('|', '.');
                                    })
                                }
                                startDate={meetup.schedule.startDate}
                                numDays={meetup.schedule.numDays}
                                minTime={meetup.schedule.timeInterval[0]}
                                maxTime={meetup.schedule.timeInterval[1]}
                                hourlyChunks={meetup.schedule.hourlyChunk}
                                timeFormat={"h:mma"}
                                renderDateCell={(time, selected, innerRef) => (
                                    <div style={{ textAlign: 'center' }} ref={innerRef}>
                                        {selected ? <CheckIcon style={{ color: "green" }} /> : <ClearIcon style={{ color: "red" }} />}
                                    </div>
                                )}
                            />
                        </div>
                        }
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