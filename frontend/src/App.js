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
        dispatch(loginWithTokenAsync());
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
