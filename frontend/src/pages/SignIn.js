import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginAsync } from '../redux/users/thunks';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Avatar, Box, Button, CssBaseline, Grid, Link, 
    Paper, TextField, Typography, useMediaQuery } from '@mui/material';
import img from './signin.jpeg';

export default function SignIn({ setIsValidUser }) {
    const dispatch = useDispatch();
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

    // TODO: this is just a stub that does not validate password and username
    const onSignIn = (e) => {
        e.preventDefault()
        dispatch(loginAsync({
            email,
            password,
            setIsValidUser
        }))

    }

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: `url(${img})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />

                {/* Log in Form */}
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={12} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>

                        <Box component="form" noValidate sx={{ mt: 1 }}>
                            {/* Email Input */}
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoFocus
                            />
                            {/* Password Input */}
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                            />
                            {/* TODO: use cookie to remmeber user in the future */}
                            {/* <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            /> */}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={onSignIn}
                            >
                                Sign In
                            </Button>

                            <Grid container>
                                {/* Currently not supported */}
                                <Grid
                                    item
                                    xs
                                    sx={{
                                        display: "flex",
                                        justifyContent: "flex-start"
                                    }}
                                >
                                    <Link href="/verify?mode=resetPassword" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid
                                    item
                                    sx={{
                                        display: "flex",
                                        justifyContent: "flex-end"
                                    }}
                                >
                                    <Link href="/verify?mode=signup" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    )
}