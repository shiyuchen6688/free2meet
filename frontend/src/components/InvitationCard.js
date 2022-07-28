import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Avatar } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import Grow from '@mui/material/Grow';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { acceptInvitationAsync, declineInvitationAsync } from '../redux/invitations/thunks';
import Places from './Places';
import ScheduleSelector from './timetable/ScheduleSelector';
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

export default function InvitationCard({ invitation, userEmail, state }) {
    const dispatch = useDispatch();
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const [availableTimeSlots, setAvailableTimeSlots] = React.useState([]);

    const initLocationSelection = {};
    invitation.location.map((item) => {
        return initLocationSelection[item.place_id] = false;
    });

    const [invitationLocationSelection, setInvitationLocationSelection] = React.useState(initLocationSelection);

    const updateSelection = (place_id, selected) => {
        const newSelection = { ...invitationLocationSelection };
        newSelection[place_id] = !selected;
        setInvitationLocationSelection(newSelection);
    }

    const handleAcceptClick = () => {
        console.log("Accepted");
        let invitationLocationSelectionCopy = { ...invitationLocationSelection };
        let availableLocations = [];
        for (let key in invitationLocationSelectionCopy) {
            if (invitationLocationSelectionCopy[key]) {
                availableLocations.push(key);
            }
        }
        let info = { email: userEmail, invitationId: invitation._id, availableTimeslots: availableTimeSlots, availableLocations: availableLocations };
        dispatch(acceptInvitationAsync(info));
    };

    const handleDeclineClick = () => {
        console.log("Declined");
        let info = { email: userEmail, invitationId: invitation._id, availableTimeslots: selected, availableLocations: selectedLocations };
        dispatch(declineInvitationAsync(info));
    };

    let pastSelection = { ...invitation.schedule.schedule };
    let selected = [];
    if (invitation.schedule.schedule !== undefined) {
        let pastSelectionKeys = Object.keys(pastSelection);
        for (let i = 0; i < pastSelectionKeys.length; i++) {
            let participants = pastSelection[pastSelectionKeys[i]];
            if (participants.includes(userEmail)) {
                let timeslot = pastSelectionKeys[i].replace('.', '|');
                selected.push(timeslot);
            }
        }
    }

    let pastLocationSelection = [...invitation.location];
    let selectedLocations = [];
    if (invitation.location !== undefined) {
        for (let i = 0; i < pastLocationSelection.length; i++) {
            if (pastLocationSelection[i].attendees.includes(userEmail)) {
                selectedLocations.push(pastLocationSelection[i].place_id);
            }
        }
    }

    // useEffect(() => {
    //     if (state === "accepted" && selected.length !== 0 && pastSelectionKeys.length === selected.length) {
    //         setAvailableTimeSlots(selected);
    //     }
    // }, [state]);

    return (
        <Box sx={{ width: 275, margin: 2 }}>
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
                        {invitation.description || 'No description'}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    {state !== "pending" && (
                        <>
                            <IconButton
                                aria-label="Accept"
                                onClick={handleAcceptClick}
                                disabled={state === "accepted" || state === "pending"}
                            >
                                <CheckIcon />
                            </IconButton>
                            <IconButton
                                aria-label="Decline"
                                onClick={handleDeclineClick}
                                disabled={state === "declined"}
                            >
                                <CloseIcon />
                            </IconButton></>
                    )}

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
                        {invitation.invitees.length > 1 &&
                            <>
                                <Typography variant="h6" gutterBottom>
                                    Also Invited:
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {invitation.invitees.map((invitee) => {
                                        if (invitee !== userEmail) {
                                            return <Chip key={invitee} label={invitee} avatar={<Avatar>{invitee}</Avatar>} />
                                        } else {
                                            return null;
                                        }
                                    })}
                                </Typography>
                            </>
                        }
                        {invitation.invitees.length === 1 &&
                            <Typography variant="h6" gutterBottom>
                                Only Invited You!
                            </Typography>
                        }
                        <Box sx={{ margin: 0 }}>
                            <Typography variant="h6" gutterBottom>
                                {"Location(s):"}
                            </Typography>
                            <Places placesList={invitation.location} selection={invitationLocationSelection} updateMethod={updateSelection} invitationState={state === 'pending' || state === 'declined'} />
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
