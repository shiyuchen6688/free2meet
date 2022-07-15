import * as React from 'react';
import { Avatar } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Place from './Place';
import ScheduleSelector from './timetable/ScheduleSelector';
import Dialog from '@mui/material/Dialog';
import Grow from '@mui/material/Grow';
import { acceptInvitationAsync, declineInvitationAsync } from '../redux/invitations/thunks';
import { useDispatch } from 'react-redux';
// import { useEffect } from 'react';


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

export default function InvitationCard({invitation, userEmail, state}) {
    const dispatch = useDispatch();
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const [availableTimeSlots, setAvailableTimeSlots] = React.useState([]);

    const handleAcceptClick = () => {
        console.log("Accepted");
        let info = {email:userEmail, invitationId:invitation._id, availableTimeslots:availableTimeSlots};
        dispatch(acceptInvitationAsync(info));
    };

    const handleDeclineClick = () => {
        console.log("Declined");
        let info = {email:userEmail, invitationId:invitation._id, availableTimeslots:selected};
        dispatch(declineInvitationAsync(info));
    };

    let pastSelection = {...invitation.schedule.schedule};
    let selected = [];
    let pastSelectionKeys = Object.keys(pastSelection);
    for (let i = 0; i < pastSelectionKeys.length; i++) {
        let participants = pastSelection[pastSelectionKeys[i]];
        if (participants.includes(userEmail)) {
            let timeslot = pastSelectionKeys[i].replace('.', '|');
            selected.push(timeslot);
        }
    }

    // useEffect(() => {
    //     if (state === "accepted" && selected.length !== 0 && pastSelectionKeys.length === selected.length) {
    //         setAvailableTimeSlots(selected);
    //     }
    // }, [state]);

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
            <CardActions disableSpacing>
                <IconButton
                aria-label="Accept"
                onClick={handleAcceptClick}
                disabled={state === "accepted"}
                >
                <CheckIcon />
                </IconButton>
                <IconButton
                aria-label="Decline"
                onClick={handleDeclineClick}
                disabled={state === "declined"}
                >
                <CloseIcon />
                </IconButton>
                
                <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="View More"
                >
                <ArrowForwardIcon />
                </ExpandMore>
            </CardActions>
            <Dialog open={expanded} onClose={handleExpandClick} maxWidth={'xl'} TransitionComponent={Grow}>
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
                    {/* {invitation.location.length === 0 ? "No Location Selected" : 
                        invitation.location.length === 1 ? "Location (1 Selected)" : 
                            "Locations (" + invitation.location.length + " Selected)"} */}
                    {"Location(s):"}
                </Typography>
                {invitation.location.map((item) => {
                    return (<Place key={item.place_id} item={item} invitation={true}/>);
                })}
                <Typography variant="h6" gutterBottom>
                    Time Zone: {invitation.schedule.timezone.altName === undefined ?
                        invitation.schedule.timezone.value : invitation.schedule.timezone.altName}
                </Typography>
                <ScheduleSelector
                    selection={availableTimeSlots}
                    pastSelection={pastSelection}
                    selectionScheme={invitation.schedule.selectionScheme}
                    startDate={invitation.schedule.startDate}
                    numDays={invitation.schedule.numDays}
                    minTime={invitation.schedule.timeInterval[0]}
                    maxTime={invitation.schedule.timeInterval[1]}
                    hourlyChunks={invitation.schedule.hourlyChunk}
                    timeFormat={"h:mma"}
                    onChange={setAvailableTimeSlots}
                />
                <CardActions disableSpacing>
                <IconButton
                aria-label="Accept"
                onClick={handleAcceptClick}
                disabled={state === "accepted"}
                >
                <CheckIcon />
                </IconButton>
                <IconButton
                aria-label="Decline"
                onClick={handleDeclineClick}
                disabled={state === "declined"}
                >
                <CloseIcon />
                </IconButton>
                <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="View less"
                >
                <ArrowForwardIcon />
                </ExpandMore>
            </CardActions>
            </Box>
            </CardContent>
            </Dialog>
        </Card>
    </Box>
    );
}
