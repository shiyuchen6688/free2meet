import * as React from 'react';
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ScheduleSelector from 'react-schedule-selector';

export default function MeetupInvitation() {
    /* These are some fake data */
    const [schedule, handleScheduleChange] = useState(
        ['Sat Jun 11 2022 09:00:00 GMT-0700 (Pacific Daylight Time)',
         'Sat Jun 11 2022 10:00:00 GMT-0700 (Pacific Daylight Time)', 
         'Sat Jun 11 2022 11:00:00 GMT-0700 (Pacific Daylight Time)', 
         'Sat Jun 11 2022 12:00:00 GMT-0700 (Pacific Daylight Time)',
         'Mon Jun 13 2022 13:00:00 GMT-0700 (Pacific Daylight Time)', 
         'Mon Jun 13 2022 14:00:00 GMT-0700 (Pacific Daylight Time)',
         'Mon Jun 13 2022 15:00:00 GMT-0700 (Pacific Daylight Time)']
    );
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Shipping address
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="firstName"
                        name="firstName"
                        label="First name"
                        fullWidth
                        autoComplete="given-name"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="lastName"
                        name="lastName"
                        label="Last name"
                        fullWidth
                        autoComplete="family-name"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="address1"
                        name="address1"
                        label="Address line 1"
                        fullWidth
                        autoComplete="shipping address-line1"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="address2"
                        name="address2"
                        label="Address line 2"
                        fullWidth
                        autoComplete="shipping address-line2"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="city"
                        name="city"
                        label="City"
                        fullWidth
                        autoComplete="shipping address-level2"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="state"
                        name="state"
                        label="State/Province/Region"
                        fullWidth
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="zip"
                        name="zip"
                        label="Zip / Postal code"
                        fullWidth
                        autoComplete="shipping postal-code"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="country"
                        name="country"
                        label="Country"
                        fullWidth
                        autoComplete="shipping country"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                        label="Use this address for payment details"
                    />
                </Grid>
            </Grid>
            <div>
                <ScheduleSelector
                    selection={schedule}
                    numDays={7}
                    minTime={9}
                    maxTime={17}
                    startDate={new Date()}
                    dateFormat="ddd M/D"
                    renderDateCell={(time, selected, innerRef) => (
                        <div style={{ textAlign: 'center' }} ref={innerRef}>
                          {selected ? '✅' : '❌'}
                        </div>
                    )}
                    onChange={(newSchedule) => {
                        handleScheduleChange(newSchedule);
                    }}
                />
            </div>
        </React.Fragment>
    );
}