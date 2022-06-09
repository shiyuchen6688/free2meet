import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function MeetupTitleAndDetail() {
    return (
        <>
            <Typography variant="h6" gutterBottom>
                Title
            </Typography>
            <Grid xs={12} sm={6} sx={{ mb: "3%" }} item={true}>
                <TextField
                    required
                    id="meetupName"
                    name="meetupName"
                    label="Meetup name"
                    fullWidth
                    variant="standard"
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
                    id="meetupDescription"
                    name="meetupDescription"
                    multiline
                    fullWidth
                    rows={12}
                    maxRows={Infinity}
                />
            </Grid>
        </ >
    );
}