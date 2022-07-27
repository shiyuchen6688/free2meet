import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Dialog from '@mui/material/Dialog';
import Grow from '@mui/material/Grow';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import * as React from 'react';
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

export default function MeetupCard({ meetup }) {
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

    const handleCompleteClick = () => {
        alert("NOT IMPLEMENTED");
    }

    return (
        <Box sx={{ minWidth: 275, margin: 5 }}>
            <Card variant="outlined">
                <CardHeader>
                    <Typography variant="h6" gutterBottom>
                        Title: {meetup.title}
                    </Typography>
                </CardHeader>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Details:
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {meetup.description}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <Button
                        onClick={handleCompleteClick}
                    >
                        Stop Waiting For Invitees' Response
                    </Button>

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
                    <CardHeader>
                        <Typography variant="h6" gutterBottom>
                            Title: {meetup.title}
                        </Typography>
                    </CardHeader>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Details:
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {meetup.description}
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            Friends Invited: {meetup.invitees.length}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {meetup.invitees.map((invitee) => {
                                return invitee + ' ';
                            })}
                        </Typography>
                        <Box sx={{ minWidth: 800, margin: 0 }}>
                            <Typography variant="h6" gutterBottom>
                                {"Location(s):"}
                            </Typography>
                            <Places placesList={meetup.location} />
                            <Typography variant="h6" gutterBottom>
                                Time Zone: {meetup.schedule.timezone.altName === undefined ?
                                    meetup.schedule.timezone.value : meetup.schedule.timezone.altName}
                            </Typography>
                            {selected.length !== 0 && <div style={{ pointerEvents: "none" }}>
                                <ScheduleSelector
                                    selection={selected}
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
                                <Button
                                    onClick={handleCompleteClick}
                                >
                                    Stop Waiting For Invitees' Response
                                </Button>

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
