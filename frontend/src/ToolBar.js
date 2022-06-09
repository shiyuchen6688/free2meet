import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { useNavigate } from "react-router-dom";


export default function ToolBar() {
    const navigate = useNavigate();

    const onSignOut = () => {
        window.localStorage.removeItem('user-info');
        navigate("/");
        window.location.reload(false);
    }

    return (
        <AppBar
            position="static"
            color="default"
            sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        >
            <Toolbar sx={{ flexWrap: 'wrap' }}>
                <Typography variant="h6" color="inherit" noWrap align='left' sx={{ flexGrow: 1 }}>
                    free2meet
                </Typography>
                <nav>
                    <Link
                        component="button"
                        variant="button"
                        color="text.primary"
                        onClick={() => navigate("/")}
                        sx={{ my: 1, mx: 1.5 }}
                    >
                        Home
                    </Link>
                    <Link
                        component="button"
                        variant="button"
                        color="text.primary"
                        onClick={() => navigate("/meetups/new")}
                        sx={{ my: 1, mx: 1.5 }}
                    >
                        Schedule New Meetup
                    </Link>
                    <Link
                        component="button"
                        variant="button"
                        color="text.primary"
                        onClick={() => navigate("/meetups")}
                        sx={{ my: 1, mx: 1.5 }}
                    >
                        View Existing Meetups
                    </Link>
                    <Link
                        component="button"
                        variant="button"
                        color="text.primary"
                        onClick={() => navigate("/invitations")}
                        sx={{ my: 1, mx: 1.5 }}
                    >
                        View Invitations
                    </Link>
                    <Link
                        component="button"
                        variant="button"
                        color="text.primary"
                        // onClick={() => navigate("/meetups")} TODO: need to be updated to correct route
                        sx={{ my: 1, mx: 1.5 }}
                    >
                        View Full History
                    </Link>
                    <Link
                        component="button"
                        variant="button"
                        color="text.primary"
                        onClick={() => navigate("/explore")}
                        sx={{ my: 1, mx: 1.5 }}
                    >
                        Explore
                    </Link>
                </nav>
                <Button href="#" variant="outlined" sx={{ my: 1, mx: 1.5 }} onClick={onSignOut}>
                    Log out
                </Button>
            </Toolbar>
        </AppBar>
    )
}
