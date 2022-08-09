import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import { loginWithTokenAsync } from './redux/users/thunks';

function App() {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const dispatch = useDispatch();

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode: prefersDarkMode ? 'dark' : 'light',
                },
            }),
        [prefersDarkMode],
    );
    // check if window has local storage
    const isLoggedIn = () => {
        return !!window.localStorage.getItem('token'); // !! to cast to boolean
    }

    const [isValidUser, setIsValidUser] = useState(isLoggedIn());

    // if user information is null, get information use token if it exist
    let username = useSelector(state => state.usersReducer.username);
    if (isValidUser && username === null) {
        console.log("before login with token", isLoggedIn())
        dispatch(loginWithTokenAsync())
        console.log("after login with token", isLoggedIn())
    }

    // wait for token login to finish if needed
    while (isValidUser && username === null) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
            >
                <CircularProgress />
            </Box>
        )
    }

    // if user is still null, token should be removed since it's invalid
    if (username === null) {
        window.localStorage.removeItem('token');
    }

    // if not signed in
    if (!isValidUser) {
        return <SignIn setIsValidUser={setIsValidUser} />
    }

    // alredy sign in
    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <Home />
            </div>
        </ThemeProvider>
    );
}

export default App;
