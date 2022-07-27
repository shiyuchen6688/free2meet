import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Avatar from '@mui/material/Avatar';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Close';
import { DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
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
import { calculateMeetupBestLocationandTime, getInvitteesNoResponse } from '../redux/meetups/service';
import Places from './Places';
import ScheduleSelector from './timetable/ScheduleSelector';
import Stack from '@mui/material/Stack';

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

export default function MeetupCard({ meetup, refresh, state }) {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    let selected = [];
    if (meetup.schedule.schedule !== undefined) {
        let pastSelectionKeys = Object.keys(meetup.schedule.schedule);
        for (let i = 0; i < pastSelectionKeys.length; i++) {
            let timeslot = pastSelectionKeys[i].replace('|', '.');
            selected.push(timeslot);
        }
    }

    let bestTimeSlot = [];
    if (meetup.bestTime !== null) {
        for (let i = 0; i < meetup.bestTime.length; i++) {
            let timeslot = meetup.bestTime[i].replace('|', '.');
            bestTimeSlot.push(timeslot);
        }
    }

    const handleCompleteClick = () => {
        calculateMeetupBestLocationandTime(meetup.id).then(function (result) {
            refresh();
        });
    }

    const [noResponseInvitetes, setNoResponseInvitetes] = React.useState([]);
    const handleCheck = () => {
        getInvitteesNoResponse(meetup.id).then(function (result) {
            setNoResponseInvitetes(result);
            handleClickOpen();
        });
    }

    // const handleDoneClick = () => {
    //     alert('NOT IMPLEMENTED');
    // }

    return (
        <Box sx={{ minWidth: 275, margin: 5 }}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Title: {meetup.title}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Details:
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {meetup.description}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    {meetup.state === "PENDING" &&
                        <>
                            <Button
                                onClick={handleCompleteClick}
                            >
                                Stop Waiting For Response And Calculate Best Location and Time
                            </Button>
                            <Button
                                onClick={handleCheck}
                            >
                                Check Invitees No Response
                            </Button>
                        </>
                    }
                    {/* {meetup.state === "COMPLETED" &&
                        <>
                            <Button
                                onClick={handleDoneClick}
                            >
                                Mark As Done
                            </Button>
                        </>
                    } */}
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
                            Title: {meetup.title}
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            Details:
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {meetup.description}
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            Friends Invited: ({meetup.invitees.length})
                        </Typography>
                        <Stack direction="row" spacing={1}>
                            {meetup.invitees.map((invitee) => {
                                return <Chip key={invitee} label={invitee} />
                            })}
                        </Stack>
                        <Box sx={{ minWidth: 800, margin: 0 }}>
                            <Typography variant="h6" gutterBottom>
                                {state === "PENDING" ? "Location(s):" : "Best Location(s)"}
                            </Typography>
                            {state === "PENDING" &&
                                <Places placesList={meetup.location} />}
                            {state === "COMPLETED" &&
                                <Places placesList={meetup.bestLocation} />}
                            <Typography variant="h6" gutterBottom>
                                Time Zone: {meetup.schedule.timezone.altName === undefined ?
                                    meetup.schedule.timezone.value : meetup.schedule.timezone.altName}
                            </Typography>
                            <Typography variant="h6" gutterBottom>
                                {state === "PENDING" ? null : "Best Time Slot(s):"}
                            </Typography>
                            {selected.length !== 0 && <div style={{ pointerEvents: "none" }}>
                                <ScheduleSelector
                                    selection={state === "PENDING" ? selected : bestTimeSlot}
                                    startDate={meetup.schedule.startDate}
                                    numDays={meetup.schedule.numDays}
                                    minTime={meetup.schedule.timeInterval[0]}
                                    maxTime={meetup.schedule.timeInterval[1]}
                                    hourlyChunks={meetup.schedule.hourlyChunk}
                                    timeFormat={"h:mma"}
                                    renderDateCell={(time, selected, innerRef) => (
                                        <div style={{ textAlign: 'center' }} ref={innerRef}>
                                            {selected ? <CheckIcon style={{ color: "green" }} /> : <ClearIcon style={{ color: "red" }} />}
                                        </div>
                                    )}
                                />
                            </div>}
                            <CardActions disableSpacing>

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
                <Dialog open={open} onClose={handleClose} TransitionComponent={Grow} >
                    <DialogTitle>{noResponseInvitetes.length === 0 ? "All Invitees Responsed" : "Invitees who have not responded"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <Stack direction="row" spacing={1}>
                                {noResponseInvitetes.map((invitee) => {
                                    return <Chip key={invitee.email} avatar={<Avatar>{invitee.email}</Avatar>} label={invitee.username} />
                                })}
                            </Stack>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>

            </Card>
        </Box>
    );
}