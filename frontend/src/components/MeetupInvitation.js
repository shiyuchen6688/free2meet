import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ScheduleSelector from 'react-schedule-selector';
import CreatableSelect from 'react-select/creatable';
import "../App.css";
import { changeInvitee } from '../redux/actions/actions';
import { getFriendsAsync } from '../redux/users/thunks';
import Place from './Place';

export default function MeetupInvitation() {
    const dispatch = useDispatch();
    const titleAndDetailInfo = useSelector(state => state.createMeetupTitleDetailReducer);
    const allScheduleInfo = useSelector(state => state.createMeetupScheduleReducer);
    const locationInfo = useSelector(state => state.createMeetupLocationReducer);
    const invitationInfo = useSelector(state => state.createMeetupInvitationReducer);
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const currentUser = useSelector(state => state.usersReducer);
    React.useEffect(() => {
        dispatch(getFriendsAsync(currentUser.email));
        // clear the state so that the frontend can be consistent with the redux state
        handleChange([]);
    }, [dispatch, currentUser.email]);

    const friends = currentUser.friends.map(friend => {
        return { label: friend.username, value: friend.email };
    });

    let handleChange = (newValue) => {
        dispatch(changeInvitee(newValue));
    };

    return (
        <React.Fragment>
            <Stack direction="column" spacing={2}>
                <Typography variant="h6" gutterBottom>
                    Title: {titleAndDetailInfo["meetup-title"] === "" ? "NA" : titleAndDetailInfo["meetup-title"]}
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Details:
                </Typography>
                <Typography variant="h9" gutterBottom>
                    {titleAndDetailInfo["meetup-description"] === "" ? "NA" : titleAndDetailInfo["meetup-description"]}
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Add Friends:
                </Typography>
                <div>
                    <CreatableSelect className={prefersDarkMode ? 'dropdownMeunDark' : null}
                        isMulti
                        onChange={handleChange}
                        options={friends}
                    />
                </div>
                <Typography variant="h6" gutterBottom>
                    {locationInfo.length === 0 ? "No Location Selected" :
                        locationInfo.length === 1 ? "Location (1 Selected):" :
                            "Locations (" + locationInfo.length + " Selected):"}
                </Typography>
                {locationInfo.map((item) => {
                    return (<Place key={item.place_id} item={item} />);
                })}
                <Typography variant="h6" gutterBottom>
                    Time Zone: {allScheduleInfo.timezone.altName === undefined ?
                        allScheduleInfo.timezone.value : allScheduleInfo.timezone.altName}
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Time Availability: {allScheduleInfo.schedule.length === 0 ? "Not Selected" : ""}
                </Typography>
                {allScheduleInfo.schedule.length !== 0 && <div style={{ pointerEvents: "none" }}>
                    <ScheduleSelector
                        selection={allScheduleInfo.schedule}
                        numDays={allScheduleInfo.numDays}
                        startDate={allScheduleInfo.startDate}
                        minTime={allScheduleInfo.timeInterval[0]}
                        maxTime={allScheduleInfo.timeInterval[1]}
                        timeFormat={"h:mma"}
                        renderDateCell={(time, selected, innerRef) => (
                            <div style={{ textAlign: 'center' }} ref={innerRef}>
                                {selected ? <CheckIcon style={{ color: "green" }} /> : <ClearIcon style={{ color: "red" }} />}
                            </div>
                        )}
                    />
                </div>}
            </Stack>
        </React.Fragment>
    );
}