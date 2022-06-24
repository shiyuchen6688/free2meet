import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATE } from '../utils';
import { getInvitationsAsync } from './thunks';

const INITIAL_STATE = {
    list: [],
    getInvitations: REQUEST_STATE.IDLE,
    error: null
};

const invitationsSlice = createSlice({
    name: 'invitations',
    initialState: INITIAL_STATE,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getInvitationsAsync.pending, (state) => {
                state.getMeetups = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(getInvitationsAsync.fulfilled, (state, action) => {
                state.getMeetups = REQUEST_STATE.FULFILLED;
                state.list = action.payload;
            })
            .addCase(getInvitationsAsync.rejected, (state, action) => {
                state.getMeetups = REQUEST_STATE.REJECTED;
                state.error = action.error;
            })
    }
});

export default invitationsSlice.reducer;