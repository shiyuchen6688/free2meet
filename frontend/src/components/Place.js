import { Avatar } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import { useDispatch } from 'react-redux';
import "../App.css";
import { deleteLocation } from '../redux/actions/actions';
import React from 'react';
import {CardActionArea} from '@mui/material';

export default function Place({ item, deleteMarker, focusPlace, zoom, invitation=false, currentSelection=undefined, updateMethod=undefined }) {
    const dispatch = useDispatch();
    const [selected, setSelected] = React.useState(invitation ? currentSelection[item.place_id] : undefined);
    const focusButton = <Button onClick={() => {
        focusPlace(item.lat, item.lng);
    }}>
        Focus On Map
    </Button>;
    const zoomButton = <Button onClick={() => {
        zoom(item.lat, item.lng);
    }}>
        Focus And Zoom
    </Button>;
    return (
        <Card 
        variant="outlined"
        sx={ selected ? 
            { my: 1, borderRadius: 3, border: "3px solid #2196F3" } : 
            { my: 1, borderRadius: 3, border: "3px solid rgba(79, 79, 79, 0.2)" }}
        >
            <CardActionArea onClick={()=>{
                if (invitation) {
                    setSelected(!selected);
                    updateMethod(item.place_id, selected);
                    console.log(currentSelection);
                } else if (focusPlace) {
                    focusPlace(item.lat, item.lng);
                }
            }}>
                <CardHeader
                    avatar={
                        <Avatar
                            alt="icon"
                            src={item.icon}
                        />
                    }
                    title={item.name}
                    subheader={item.formatted_address}
                />
                <CardActions>
                    <Button 
                    rel="noopener noreferrer" 
                    href={item.url} 
                    target="_blank"
                    onMouseDown={event => event.stopPropagation()}
                    onClick={event => {
                        event.stopPropagation();
                        // event.preventDefault();
                        console.log("Button clicked");
                    }}>
                        View Details On Google Maps
                    </Button>
                    {focusPlace ? focusButton : null}
                    {zoom ? zoomButton : null}
                    {!invitation && 
                    <Button 
                    onMouseDown={event => event.stopPropagation()}
                    onClick={(event) => {
                        event.stopPropagation()
                        dispatch(deleteLocation(item.place_id));
                        if (deleteMarker) {
                            deleteMarker(item.place_id);
                        }
                    }}>
                        Delete
                    </Button>}
                </CardActions>
            </CardActionArea>
        </Card>
    );
}