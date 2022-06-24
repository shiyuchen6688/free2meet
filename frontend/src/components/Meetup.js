import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import * as React from 'react';
import ToolBar from './ToolBar';
import Container from '@mui/material/Container';
import CardContent from '@mui/material/CardContent';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { getMeetupAsync } from '../redux/meetups/thunks';


export default function Meetup() {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const dispatch = useDispatch();

    const location = useLocation();
    console.log(location);
    const id = location.pathname.split("/")[2];
    console.log(id);

    const meetup = useSelector(state => state.meetupsReducer.meetup);
    useEffect(() => {
        dispatch(getMeetupAsync(id));
    }, []);
    const state = useSelector(state => state);

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
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center">
                        {meetup.title}
                    </Typography>
                    <Grid
                        container
                        spacing={2}
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Card variant="outlined">
                            <CardHeader
                                avatar={
                                    <Avatar 
                                        alt={meetup.host.Name} 
                                        src={meetup.host.profilePictureLink}
                                    />
                                }
                                title={meetup.title}
                                subheader={`${meetup.startDate} ${meetup.startTime} - ${meetup.endDate} ${meetup.endTime}`}
                            />
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    {meetup.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Paper>
            </Container>
        </ThemeProvider>
    )
}