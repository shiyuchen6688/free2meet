import { GoogleMap, LoadScript } from '@react-google-maps/api';
import React from 'react';

// Initialize Google Map and add the map
// function initMap() {
//     // The location of Uluru
//     const uluru = { lat: -25.344, lng: 131.031 };
//     // The map, centered at Uluru
//     const map = new google.maps.Map(document.getElementById("map"), {
//         zoom: 4,
//         center: uluru,
//     });
//     // The marker, positioned at Uluru
//     const marker = new google.maps.Marker({
//         position: uluru,
//         map: map,
//     });
// }

// window.initMap = initMap;

// const google = window.google


const containerStyle = {
    width: "100%",
    height: '400px'
};

// UBC Location
const center = {
    lat: 49.2618355,
    lng: -123.2450012
};

const k1 = "AIzaSyDHH_p0fbbZSRyr";
const k2 = "HqvLAc5WcM7Ic26ypP4"
const k = k1 + k2;

function MeetupLocation(props) {
    return (
        <LoadScript
            googleMapsApiKey={k}
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
            // onClick={}
            >
                { /* Child components, such as markers, info windows, etc. */}

                <></>
            </GoogleMap>
        </LoadScript>
    );
}

export default React.memo(MeetupLocation);