import { Avatar, Button, Card, CardActionArea, CardActions, CardHeader } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import "../../App.css";
import { deleteLocation } from '../../redux/actions/actions';

export default function Place({ item, deleteMarker, focusPlace, zoom, invitation = false, currentSelection = undefined, updateMethod = undefined, showDelete }) {
    const dispatch = useDispatch();
    const [selected, setSelected] = React.useState(invitation ? currentSelection[item.place_id] : undefined);

    return (
        <Card
            variant="outlined"
            sx={selected ?
                { my: 1, borderRadius: 3, border: "3px solid #2196F3" } :
                { my: 1, borderRadius: 3, border: "3px solid rgba(79, 79, 79, 0.2)" }}
        >
            <CardActionArea onClick={() => {
                if (invitation) {
                    setSelected(!selected);
                    updateMethod(item.place_id, selected);
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
                        }}>
                        View Details On Google Maps
                    </Button>

                    {focusPlace && <Button onClick={() => {
                        focusPlace(item.lat, item.lng);
                    }}>
                        Focus On Map
                    </Button>}

                    {zoom && <Button onClick={() => {
                        zoom(item.lat, item.lng);
                    }}>
                        Focus And Zoom
                    </Button>}

                    {!invitation && showDelete &&
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