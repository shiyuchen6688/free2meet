import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import ToolBar from './ToolBar';
import Typography from '@mui/material/Typography';
import TimeLine from './TimeLine';
import { useDispatch, useSelector } from 'react-redux';
import { getMeetupsCreatedAsync } from '../redux/meetups/thunks';
import {useEffect} from 'react';

export default function Home() {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.usersReducer);
    const createdMeetups = useSelector(state => state.usersReducer.meetupsCreated);

    useEffect(() => {
        dispatch(getMeetupsCreatedAsync(currentUser.email));
    }, [dispatch, currentUser.email]);
    return (
        <>
            <CssBaseline />
            <ToolBar />


        </>
    )
}