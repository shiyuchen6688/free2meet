import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export default function SignIn({ setIsValidUser }) {
    // TODO: this is just a stub that does not validate password and username
    const onSignIn = (e) => {
        e.preventDefault()
        setIsValidUser(true)
        // store window local storage to persist signin state, TODO: cookie later
        window.localStorage.setItem('user-info', JSON.stringify({}));

    }

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />

                {/* Icon */}
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://thumbs.dreamstime.com/b/friends-gathering-group-cheerful-young-people-enjoying-food-drinks-spending-nice-time-cofortable-chairs-home-78185609.jpg)',
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
                                    <Link href="#" variant="body2">
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
                                    <Link href="/signup" variant="body2">
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