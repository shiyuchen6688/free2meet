import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import * as React from 'react';
import MeetupAvailability from './MeetupAvailability';
import MeetupInvitation from './MeetupInvitation';
import MeetupLocation from './MeetupLocation';
import MeetupTitleAndDetail from './MeetupTitleAndDetail';
import ToolBar from './ToolBar';
import Confetti from "react-confetti";
import { useSelector } from 'react-redux';

const steps = ['Title and Details', 'Availability', 'Location', 'Invitation'];

export default function CreateMeetup() {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode: prefersDarkMode ? 'dark' : 'light',
                },
            }),
        [prefersDarkMode],
    );

    const [activeStep, setActiveStep] = React.useState(0);

    // TODO: get value of all the form inputs in all steps
    let titleAndDetailInput = useSelector(state => state.createMeetupTitleDetailReducer)

    const handleNext = () => {
        setActiveStep(activeStep + 1);

        // TODO: if we finished the last step, we can submit to backend
        // this is just temporary to make sure that the form is correct
        if (activeStep === (steps.length - 1)) {

            // console.log(titleAndDetailInput);
        }
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
                return <MeetupLocation />;
            case 3:
                return <MeetupInvitation />;
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
                                <Confetti recycle={false} numberOfPieces={288}/>
                                <Typography variant="h5" gutterBottom>
                                    Your Meetup {titleAndDetailInput["meetup-title"]} has been created, enjoy!
                                </Typography>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    href="/meetups/new"
                                >
                                    Schedule another meetup
                                </Button>
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