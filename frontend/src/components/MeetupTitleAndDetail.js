import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { changeMeetupTitleAndDetailForm } from '../redux/actions/actions'

export default function MeetupTitleAndDetail() {
    const dispatch = useDispatch()
    const titleAndDetailInfo = useSelector(state => state.createMeetupTitleDetailReducer);

    let onChangeHandler = e => {
        dispatch(changeMeetupTitleAndDetailForm(e.target.value, e.target.name))
    }


    return (
        <>
            <Typography variant="h6" gutterBottom>
                Title
            </Typography>
            <Grid xs={12} sm={6} sx={{ mb: "3%" }} item={true}>
                <TextField
                    required
                    id="meetup-title"
                    name="meetup-title"
                    label="Meetup Title"
                    fullWidth
                    variant="standard"
                    defaultValue={titleAndDetailInfo["meetup-title"]}
                    onChange={onChangeHandler}
                />
            </Grid>


            {/* Description Input */}
            <Typography variant="h6" gutterBottom>
                Description
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
                Maximum 1000 characters.
            </Typography>
            <Grid xs={12} sm={6} item={true}>
                <TextField
                    placeholder="Describe your meetup"
                    id="meetup-description"
                    name="meetup-description"
                    multiline
                    fullWidth
                    rows={12}
                    defaultValue={titleAndDetailInfo["meetup-description"]}
                    onChange={onChangeHandler}
                />
            </Grid>
        </ >
    );
}