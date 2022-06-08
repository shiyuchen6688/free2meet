import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

// Initialize Google Map and add the map
function initMap() {
    // The location of Uluru
    const uluru = { lat: -25.344, lng: 131.031 };
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: uluru,
    });
    // The marker, positioned at Uluru
    const marker = new google.maps.Marker({
        position: uluru,
        map: map,
    });
}

window.initMap = initMap;

const google = window.google


export default function MeetupLocation() {
    return (
        <>
            <Typography variant="h6" gutterBottom>
                Title
            </Typography>
            <Grid xs={12} sm={6} sx={{ mb: "3%" }}>
                <TextField
                    required
                    id="meetupName"
                    name="meetupName"
                    label="Meetup name"
                    fullWidth
                    variant="standard"
                />
            </Grid>


            {/* Description Input */}
            <Typography variant="h6" gutterBottom>
                Description
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
                Maximum 1000 characters.
            </Typography>
            <Grid xs={12} sm={6}>
                <TextField
                    placeholder="Describe your meetup"
                    id="meetupDescription"
                    name="meetupDescription"
                    multiline
                    fullWidth
                    rows={12}
                    maxRows={Infinity}
                />
            </Grid>

            <div id="map">

            </div>
        </ >
    );
}