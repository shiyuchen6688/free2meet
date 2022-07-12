import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { App as SendbirdApp } from "sendbird-uikit";
import "sendbird-uikit/dist/index.css";
import ToolBar from './ToolBar';

export default function Explore() {
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

    const APP_ID = "CB108BAB-EB6F-4BA7-A7C5-40E73836AAE1";
    const currentUser = useSelector(state => state.usersReducer);
    const USER_ID = currentUser.email;
    const NICKNAME = currentUser.email;
    const THEME = prefersDarkMode ? 'dark' : 'light';
    
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <ToolBar />
            <div className="customized-app">
                <SendbirdApp
                    appId={APP_ID}
                    userId={USER_ID}
                    nickname={NICKNAME}
                    theme={THEME}
                    useReaction={true}
                    useMessageGrouping={true}
                />
            </div>
        </ThemeProvider>
    )
}