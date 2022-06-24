import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { convertToRaw } from "draft-js";
import { changeMeetupTitleAndDetailForm } from '../redux/actions/actions'
// import { createTheme, ThemeProvider } from '@mui/material/styles'
import MUIRichTextEditor from 'mui-rte'

export default function MeetupTitleAndDetail() {
    const dispatch = useDispatch()
    const titleAndDetailInfo = useSelector(state => state.createMeetupTitleDetailReducer);

    let onChangeHandler = e => {
        dispatch(changeMeetupTitleAndDetailForm(e.target.value, e.target.name))
    }
    let onChangeHandlerMuiRte = value => {
        const text = JSON.stringify(value.getCurrentContent().getPlainText())
        const content = JSON.stringify(
            convertToRaw(value.getCurrentContent())
        );
        console.log(value)
        console.log(content)
        // const rteContent = convertToRaw(e.getCurrentContent()) // for rte content with text formating
        console.log(text)
        // rteContent && setValue(JSON.stringify(rteContent)) // store your rteContent to state
        dispatch(changeMeetupTitleAndDetailForm(content, 'meetup-description'))
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
                {/* <TextField
                    placeholder="Describe your meetup"
                    id="meetup-description"
                    name="meetup-description"
                    multiline
                    fullWidth
                    rows={12}
                    defaultValue={titleAndDetailInfo["meetup-description"]}
                    onChange={onChangeHandlerMuiRte}
                /> */}
                <MUIRichTextEditor
                    placeholder="Describe your meetup"
                    id="meetup-description"
                    name="meetup-description"
                    multiline
                    fullWidth
                    rows={12}
                    value={titleAndDetailInfo["meetup-description"]}
                    onChange={onChangeHandlerMuiRte}
                />
            </Grid>
        </ >
    );
}