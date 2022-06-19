import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import * as React from 'react';
import { useState } from 'react';
import './App.css';
import Home from "./components//Home";
import SignIn from "./components/SignIn";

function App() {
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
  // chec if window has local storage, TODO: can change to cookie later
  const isLoggedIn = () => {
    return !!window.localStorage.getItem('user-info'); // !! to cast to boolean
  }

  const [isValidUser, setIsValidUser] = useState(isLoggedIn());


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
