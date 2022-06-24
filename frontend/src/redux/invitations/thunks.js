import { createAsyncThunk } from '@reduxjs/toolkit';
import { actionTypes } from './actionTypes';
import InvitationsService from './service';

export const getInvitationsAsync = createAsyncThunk(
    actionTypes.GET_MEETUPS,
    async () => {
        return await InvitationsService.getInvitations();
    }
);
