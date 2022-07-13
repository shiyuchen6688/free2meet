import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import * as React from 'react';
import ToolBar from './ToolBar';
import styled, { createGlobalStyle } from 'styled-components'
import ScheduleSelector from './timetable/ScheduleSelector';
import { useState } from 'react';



const GlobalStyle = createGlobalStyle`
body {
  font-family: sans-serif;
}

* {
  box-sizing: border-box;
}
`

const MainDiv = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`

const IntroText = styled.div`
width: 100%;
text-align: center;
`

const ScheduleSelectorCard = styled.div`
border-radius: 25px;
box-shadow: 10px 2px 30px rgba(0, 0, 0, 0.15);
padding: 20px;
width: 90%;
max-width: 800px;
& > * {
  flex-grow: 1;
}
`

const Links = styled.div`
display: flex;
margin-top: 20px;
`

const ExternalLink = styled.a`
background-color: ${props => props.color};
color: white;
padding: 10px;
border-radius: 3px;
cursor: pointer;
text-decoration: none;
margin: 5px;
`


let a = new Map();
a.set("2022-07-17T21:00:00.000Z", 10);
a.set("2022-07-17T21:30:00.000Z", 2);
a.set("2022-07-17T22:00:00.000Z", 1);
a.set("2022-07-17T22:30:00.000Z", 5);
a.set("2022-07-16T21:00:00.000Z", 1);
a.set("2022-07-16T21:30:00.000Z", 2);
a.set("2022-07-16T22:00:00.000Z", 3);
a.set("2022-07-16T22:30:00.000Z", 5);
a.set("2022-07-13T19:00:00.000Z", 4);
a.set("2022-07-13T19:30:00.000Z", 2);
a.set("2022-07-13T20:00:00.000Z", 1);
a.set("2022-07-13T20:30:00.000Z", 5);

export default function Meetups() {
    const [schedule, handleDateChange] = useState([]);
    // state = { schedule: [] };

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

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />

            <ToolBar />
            <h1>TODO: this page should display a list of meetups the user created or accepted</h1>
            <ScheduleSelectorCard>
          <ScheduleSelector
            pastSelection={a}
            minTime={12}
            maxTime={20}
            numDays={7}
            selection={schedule}
            onChange={(newSchedule) => {
                handleDateChange(newSchedule);
                }}
            hourlyChunks={2}
            timeFormat="h:mma"
            selectionScheme="linear"
          />
        </ScheduleSelectorCard>
        </ThemeProvider>
    )
}