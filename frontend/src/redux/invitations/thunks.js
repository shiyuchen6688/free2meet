import { createAsyncThunk } from '@reduxjs/toolkit';
import { actionTypes } from './actionTypes';
import InvitationsService from './service';

export const getInvitationsAsync = createAsyncThunk(
    actionTypes.GET_INVITATIONS,
    async (email) => {
        return await InvitationsService.getInvitations(email);
    }
);

export const acceptInvitationAsync = createAsyncThunk(
    actionTypes.ACCEPT_INVITATION,
    async (info) => {
        return await InvitationsService.acceptInvitation(info.email, info.invitationId);
    }
);

export const declineInvitationAsync = createAsyncThunk(
    actionTypes.DECLINE_INVITATION,
    async (info) => {
        return await InvitationsService.declineInvitation(info.email, info.invitationId);
    }
);

export const getInvitationsPendingAsync = createAsyncThunk(
    actionTypes.GET_INVITATIONS_PENDING,
    async (email) => {
        return await InvitationsService.getInvitationsPending(email);
    }
);

export const getInvitationsAcceptedAsync = createAsyncThunk(
    actionTypes.GET_INVITATIONS_ACCEPTED,
    async (email) => {
        return await InvitationsService.getInvitationsAccepted(email);
    }
);

export const getInvitationsDeclinedAsync = createAsyncThunk(
    actionTypes.GET_INVITATIONS_DECLINED,
    async (email) => {
        return await InvitationsService.getInvitationsDeclined(email);
    }
);

