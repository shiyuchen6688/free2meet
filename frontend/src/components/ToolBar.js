import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import { useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";

export default function ToolBar() {
    const theme = useTheme();
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
                        onClick={() => navigate("/history")}
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
                <IconButton sx={{ ml: 1 }} color="inherit">
                    {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}