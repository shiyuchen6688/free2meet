import { Avatar } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import "./App.css";

export default function Place({ item }) {
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
            </CardActions>
        </Card>
    );
}