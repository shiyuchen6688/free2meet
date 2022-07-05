import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import * as React from 'react';
import ScheduleSelector from 'react-schedule-selector';
import CreatableSelect from 'react-select/creatable';
import "../App.css";
import Place from './Place';
import { useSelector, useDispatch } from 'react-redux';
import {changeInvitee} from '../redux/actions/actions';

export default function MeetupInvitation() {
    const dispatch = useDispatch();
    const titleAndDetailInfo = useSelector(state => state.createMeetupTitleDetailReducer);
    const allScheduleInfo = useSelector(state => state.createMeetupScheduleReducer);
    const locationInfo = useSelector(state => state.createMeetupLocationReducer);
    const invitationInfo = useSelector(state => state.createMeetupInvitationReducer);
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    // TODO: All frineds here.
    const options = [
        { value: 'friend_0', label: 'Sam', uid: 'sam@gmail.com' },
        { value: 'friend_1', label: 'Amy', uid: 'amy@gmail.com' },
        { value: 'friend_2', label: 'a', uid: 'a' },
        { value: 'friend_3', label: 'c', uid: 'c' }
    ];

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
                    Add Friends
                </Typography>
                <div>
                    <CreatableSelect className={prefersDarkMode ? 'dropdownMeunDark' : null}
                        isMulti
                        onChange={handleChange}
                        options={options}
                    />
                </div>
                <Typography variant="h6" gutterBottom>
                    Location {locationInfo.length === 0 ? "NA" : ""}
                </Typography>
                {locationInfo.map((item) => {
                    return (<Place key={item.place_id} item={item} />);
                })}
                <Typography variant="h6" gutterBottom>
                    Timezone: {allScheduleInfo.timezone.value === undefined ?
                        allScheduleInfo.timezone : allScheduleInfo.timezone.value}
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Time Availability {allScheduleInfo.schedule.length === 0 ? "NA" : ""}
                </Typography>
                {allScheduleInfo.schedule.length !== 0 && <div>
                    <ScheduleSelector
                        selection={allScheduleInfo.schedule}
                        numDays={allScheduleInfo.numDays}
                        startDate={allScheduleInfo.startDate}
                        minTime={allScheduleInfo.timeInterval[0]}
                        maxTime={allScheduleInfo.timeInterval[1]}
                        timeFormat={"h:mma"}
                        renderDateCell={(time, selected, innerRef) => (
                            <div style={{ textAlign: 'center' }} ref={innerRef}>
                                {selected ? '✅' : '❌'}
                            </div>
                        )}
                    />
                </div>}
            </Stack>
        </React.Fragment>
    );
}