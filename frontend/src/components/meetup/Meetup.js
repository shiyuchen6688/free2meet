import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { getMeetupAsync } from '../../redux/meetups/thunks';
import ToolBar from '../ToolBar';


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
                Media: {
                    height: '100%',
                    width: '100%'
                }
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
                        <Typography component="h1" variant="h4" align="center" style={{ wordWrap: 'break-word' }}>
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
                                subheader={`${meetup.schedule.schedule === undefined || Object.keys(meetup.schedule.schedule).length === 0 ? 'NA' : Object.keys(meetup.schedule.schedule)[0].split("T")[0]} 
                                            ${meetup.schedule.schedule === undefined || Object.keys(meetup.schedule.schedule).length === 0 ? 'NA' : Object.keys(meetup.schedule.schedule)[0].split("T")[1].split(":00.")[0]} - 
                                            ${meetup.schedule.schedule === undefined || Object.keys(meetup.schedule.schedule).length === 0 ? 'NA' : Object.keys(meetup.schedule.schedule)[Object.keys(meetup.schedule.schedule).length - 1].split("T")[0]} 
                                            ${meetup.schedule.schedule === undefined || Object.keys(meetup.schedule.schedule).length === 0 ? 'NA' : Object.keys(meetup.schedule.schedule)[Object.keys(meetup.schedule.schedule).length - 1].split("T")[1].split(":00.")[0]}`}
                            />
                            <CardContent>
                                <CardMedia
                                    component="img"
                                    width="100%"
                                    image={meetup.meetupImage}
                                />
                                <Typography variant="body2" color="text.secondary" style={{ wordWrap: 'break-word' }}>
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