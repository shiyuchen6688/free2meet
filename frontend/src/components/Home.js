import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import ToolBar from './ToolBar';
import Typography from '@mui/material/Typography';
import TimeLine from './TimeLine';

let recentMeetupList = [
    {
        title: "Move",
        time: "2 day(s) ago",
        isOver: true
    }, {
        title: "Burger",
        time: "1 day(s) ago",
        isOver: true
    }, {
        title: "Project Planning",
        time: "today",
        isOver: false
    }, {
        title: "Scrum Meeting",
        time: "In 2 day(s)",
        isOver: false
    }
]

recentMeetupList.reverse();

export default function Home() {


    return (
        <>
            <CssBaseline />

            <ToolBar />

            {/* Page Content */}
            <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
                <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="text.primary"
                    gutterBottom
                >
                    Home
                </Typography>
                <Typography variant="h5" align="center" color="text.secondary" component="p">
                    Here are your recent meetups within 5 days!
                </Typography>
            </Container>

            <TimeLine itemList={recentMeetupList} />

        </>
    )
}