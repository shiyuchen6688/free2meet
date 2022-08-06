import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import * as React from 'react';
import { useState } from 'react';
import './App.css';
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import { useDispatch, useSelector } from 'react-redux';
import { loginWithTokenAsync } from './redux/users/thunks';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import { REQUEST_STATE } from './redux/utils';

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
    // chec if window has local storage, TODO: can change to cookie later
    const isLoggedIn = () => {
        return !!window.localStorage.getItem('token'); // !! to cast to boolean
    }

    // // remove token when user information is null
    // let username = useSelector(state => state.usersReducer.username);
    // if (username == null) {
    //     window.localStorage.removeItem('token');
    // }



    const [isValidUser, setIsValidUser] = useState(isLoggedIn());

    // if user information is null, get information use token if it exist
    let username = useSelector(state => state.usersReducer.username);
    if (isValidUser && username === null) {
        console.log("before login with token", isLoggedIn())
        dispatch(loginWithTokenAsync())
        console.log("after login with token", isLoggedIn())
    }

    // wait for token login to finish if needed
    let tokenLoginStatus = useSelector(state => state.usersReducer.loginWithToken);

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
