import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { forgetPasswordAsync } from '../redux/users/thunks';
import EmailValidator from 'email-validator';
import { useNavigate } from 'react-router-dom';
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

    const currentURL = new URL(window.location.href);
    const oobCode = currentURL.searchParams.get('oobCode');
    const resetPassWordBool = oobCode === null ? false : true;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validEmail, setValidEmail] = useState(true);
    const [validPassword, setValidPassword] = useState(true);
    const [verified, setVerified] = useState(false);
    const [verifiedEmailSent, setVerifiedEmailSent] = useState(false);
    const [confirmChange, setConfirmChange] = useState(false);

    useEffect(() => {
        if (resetPassWordBool) {
            auth.verifyPasswordResetCode(oobCode).then(function(email) {
                setEmail(email);
                setVerified(true);
            }).catch(function(error) {
                console.log(error);
            });
        }
    }, [resetPassWordBool, oobCode]);

    useEffect(() => {
        if (verified && confirmChange) {
            auth.confirmPasswordReset(oobCode, password).catch(function(error) {
                console.log(error);
            });
        }
    }, [confirmChange, oobCode, password, verified]);

    const signOutUser = async () => {
        console.log(auth.currentUser);
        if (auth.currentUser !== null) {
            await auth.signOut();
        }
    }

    const onSubmit = () => {
        console.log(verified);
        if (verified) {
            if (!(validEmail && validPassword) || password === "") {
                if (password === "" || password.length < 6) {
                    setValidPassword(false);
                }
                return false;
            } else {
                setConfirmChange(true);
                dispatch(forgetPasswordAsync({
                    email,
                    password
                }))
                navigate("/");
            }
        } else {
            alert("Please verify your email first");
        }
    }

    const emailVerification = () => {
        signOutUser().then(() => {
            console.log("signOutUser");
            auth.sendPasswordResetEmail(email, actionCodeSettings).then(() => {
                setVerifiedEmailSent(true);
            }).catch(error => {
                console.log(error)
            })
        }).catch(error => {
            console.log(error)
        })
    }

    const actionCodeSettings = {
        url: process.env.NODE_ENV === 'production' ? 'https://free2meet.herokuapp.com/forget-password' : "http://" + currentURL.host + "/forget-password",
        handleCodeInApp: false,
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
                            {resetPassWordBool ? 
                            <TextField
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={email === "" ? "INVALID" : email}
                                disabled={true}
                            /> : 
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
                                />}
                            {/* Password Input */}
                            {resetPassWordBool && <TextField
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
                            />}
                            {!resetPassWordBool && <Button
                                fullWidth
                                variant={(!(validEmail && validPassword) || email === "" || password === "") ? "outlined" : "contained"}
                                sx={{ mt: 3, mb: 2 }}
                                onClick={emailVerification}
                            >
                                Send Verification Email
                            </Button>}
                            {resetPassWordBool && <Typography variant='h5' sx={{ mt: 3, mb: 2 }}>
                                Your email has been verified. You will be redirected to login page once you click the button below.
                            </Typography>}
                            {resetPassWordBool && <Button
                                fullWidth
                                variant={(!(validEmail && validPassword && verifiedEmailSent && verified) || email === "" || password === "") ? "outlined" : "contained"}
                                sx={{ mt: 3, mb: 2 }}
                                onClick={onSubmit}
                            >
                                Reset Password
                            </Button>}
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    )
} 