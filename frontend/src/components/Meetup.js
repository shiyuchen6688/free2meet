import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import * as React from 'react';
import ToolBar from './ToolBar';
import Container from '@mui/material/Container';
import CardContent from '@mui/material/CardContent';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { getMeetupAsync } from '../redux/meetups/thunks';
import { CircularProgress } from '@mui/material';


export default function Meetup() {
    const dispatch = useDispatch();
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const location = useLocation();
    const id = location.pathname.split("/")[2];

    const meetup = useSelector(state => state.meetupsReducer.meetup);
    useEffect(() => {
        dispatch(getMeetupAsync(id));
    }, [dispatch, id]);

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode: prefersDarkMode ? 'dark' : 'light',
                },
            }),
        [prefersDarkMode],
    );

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />

            <ToolBar />
            <Container component="main" sx={{ mb: 4 }}>
                {(meetup !== null && meetup !== undefined && Object.keys(meetup).length !== 0) ?
                    <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                        <Typography component="h1" variant="h4" align="center">
                            {meetup.title}
                        </Typography>
                        <Card variant="outlined">
                            <CardHeader
                                avatar={
                                    <Avatar 
                                        alt={meetup.creator.username} 
                                        src={meetup.creator.profilePictureLink}
                                    />
                                }
                                title={meetup.title}
                                subheader={`${meetup.schedule.schedule.length === 0 ? 'NA':meetup.schedule.schedule[0].split("T")[0]} 
                                            ${meetup.schedule.schedule.length === 0 ? 'NA':meetup.schedule.schedule[0].split("T")[1].split(":00.")[0]} - 
                                            ${meetup.schedule.schedule.length === 0 ? 'NA':meetup.schedule.schedule[meetup.schedule.schedule.length-1].split("T")[0]} 
                                            ${meetup.schedule.schedule.length === 0 ? 'NA':meetup.schedule.schedule[meetup.schedule.schedule.length-1].split("T")[1].split(":00.")[0]}`}
                            />
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    {meetup.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Paper>
                    :
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        minHeight="100vh"
                    >
                        <CircularProgress />
                    </Box>}
            </Container>
        </ThemeProvider>
    )
}