import * as React from 'react';
import { Avatar } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';
import Place from './Place';
import ScheduleSelector from 'react-schedule-selector/dist/lib/ScheduleSelector';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

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

export default function InvitationCard({invitation}) {
    const [expanded, setExpanded] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    const handleViewMoreClick = () => {
        setOpen(!open);
    };

    return (
    <Box sx={{minWidth: 275, margin: 5}}>
        <Card variant="outlined">
            <CardHeader
                avatar={
                    <Avatar 
                        alt={invitation.creator.username}
                        src={invitation.creator.profilePictureLink}
                    />
                }
                // title={fakeMeetup.title}
                title={invitation.creator.username}
            />
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Title: {invitation.title}
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Details:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {invitation.description}
                </Typography>
            </CardContent>
            <Dialog open={open} onClose={handleViewMoreClick} maxWidth={'xl'}>
                <CardContent>
                <Typography variant="h6" gutterBottom>
                    Title: {invitation.title}
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Details:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {invitation.description}
                </Typography>
                <Box sx={{minWidth: 800, margin: 0}}>
                <Typography variant="h6" gutterBottom>
                    {invitation.location.length === 0 ? "No Location Selected" : 
                        invitation.location.length === 1 ? "Location (1 Selected)" : 
                            "Locations (" + invitation.location.length + " Selected)"}
                    {/* Location {locationInfo.length === 0 ? "NA" : ""} */}
                </Typography>
                {invitation.location.map((item) => {
                    return (<Place key={item.place_id} item={item} deleteButton={false}/>);
                })}
                {/* <Place key={meetup.location.place_id} item={fakeLocation} deleteButton={false} /> */}
                <Typography variant="h6" gutterBottom>
                    Timezone: {invitation.schedule.timezone.value}
                </Typography>
                <ScheduleSelector
                    selection={invitation.schedule.schedule}
                    selectionScheme={invitation.schedule.selectionScheme}
                    startDate={invitation.schedule.startDate}
                    numDays={invitation.schedule.numDays}
                    minTime={invitation.schedule.timeInterval[0]}
                    maxTime={invitation.schedule.timeInterval[1]}
                    hourlyChunks={invitation.schedule.hourlyChunk}
                    timeFormat={"h:mma"}
                    // onChange={(newSchedule) => {
                    //     let newScheduleArray = newSchedule.map((slot) => {
                    //         return JSON.parse(JSON.stringify(slot));
                    //     });
                    //     dispatch(updateSchedule(newScheduleArray));
                    // }}
                />
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
            </Box>
            </CardContent>
            </Dialog>
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
                <IconButton aria-label="View Details" onClick={handleViewMoreClick}>
                <MoreHorizIcon />
                </IconButton>
            </CardActions>
            </Collapse>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Box sx={{minWidth: 800, margin: 0}}>
                <CardContent>
                <Typography variant="h6" gutterBottom>
                    {invitation.location.length === 0 ? "No Location Selected" : 
                        invitation.location.length === 1 ? "Location (1 Selected)" : 
                            "Locations (" + invitation.location.length + " Selected)"}
                    {/* Location {locationInfo.length === 0 ? "NA" : ""} */}
                </Typography>
                {invitation.location.map((item) => {
                    return (<Place key={item.place_id} item={item} deleteButton={false}/>);
                })}
                {/* <Place key={meetup.location.place_id} item={fakeLocation} deleteButton={false} /> */}
                <Typography variant="h6" gutterBottom>
                    Timezone: {invitation.schedule.timezone.value}
                </Typography>
                <ScheduleSelector
                    selection={invitation.schedule.schedule}
                    selectionScheme={invitation.schedule.selectionScheme}
                    startDate={invitation.schedule.startDate}
                    numDays={invitation.schedule.numDays}
                    minTime={invitation.schedule.timeInterval[0]}
                    maxTime={invitation.schedule.timeInterval[1]}
                    hourlyChunks={invitation.schedule.hourlyChunk}
                    timeFormat={"h:mma"}
                    // onChange={(newSchedule) => {
                    //     let newScheduleArray = newSchedule.map((slot) => {
                    //         return JSON.parse(JSON.stringify(slot));
                    //     });
                    //     dispatch(updateSchedule(newScheduleArray));
                    // }}
                />
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
            </Box>
            </Collapse>
        </Card>
    </Box>
    );
}
