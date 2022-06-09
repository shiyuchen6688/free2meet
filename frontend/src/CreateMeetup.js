

import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import ToolBar from './ToolBar'
import MeetupAvailability from './MeetupAvailability';
import MeetupInvitation from './MeetupInvitation';
import MeetupTitleAndDetail from './MeetupTitleAndDetail';
import MeetupLocation from './MeetupLocation';

const theme = createTheme();

const steps = ['Title and Details', 'Availability', 'Invitation', 'Location'];

export default function CreateMeetup() {
    const theme = createTheme();

    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    function getStepContent(step) {
        switch (step) {
            case 0:
                return <MeetupTitleAndDetail />;
            case 1:
                return <MeetupAvailability />;
            case 2:
                return <MeetupInvitation />;
            case 3:
                return <MeetupLocation />;
            default:
                throw new Error('Unknown step');
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <ToolBar />
            <Container component="main" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center">
                        Create New Meetup
                    </Typography>

                    {/* Display title of each step */}
                    <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>


                    <>
                        {/* Check if we finished all the steps */}
                        {activeStep === steps.length ? (
                            <>
                                <Typography variant="h5" gutterBottom>
                                    Your Meetup has been created, enjoy!
                                </Typography>
                            </>
                        ) : (
                            <>
                                {getStepContent(activeStep)}

                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    {activeStep !== 0 && (
                                        <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                            Back
                                        </Button>
                                    )}

                                    <Button
                                        variant="contained"
                                        onClick={handleNext}
                                        sx={{ mt: 3, ml: 1 }}
                                    >
                                        {activeStep === steps.length - 1 ? 'Confirm and Create' : 'Next'}
                                    </Button>
                                </Box>
                            </>
                        )}
                    </>
                </Paper>
            </Container>
        </ThemeProvider>
    )
}