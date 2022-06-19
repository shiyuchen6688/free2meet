import { Avatar } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import { useDispatch } from 'react-redux';
import { deleteLocation } from '../redux/actions/actions';
import "../App.css";

export default function Place({ item, deleteMarker, focusPlace }) {
    const dispatch = useDispatch();
    const focusButton = <Button onClick={() => {
        focusPlace(item.lat, item.lng);
    }}>
        Focus On Map
    </Button>;
    return (
        <Card variant="outlined" sx={{ my: 4 }}>
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
                <Button rel="noopener noreferrer" href={item.url} target="_blank">
                    View Details In Google Map
                </Button>
                {focusPlace ? focusButton : null}
                <Button onClick={() => {
                    dispatch(deleteLocation(item.place_id));
                    if (deleteMarker) {
                        deleteMarker(item.place_id);
                    }
                }}>
                    Delete
                </Button>
            </CardActions>
        </Card>
    );
}