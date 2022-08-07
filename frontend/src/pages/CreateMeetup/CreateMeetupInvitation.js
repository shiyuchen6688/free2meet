import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ScheduleSelector from 'react-schedule-selector';
import CreatableSelect from 'react-select/creatable';
import "../../App.css";
import { changeInvitee, changeTags } from '../../redux/actions/actions';
import { getFriendsAsync, getTagsAsync } from '../../redux/users/thunks';
import Place from '../../components/place/Place';

export default function MeetupInvitation() {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const dispatch = useDispatch();
    const titleAndDetailInfo = useSelector(state => state.createMeetupTitleDetailReducer);
    const allScheduleInfo = useSelector(state => state.createMeetupScheduleReducer);
    const locationInfo = useSelector(state => state.createMeetupLocationReducer);
    const currentUserEmail = useSelector(state => state.usersReducer.email);
    const friendList = useSelector(state => state.usersReducer.friends);
    const tagsList = useSelector(state => state.usersReducer.tags);
    const email = currentUserEmail;
    const text = titleAndDetailInfo["meetup-description"];

    React.useEffect(() => {
        // clear the state so that the frontend can be consistent with the redux state
        handleChangeInvitees([]);
        handleChangeTags([]);
    }, []);

    React.useEffect(() => {
        dispatch(getFriendsAsync(currentUserEmail));
    }, [dispatch, currentUserEmail]);

    React.useEffect(() => {
        dispatch(getTagsAsync({ email, text }));
    }, [dispatch, email, text]);

    const useableTags = tagsList.map(tag => {
        return { label: tag, value: tag };
    });

    const handleChangeInvitees = (newValue) => {
        dispatch(changeInvitee(newValue));
    };

    const handleChangeTags = (newValue) => {
        dispatch(changeTags(newValue));
    };

    return (
        <React.Fragment>
            <Stack direction="column" spacing={2}>
                <Typography variant="h6" gutterBottom>
                    Title: {titleAndDetailInfo["meetup-title"] === "" ? "NA" : titleAndDetailInfo["meetup-title"]}
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Description:
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
                        onChange={handleChangeInvitees}
                        options={friendList.map(friend => {
                            return { label: friend.username, value: friend.email };
                        })}
                    />
                </div>
                <Typography variant="h6" gutterBottom>
                    Add Tags:
                </Typography>
                <div>
                    <CreatableSelect className={prefersDarkMode ? 'dropdownMeunDark' : null}
                        isMulti
                        onChange={handleChangeTags}
                        options={useableTags}
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