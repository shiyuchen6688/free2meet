import SearchIcon from "@material-ui/icons/Search";
import { Button, InputAdornment, TextField, useMediaQuery } from '@mui/material';
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import '../../App.css';
import Place from '../../components/place/Place';
import { addLocation } from "../../redux/actions/actions";

let prefersDarkMode;
let script;
let autoComplete;
let dispatch;
let map;
let data;
let infoWindow;
let markers = [];
const k = "AIzaSyDHH_p0fbbZSRyrHqvLAc5WcM7Ic26ypP4";

export const darkStyle = [
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

function removeGoogleMapScript() {
    let keywords = ['maps.googleapis'];
    window.google = undefined;
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
    removeGoogleMapScript();
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
    markers = [];
    autoComplete = new window.google.maps.places.Autocomplete(autoCompleteRef.current, {});
    map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 49.265395, lng: -123.246727 },
        zoom: 15,
        styles: prefersDarkMode ? darkStyle : [],
    });
    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(
            browserHasGeolocation
                ? "Error: The Geolocation service failed."
                : "Error: Your browser doesn't support geolocation."
        );
        infoWindow.open(map);
    }
    infoWindow = new window.google.maps.InfoWindow();
    const locationButton = document.createElement("button");
    const getCurrentPosition = "Get Current Position";
    const loading = "Loading...";
    locationButton.textContent = getCurrentPosition;
    locationButton.classList.add("custom-map-control-button");
    map.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(locationButton);
    locationButton.addEventListener("click", () => {
        if (navigator.geolocation) {
            locationButton.textContent = loading;
            locationButton.disabled = true;
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    infoWindow.setPosition(pos);
                    let timestamp = new Date(position.timestamp);
                    infoWindow.setContent("<p style='color:#000'> Your current location at " + timestamp.toLocaleString() + "</p>");
                    infoWindow.open(map);
                    locationButton.textContent = getCurrentPosition;
                    locationButton.disabled = false;
                    map.setCenter(pos);
                },
                () => {
                    handleLocationError(true, infoWindow, map.getCenter());
                }
            );
        } else {
            handleLocationError(false, infoWindow, map.getCenter());
        }
    });
    data.forEach(d => createMarker(d.place_id, d.name, d.formatted_address, d.lat, d.lng, 1));
    fitBounds();
    if (markers.length === 1) {
        map.setCenter({ lat: data[0].lat, lng: data[0].lng });
    }
    autoComplete.setFields(["address_component", "adr_address", "formatted_address", "geometry.location", "icon", "name", "place_id", "type", "url"]);
    autoComplete.addListener("place_changed", () => handlePlaceSelect(updateQuery));
    window.google.maps.event.addListener(map, "click", function (event) {
        let lat = event.latLng.lat();
        let lng = event.latLng.lng();
        let geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({
            'latLng': new window.google.maps.LatLng(lat, lng)
        }, function (results, status) {
            updateQuery(results[0].formatted_address);
        });
    });
}

function createMarker(id, name, formatted_address, lat, lng, para) {
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
        zoom(markers[0].position.lat(), markers[0].position.lng());
        return;
    }
    let latlngbounds = new window.google.maps.LatLngBounds();
    for (let i = 0; i < markers.length; i++) {
        latlngbounds.extend(new window.google.maps.LatLng(markers[i].position.lat(), markers[i].position.lng()));
    }
    map.fitBounds(latlngbounds);
}

function deleteMarker(delId) {
    for (let i = 0; i < markers.length; i++) {
        if (delId === markers[i].id) {
            markers[i].setMap(null);
        }
    }
    let markers2 = [];
    for (let i = 0; i < markers.length; i++) {
        if (delId !== markers[i].id) {
            markers2.push(markers[i]);
        }
    }
    markers = markers2;
}

function focusPlace(lat, lng) {
    map.panTo({ lat: lat, lng: lng });
}

function zoom(lat, lng) {
    map.panTo({ lat: lat, lng: lng });
    map.setZoom(15);
}

async function handlePlaceSelect(updateQuery) {
    const addressObject = autoComplete.getPlace();
    if (addressObject.formatted_address !== undefined) {
        updateQuery("");
        let lat = addressObject.geometry.location.lat()
        let lng = addressObject.geometry.location.lng();
        addressObject.lat = lat;
        addressObject.lng = lng;
        dispatch(addLocation(JSON.parse(JSON.stringify(addressObject))));
        map.panTo(addressObject.geometry.location);
        map.setZoom(15);
        createMarker(addressObject.place_id, addressObject.name, addressObject.formatted_address, lat, lng, 0);
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
            <Button variant="outlined" fullWidth sx={{ my: 1 }} onClick={fitBounds}>Fit All Locations</Button>
            <div>
                {data.map((item) => {
                    return (<Place key={item.place_id} item={item} deleteMarker={deleteMarker} focusPlace={focusPlace} zoom={zoom} showDelete={true} />);
                })}
            </div>
        </div>
    );
}