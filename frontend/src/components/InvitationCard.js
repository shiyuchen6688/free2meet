import * as React from 'react';
import { Avatar } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';

const fakeCreator = {
    name: 'John Doe',
    profilePictureLink: 'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png',
};

const fakeMeetup = {
    title: 'Party 1',
    description: 'a description of party 1...',
    schedule: [],
    location: '',
    attendees: []
};

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

export default function InvitationCard({creator, meetup ,attendees}) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    return (
    <Box sx={{minWidth: 275, margin: 5}}>
        <Card variant="outlined">
            <CardHeader
                avatar={
                    <Avatar 
                        alt={fakeCreator.name}
                        src={fakeCreator.profilePictureLink}
                    />
                }
                title={fakeMeetup.title}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {fakeMeetup.description}
                </Typography>
            </CardContent>
            <Collapse in={!expanded} timeout="auto" unmountOnExit>
            <CardActions disableSpacing>
                <IconButton aria-label="Accept">
                <CheckIcon />
                </IconButton>
                <IconButton aria-label="Decline">
                <CloseIcon />
                </IconButton>
                <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="View More"
                >
                <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            </Collapse>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                <Typography paragraph>Method:</Typography>
                <Typography paragraph>
                Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
                aside for 10 minutes.
                </Typography>
                <Typography>
                Set aside off of the heat to let rest for 10 minutes, and then serve.
                </Typography>
                </CardContent>
                <CardActions disableSpacing>
                <IconButton aria-label="Accept">
                <CheckIcon />
                </IconButton>
                <IconButton aria-label="Decline">
                <CloseIcon />
                </IconButton>
                <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="View More"
                >
                <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            </Collapse>
        </Card>
    </Box>
    );
}
