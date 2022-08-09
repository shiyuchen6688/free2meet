import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATE } from '../utils';
import {
    acceptInvitationAsync, declineInvitationAsync, getInvitationsAcceptedAsync,
    getInvitationsAsync, getInvitationsDeclinedAsync, getInvitationsPendingAsync
} from './thunks';

const INITIAL_STATE = {
    list: [],
    invitationsPending: [],
    invitationsAccepted: [],
    invitationsDeclined: [],
    getInvitations: REQUEST_STATE.IDLE,
    getInvitationsPending: REQUEST_STATE.IDLE,
    getInvitationsAccepted: REQUEST_STATE.IDLE,
    getInvitationsDeclined: REQUEST_STATE.IDLE,
    acceptInvitation: REQUEST_STATE.IDLE,
    declineInvitation: REQUEST_STATE.IDLE,
    error: null
};

const invitationsSlice = createSlice({
    name: 'invitations',
    initialState: INITIAL_STATE,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getInvitationsAsync.pending, (state) => {
                state.getInvitations = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(getInvitationsAsync.fulfilled, (state, action) => {
                state.getInvitations = REQUEST_STATE.FULFILLED;
                state.list = action.payload;
            })
            .addCase(getInvitationsAsync.rejected, (state, action) => {
                state.getInvitations = REQUEST_STATE.REJECTED;
                state.error = action.error;
            })
            .addCase(getInvitationsAcceptedAsync.pending, (state) => {
                state.getInvitationsAccepted = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(getInvitationsAcceptedAsync.fulfilled, (state, action) => {
                state.getInvitationsAccepted = REQUEST_STATE.FULFILLED;
                state.invitationsAccepted = action.payload;
            })
            .addCase(getInvitationsAcceptedAsync.rejected, (state, action) => {
                state.getInvitationsAccepted = REQUEST_STATE.REJECTED;
                state.error = action.error;
            })
            .addCase(getInvitationsDeclinedAsync.pending, (state) => {
                state.getInvitationsDeclined = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(getInvitationsDeclinedAsync.fulfilled, (state, action) => {
                state.getInvitationsDeclined = REQUEST_STATE.FULFILLED;
                state.invitationsDeclined = action.payload;
            })
            .addCase(getInvitationsDeclinedAsync.rejected, (state, action) => {
                state.getInvitationsDeclined = REQUEST_STATE.REJECTED;
                state.error = action.error;
            })
            .addCase(getInvitationsPendingAsync.pending, (state) => {
                state.getInvitationsPending = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(getInvitationsPendingAsync.fulfilled, (state, action) => {
                state.getInvitationsPending = REQUEST_STATE.FULFILLED;
                state.invitationsPending = action.payload;
            })
            .addCase(getInvitationsPendingAsync.rejected, (state, action) => {
                state.getInvitationsPending = REQUEST_STATE.REJECTED;
                state.error = action.error;
            })
            .addCase(acceptInvitationAsync.pending, (state) => {
                state.acceptInvitation = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(acceptInvitationAsync.fulfilled, (state, action) => {
                state.acceptInvitation = REQUEST_STATE.FULFILLED;
                state.invitationsPending = action.payload.invitationsPending;
                state.invitationsAccepted = action.payload.invitationsAccepted;
                state.invitationsDeclined = action.payload.invitationsDeclined;
            })
            .addCase(acceptInvitationAsync.rejected, (state, action) => {
                state.acceptInvitation = REQUEST_STATE.REJECTED;
                state.error = action.error;
            })
            .addCase(declineInvitationAsync.pending, (state) => {
                state.declineInvitation = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(declineInvitationAsync.fulfilled, (state, action) => {
                state.declineInvitation = REQUEST_STATE.FULFILLED;
                state.invitationsPending = action.payload.invitationsPending;
                state.invitationsDeclined = action.payload.invitationsDeclined;
                state.invitationsAccepted = action.payload.invitationsAccepted;
            })
            .addCase(declineInvitationAsync.rejected, (state, action) => {
                state.declineInvitation = REQUEST_STATE.REJECTED;
                state.error = action.error;
            });
    }
});

export default invitationsSlice.reducer;