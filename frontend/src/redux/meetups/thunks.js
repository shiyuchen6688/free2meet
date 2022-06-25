import { createAsyncThunk } from '@reduxjs/toolkit';
import { actionTypes } from './actionTypes';
import MeetupsService from './service';


export const getMeetupsAsync = createAsyncThunk(
    actionTypes.GET_MEETUPS,
    async () => {
        return await MeetupsService.getMeetups();
    }
);

export const addMeetupAsync = createAsyncThunk(
    actionTypes.ADD_MEETUP,
    async (meetup) => {
        return await MeetupsService.addMeetup(meetup)
    }
)

export const getMeetupAsync = createAsyncThunk(
    actionTypes.GET_MEETUP,
    async (id) => {
        return await MeetupsService.getMeetup(id);
    }
)