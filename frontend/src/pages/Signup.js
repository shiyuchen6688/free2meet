import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerAsync } from '../redux/users/thunks';
import EmailValidator from 'email-validator';
import {useNavigate} from 'react-router-dom';
import auth from '../firebase';
import { useEffect } from 'react';

export default function Signup() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
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

    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [validEmail, setValidEmail] = useState(true);
    const [validUsername, setValidUsername] = useState(true);
    const [validPassword, setValidPassword] = useState(true);
    const [verified, setVerified] = useState(false);
    const [verifiedEmailSent, setVerifiedEmailSent] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            if (verifiedEmailSent) {
                auth.currentUser.reload();
                auth.onAuthStateChanged(function(user) {
                    setVerified(user.emailVerified);
                });
            }
        }, 1000);
        return () => {
          clearInterval(interval);
        };
    }, []);


    const onSubmit = () => {
        if (!auth.currentUser.emailVerified) {
            auth.onAuthStateChanged(function(user) {
                setVerified(user.emailVerified);
            });
        } else {
            setVerified(auth.currentUser.emailVerified);
        }
        console.log(verified);
        if (verified) {
            if (!(validEmail && validUsername && validPassword) || email === "" || username === "" || password === "") {
                if (!EmailValidator.validate(email) || email === "") {
                    setValidEmail(false);
                }
                if (username === "") {
                    setValidUsername(false);
                }
                if (password === "") {
                    setValidPassword(false);
                }
                return false;
            } else {
                dispatch(registerAsync({
                    email,
                    username,
                    password
                }))
                navigate("/")
            }
        } else {
            alert("Please verify your email first")
        }
    }

    const emailverification = () => {
        auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential)=>{
            // send verification mail.
            userCredential.user.sendEmailVerification();
            setVerifiedEmailSent(true);
            console.log(userCredential);
            console.log(auth.currentUser);
        })
        .catch(alert);
    }

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                {/* Sign up Form */}
                <Grid item xs={12} sm={12} md={12} component={Paper} elevation={12} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            Create an account
                        </Typography>

                        <Box component="form" noValidate sx={{ mt: 1 }}>
                            {/* User Name Input */}
                            <TextField
                                error={!validUsername}
                                onFocus={() => setValidUsername(true)}
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="User Name"
                                name="username"
                                autoFocus
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            {/* Email Input */}
                            <TextField
                                error={!validEmail}
                                onBlur={() => email === "" ? setValidEmail(true) : setValidEmail(EmailValidator.validate(email))}
                                onFocus={() => setValidEmail(true)}
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {/* Password Input */}
                            <TextField
                                error={!validPassword}
                                onFocus={() => setValidPassword(true)}
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button
                                fullWidth
                                variant={(!(validEmail && validUsername && validPassword) || email === "" || username === "" || password === "") ? "outlined" : "contained"}
                                sx={{ mt: 3, mb: 2 }}
                                onClick={emailverification}
                            >
                                Send Verification Email
                            </Button>
                            <Button
                                fullWidth
                                variant={(!(validEmail && validUsername && validPassword && verifiedEmailSent && verified) || email === "" || username === "" || password === "") ? "outlined" : "contained"}
                                sx={{ mt: 3, mb: 2 }}
                                onClick={onSubmit}
                            >
                                Sign Up
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    )
} 