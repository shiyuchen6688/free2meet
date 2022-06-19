import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addLocation } from "../actions/actions";
import '../App.css';
import Place from './Place.js';

let prefersDarkMode;
let script;
let autoComplete;
let dispatch;
let map;
let data;
const k1 = "AIzaSyDHH_p0fbbZSRyr";
const k2 = "HqvLAc5WcM7Ic26ypP4";
const k = k1 + k2;
const darkStyle = [
    { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
    },
    {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
    },
    {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: "#263c3f" }],
    },
    {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{ color: "#6b9a76" }],
    },
    {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#38414e" }],
    },
    {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [{ color: "#212a37" }],
    },
    {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9ca5b3" }],
    },
    {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#746855" }],
    },
    {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#1f2835" }],
    },
    {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [{ color: "#f3d19c" }],
    },
    {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{ color: "#2f3948" }],
    },
    {
        featureType: "transit.station",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
    },
    {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#17263c" }],
    },
    {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#515c6d" }],
    },
    {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [{ color: "#17263c" }],
    },
];

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

function handleScriptLoad(updateQuery, autoCompleteRef, mapRef) {
    autoComplete = new window.google.maps.places.Autocomplete(autoCompleteRef.current, {});
    map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 49.265395, lng: -123.246727 },
        zoom: 15,
        styles: prefersDarkMode ? darkStyle : [],
    });
    data.forEach(d => createMarker(d.place_id, d.lat, d.lng, 1));
    autoComplete.setFields(["address_component", "adr_address", "alt_id", "formatted_address", "geometry.location", "icon", "name", "place_id", "type", "url"]);
    autoComplete.addListener("place_changed", () => handlePlaceSelect(updateQuery));
}

let markers = [];

let createMarker = function (id, lat, lng, para) {
    if (para === 0) {
        for (let i = 0; i < markers.length; i++) {
            if (id === markers[i].id) {
                return;
            }
        }
    }
    let marker = new window.google.maps.Marker({
        id: id,
        position: new window.google.maps.LatLng(lat, lng),
        map: map,
        draggable: false,
        animation: window.google.maps.Animation.DROP
    });
    markers.push(marker);
}

let deleteMarker = function (id) {
    let marker;
    for (let i = 0; i < markers.length; i++) {
        if (id === markers[i].id) {
            marker = markers[i]
        }
    }
    marker.setMap(null);
}

async function handlePlaceSelect(updateQuery) {
    const addressObject = autoComplete.getPlace();
    if (addressObject.formatted_address !== undefined) {
        updateQuery("");
        let lat = addressObject.geometry.location.lat()
        let lng = addressObject.geometry.location.lng();
        addressObject.lat = lat;
        addressObject.lng = lng;
        dispatch(addLocation(addressObject));
        map.setCenter(addressObject.geometry.location);
        map.setZoom(15);
        createMarker(addressObject.place_id, lat, lng, 0);
    }
}

export default function MeetupLocation() {
    prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            map.setOptions({ styles: darkStyle });
        } else {
            map.setOptions({ styles: [] });
        }
    });
    dispatch = useDispatch();
    const [query, setQuery] = useState("");
    const autoCompleteRef = useRef(null);
    const mapRef = useRef(null);
    script = document.createElement("script");
    useEffect(() => {
        loadScript(
            `https://maps.googleapis.com/maps/api/js?key=${k}&libraries=places&language=en`,
            () => handleScriptLoad(setQuery, autoCompleteRef, mapRef)
        );
    }, []);
    document.getElementsByTagName("head")[0].appendChild(script);
    data = useSelector(state => state.createMeetupLocationReducer);
    return (
        <div>
            <TextField
                inputRef={autoCompleteRef}
                onChange={event => setQuery(event.target.value)}
                label="Search a location"
                type="search"
                variant="standard"
                value={query}
                fullWidth
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    )
                }}
            />
            <div ref={mapRef} id='map' />
            <div>
                {data.map((item) => {
                    return (<Place key={item.place_id} item={item} deleteMarker={deleteMarker} />);
                })}
            </div>
        </div>
    );
}