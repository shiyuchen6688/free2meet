import { createAsyncThunk } from '@reduxjs/toolkit';
import { actionTypes } from './actionTypes';
import MeetupsService from './service';


export const getMeetupsAsync = createAsyncThunk(
    actionTypes.GET_MEETUPS,
    async ({filterPeopleOption, filterByPerson, email}) => {
        console.log(filterByPerson);
        return await MeetupsService.getMeetups(filterPeopleOption, filterByPerson, email);
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

export const addImageAsync = createAsyncThunk(
    actionTypes.ADD_IMAGE,
    async (image) => {
        return await MeetupsService.addImage(image)
    }
)