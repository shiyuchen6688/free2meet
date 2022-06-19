import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATE } from '../utils';
import { addMeetupAsync, getMeetupsAsync } from './thunks';

const INITIAL_STATE = {
    list: [],
    getMeetups: REQUEST_STATE.IDLE,
    addMeetup: REQUEST_STATE.IDLE,
    error: null
};

const meetupsSlice = createSlice({
    name: 'meetups',
    initialState: INITIAL_STATE,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getMeetupsAsync.pending, (state) => {
                state.getMeetups = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(getMeetupsAsync.fulfilled, (state, action) => {
            })
            .addCase(getMeetupsAsync.rejected, (state, action) => {
            })
    }
});