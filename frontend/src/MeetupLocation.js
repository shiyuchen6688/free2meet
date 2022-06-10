import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addR } from "./actions/actions";
import './App.css';
import Place from './Place.js';

let script;
let autoComplete;
const k1 = "AIzaSyDHH_p0fbbZSRyr";
const k2 = "HqvLAc5WcM7Ic26ypP4";
const k = k1 + k2;

export default function MeetupLocation() {
    const dispatch = useDispatch();
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
    function handleScriptLoad(updateQuery, autoCompleteRef) {
        autoComplete = new window.google.maps.places.Autocomplete(autoCompleteRef.current, {});
        autoComplete.setFields(["address_component", "adr_address", "alt_id", "formatted_address", "icon", "name", "place_id", "type", "url"]);
        autoComplete.addListener("place_changed", () => handlePlaceSelect(updateQuery));
    }
    async function handlePlaceSelect(updateQuery) {
        const addressObject = autoComplete.getPlace();
        updateQuery("");
        console.log(addressObject);
        if (addressObject.formatted_address !== undefined) {
            dispatch(addR(addressObject));
        }
    }
    const [query, setQuery] = useState("");
    const autoCompleteRef = useRef(null);
    script = document.createElement("script");
    useEffect(() => {
        loadScript(
            `https://maps.googleapis.com/maps/api/js?key=${k}&libraries=places&language=en`,
            () => handleScriptLoad(setQuery, autoCompleteRef)
        );
    }, []);
    document.getElementsByTagName("head")[0].appendChild(script);
    let data = useSelector(state => state.reducers);
    return (
        <div>
            <div className="search">
                <input
                    ref={autoCompleteRef}
                    onChange={event => setQuery(event.target.value)}
                    placeholder="Search places"
                    value={query}
                />
            </div>

            <div className="places">
                <ul className="placesList">
                    {data.map((item) => {
                        return (<Place key={item.place_id} item={item} />);
                    })}
                </ul>
            </div>
        </div>
    );
}