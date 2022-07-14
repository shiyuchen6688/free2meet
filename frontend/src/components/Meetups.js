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


let b = {
    "2022-07-16T15:00:00.000Z": 5,
    "2022-07-16T16:00:00.000Z": 4,
    "2022-07-16T17:00:00.000Z": 3,
    "2022-07-16T18:00:00.000Z": 1,
    "2022-07-16T19:00:00.000Z": 1,
    "2022-07-16T20:00:00.000Z": 2,
    "2022-07-16T21:00:00.000Z": 1,
    "2022-07-16T22:00:00.000Z": 4,
    "2022-07-16T23:00:00.000Z": 1,
    "2022-07-17T00:00:00.000Z": 1
}

export default function Meetups() {
    const [schedule, handleDateChange] = useState([]);

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
            pastSelection={b}
            minTime={8}
            maxTime={20}
            numDays={7}
            selection={schedule}
            onChange={handleDateChange}
            hourlyChunks={1}
            timeFormat="h:mma"
            selectionScheme="linear"
          />
        </ScheduleSelectorCard>
        </ThemeProvider>
    )
}