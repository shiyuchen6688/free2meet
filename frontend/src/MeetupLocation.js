import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addLocation } from "./actions/actions";
import './App.css';
import Place from './Place.js';

let script;
let autoComplete;
let dispatch;
let map;
const k1 = "AIzaSyDHH_p0fbbZSRyr";
const k2 = "HqvLAc5WcM7Ic26ypP4";
const k = k1 + k2;

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
        zoom: 15
    });
    autoComplete.setFields(["address_component", "adr_address", "alt_id", "formatted_address", "geometry.location", "icon", "name", "place_id", "type", "url"]);
    autoComplete.addListener("place_changed", () => handlePlaceSelect(updateQuery));
}

let markers = [];

let createMarker = function (id, loc) {
    for (let i = 0; i < markers.length; i++) {
        if (id === markers[i].id) {
            return;
        }
    }
    let marker = new window.google.maps.Marker({ // create a marker and set id
        id: id,
        position: loc,
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
    updateQuery("");
    // console.log(addressObject);
    if (addressObject.formatted_address !== undefined) {
        dispatch(addLocation(addressObject));
        map.setCenter(addressObject.geometry.location);
        createMarker(addressObject.place_id, addressObject.geometry.location);
    }
}

export default function MeetupLocation() {
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
    let data = useSelector(state => state.createMeetupLocationReducer);
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