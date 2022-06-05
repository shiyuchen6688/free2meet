import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ToolBar from './ToolBar';



export default function Home() {


    return (
        <>
            <CssBaseline />

            <ToolBar />

            {/* Page Content */}
            <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
                <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="text.primary"
                    gutterBottom
                >
                    Home
                </Typography>
                <Typography variant="h5" align="center" color="text.secondary" component="p">
                    Here are your meetup history!
                </Typography>
            </Container>


        </>
    )
}