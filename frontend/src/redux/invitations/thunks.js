import { createAsyncThunk } from '@reduxjs/toolkit';
import { actionTypes } from './actionTypes';
import InvitationsService from './service';

export const getInvitationsAsync = createAsyncThunk(
    actionTypes.GET_INVITATIONS,
    async () => {
        return await InvitationsService.getInvitations();
    }
);
