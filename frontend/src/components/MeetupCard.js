import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Close';
import FormatListBulletedIcon from '@mui/icons-material/FormatListNumbered';
import { DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import Grow from '@mui/material/Grow';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { calculateMeetupBestLocationandTime, getInvitteesNoResponse } from '../redux/meetups/service';
import Places from './Places';
import ScheduleSelector from './timetable/ScheduleSelector';

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

    const [showCompleteButton, setShowCompleteButton] = React.useState(false);

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
        setShowCompleteButton(true);
        getInvitteesNoResponse(meetup.id).then(function (result) {
            setNoResponseInvitees(result);
        }).then(function () {
            handleClickOpen();
        });
    }

    const handleStillCompleteClick = () => {
        calculateMeetupBestLocationandTime(meetup.id).then(function (result) {
            refresh();
        });
        handleClose();
    }

    const [noResponseInvitees, setNoResponseInvitees] = React.useState([]);
    const handleCheck = () => {
        setShowCompleteButton(false);
        getInvitteesNoResponse(meetup.id).then(function (result) {
            setNoResponseInvitees(result);
            handleClickOpen();
        });
    }

    return (
        <Box sx={{ margin: 2, width: '275px' }}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h5" gutterBottom noWrap component="div">
                        {meetup.title || 'No title'}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            display: '-webkit-box',
                            overflow: 'hidden',
                            WebkitBoxOrient: 'vertical',
                            wordBreak: "break-all",
                            WebkitLineClamp: 2,
                            height: '40px',
                        }}
                        gutterBottom
                    >
                        {meetup.description || "No description"}
                    </Typography>
                    <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={1}
                    >
                        {meetup.tags.map((tag) => {
                            return <Chip label={tag} variant="outlined" />;
                        })}
                        {meetup.tags.length === 0 &&
                            <Chip label="No tags" />
                        }
                    </Stack>
                </CardContent>
                <CardActions disableSpacing>
                    {meetup.state === "PENDING" &&
                        <ButtonGroup variant="text" size="small" aria-label="text button group">
                            <Button
                                onClick={handleCheck}
                                startIcon={<FormatListBulletedIcon />}
                            >
                                Response
                            </Button>
                            <Button
                                onClick={handleCompleteClick}
                                startIcon={<CheckIcon />}
                            >
                                Complete
                            </Button>
                        </ButtonGroup>
                    }
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
                        <Typography variant="h6" gutterBottom style={{ wordWrap: 'break-word' }} align="center">
                            {meetup.title || 'No title'}
                        </Typography>
                        <Divider>
                            Description
                        </Divider>
                        <Typography variant="body2" color="text.secondary" style={{ wordWrap: 'break-word' }} align="center">
                            {meetup.description || "No description"}
                        </Typography>
                        <Divider>
                            {meetup.tags.length === 0 ? "No Tags" : "Tags"}
                        </Divider>
                        <Stack
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            spacing={1}
                        >
                            {meetup.tags.map((tag) => {
                                return <Chip label={tag} variant="outlined" />
                            })}
                        </Stack>
                        <Divider>
                            {meetup.invitees.length === 0 ? "No Invitees" : (meetup.invitees.length) + " Invitee(s)"}
                        </Divider>
                        <Stack
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            spacing={1}
                        >
                            {meetup.invitees.map((invitee) => {
                                return <Chip key={invitee} label={invitee} variant="outlined" />
                            })}
                        </Stack>
                        <Divider>
                            {state === "PENDING" ? (meetup.location.length === 0 ? "No Locations" : meetup.location.length + " Location(s)") : (meetup.bestLocation.length === 0 ? "No Best Locations" : meetup.bestLocation.length + " Best Location(s)")}
                        </Divider>
                        {state === "PENDING" ?
                            <Places placesList={meetup.location} showDelete={false} />
                            :
                            <Places placesList={meetup.bestLocation} showDelete={false} />
                        }
                        <Divider>
                            Time Zone
                        </Divider>
                        <Typography variant="body2" gutterBottom align="center">
                            {meetup.schedule.timezone.altName === undefined ? meetup.schedule.timezone.value : meetup.schedule.timezone.altName}
                        </Typography>
                        <Typography variant="body2" gutterBottom align="center">
                            {meetup.schedule.timezone.label}
                        </Typography>
                        <Divider>
                            {state === "PENDING" ? (selected.length === 0 ? "No Time Slots" : "Time Slots") : (selected.length === 0 ? "No Best Time Slots" : "Best Time Slots")}
                        </Divider>
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
                    </CardContent>
                </Dialog>
                <Dialog open={open} onClose={handleClose} TransitionComponent={Grow} >
                    <DialogTitle>
                        {showCompleteButton && <Typography variant="h6" gutterBottom>
                            Are you sure you want to complete this meetup?
                        </Typography>}
                        {!showCompleteButton && <Typography variant="h6" gutterBottom>
                            {noResponseInvitees.length === 0 ? "All Invitees Responsed" : "There are " + noResponseInvitees.length + " invitees who have not responded."}
                        </Typography>}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {showCompleteButton &&
                                <>
                                    <Typography variant="body2" color="text.secondary">
                                        This will decline all invitees who have not responded, calculate the best location(s) and time for the meetup, and mark it as completed.
                                    </Typography>
                                    <Typography variant="h6">
                                        {noResponseInvitees.length === 0 ? "All Invitees Responsed" : "There are " + noResponseInvitees.length + " invitees who have not responded."}
                                    </Typography>
                                </>
                            }
                            <Stack direction="row" spacing={1}>
                                {noResponseInvitees.map((invitee) => {
                                    return <Chip key={invitee.email} avatar={<Avatar>{invitee.email}</Avatar>} label={invitee.username} />
                                })}
                            </Stack>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        {showCompleteButton &&
                            <Button onClick={handleStillCompleteClick} color="primary">
                                Mark as Completed
                            </Button>
                        }
                        <Button onClick={handleClose} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </Card>
        </Box >
    );
}
