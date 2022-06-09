import React, { useEffect, useRef, useState } from "react";
import './App.css';
import Place from './Place.js';

let autoComplete;
let places = [];
const k1 = "AIzaSyDHH_p0fbbZSRyr";
const k2 = "HqvLAc5WcM7Ic26ypP4";
const k = k1 + k2;

const loadScript = (url, callback) => {
    let script = document.createElement("script");
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
    document.getElementsByTagName("head")[0].appendChild(script);
};

function handleScriptLoad(updateQuery, autoCompleteRef) {
    autoComplete = new window.google.maps.places.Autocomplete(autoCompleteRef.current, {});
    // autoComplete.setFields(["address_components", "formatted_address", "geometry", "icon", "name", "place_id"]);
    autoComplete.addListener("place_changed", () => handlePlaceSelect(updateQuery));
}

async function handlePlaceSelect(updateQuery) {
    const addressObject = autoComplete.getPlace();
    updateQuery(addressObject.name);
    console.log(addressObject);
    places.push(addressObject); 
}

export default function MeetupLocation() {
    const [query, setQuery] = useState("");
    const autoCompleteRef = useRef(null);
    useEffect(() => {
        loadScript(
            `https://maps.googleapis.com/maps/api/js?key=${k}&libraries=places&language=en`,
            () => handleScriptLoad(setQuery, autoCompleteRef)
        );
    }, []);
    return (
        <div>
            <div className="search">
                <input
                    ref={autoCompleteRef}
                    onChange={event => setQuery(event.target.value)}
                    placeholder="Enter to search"
                    value={query}
                />
            </div>
            <div className="places">
                <ul className="placesList">
                    {places.map((item) => {
                        return (<Place key={item.place_id} item={item} />);
                    })}
                </ul>
            </div>
        </div>
    );
}