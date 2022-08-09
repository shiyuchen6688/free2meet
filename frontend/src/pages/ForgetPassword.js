import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { registerAsync } from '../redux/users/thunks';
import EmailValidator from 'email-validator';
import {useNavigate} from 'react-router-dom';
import auth from '../firebase';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Button, CssBaseline, Grid, Paper, 
    TextField, Typography, useMediaQuery } from '@mui/material';

export default function ForgetPassword() {
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
    const [password, setPassword] = useState("")
    const [validEmail, setValidEmail] = useState(true);
    const [validPassword, setValidPassword] = useState(true);
    const [verified, setVerified] = useState(false);
    const [verifiedEmailSent, setVerifiedEmailSent] = useState(false);

    // declare the data fetching function
    const relodaUser = async () => {
        await auth.currentUser.reload();
    }

    const signOutUser = async () => {
        console.log(auth.currentUser);
        if (auth.currentUser !== null) {
            await auth.signOut();
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            console.log(auth.currentUser);
            const currentURL = new URL(window.location.href);
            const oobCode = currentURL.searchParams.get("oobCode");
            console.log(oobCode);
            if (verifiedEmailSent) {
                console.log("verifiedEmailSent");
                relodaUser().then(() => {
                    setVerified(auth.currentUser.emailVerified);
                    console.log(auth.currentUser)
                })
            }
        }, 1000);
        return () => {
          clearInterval(interval);
        };
    }, [verifiedEmailSent]);


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
            if (!(validEmail && validPassword) || email === "" || password === "") {
                if (!EmailValidator.validate(email) || email === "") {
                    setValidEmail(false);
                }
                if (password === "") {
                    setValidPassword(false);
                }
                return false;
            } else {
                dispatch(registerAsync({
                    email,
                    password
                }))
                navigate("/")
            }
        } else {
            alert("Please verify your email first")
        }
    }

    const emailVerification = () => {
        signOutUser().then(() => {
            console.log("signOutUser");
            auth.sendSignInLinkToEmail(email, actionCodeSettings).then(() => {
                setVerifiedEmailSent(true);
            }).catch(error => {
                console.log(error)
            })
        }).catch(error => {
            console.log(error)
        })
    }

    const actionCodeSettings = {
        url: 'http://localhost:3000/forget-password',
        handleCodeInApp: true,
    };

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
                            Reset Password
                        </Typography>

                        <Box component="form" noValidate sx={{ mt: 1 }}>
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
                                variant={(!(validEmail && validPassword) || email === "" || password === "") ? "outlined" : "contained"}
                                sx={{ mt: 3, mb: 2 }}
                                onClick={emailVerification}
                            >
                                Send Verification Email
                            </Button>
                            <Button
                                fullWidth
                                variant={(!(validEmail && validPassword && verifiedEmailSent && verified) || email === "" || password === "") ? "outlined" : "contained"}
                                sx={{ mt: 3, mb: 2 }}
                                onClick={onSubmit}
                            >
                                Reset Password
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    )
} 