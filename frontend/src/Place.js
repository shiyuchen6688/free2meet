import React from "react";
import "./App.css";

export default function Place({ item }) {
    return (
        <li className="place">
            <div className="placeWrapper">
                <img
                    src={item.icon}
                    alt="icon"
                />
                <p className="newline">{item.name}</p>
                <p className="newline">{item.formatted_address}</p>
            </div>
        </li>
    );
}