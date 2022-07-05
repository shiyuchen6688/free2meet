import { createAsyncThunk } from '@reduxjs/toolkit';
import { actionTypes } from './actionTypes';
import UsersService from './service';


export const loginAsync = createAsyncThunk(
    actionTypes.LOGIN,
    async (user) => {
        return await UsersService.login(user);
    }
);

export const registerAsync = createAsyncThunk(
    actionTypes.REGISTER,
    async (user) => {
        return await UsersService.register(user)
    }
);

export const resetPasswordAsync = createAsyncThunk(
    actionTypes.RESET_PASSWORD,
    async (email, password) => {
        return await UsersService.resetPassword(email, password)
    }
);

export const getMeetupsCreatedAsync = createAsyncThunk(
    actionTypes.GET_MEETUPS_CREATED,
    async (email) => {
        return await UsersService.getMeetupsCreated(email)
    }
);

export const getMeetupsPendingAsync = createAsyncThunk(
    actionTypes.GET_MEETUPS_PENDING,
    async (email) => {
        return await UsersService.getMeetupsPending(email)
    }
);

export const getMeetupsAcceptedAsync = createAsyncThunk(
    actionTypes.GET_MEETUPS_ACCEPTED,
    async (email) => {
        return await UsersService.getMeetupsAccepted(email)
    }
);

export const getMeetupsDeclinedAsync = createAsyncThunk(
    actionTypes.GET_MEETUPS_DECLINED,
    async (email) => {
        return await UsersService.getMeetupsDeclined(email)
    }
);

export const acceptMeetupAsync = createAsyncThunk(
    actionTypes.ACCEPT_MEETUP,
    async (email, meetupId, availableLocations, availableTimeSlots) => {
        return await UsersService.acceptMeetup(email, meetupId, availableLocations, availableTimeSlots)
    }
);

export const declineMeetupAsync = createAsyncThunk(
    actionTypes.DECLINE_MEETUP,
    async (email, meetupId) => {
        return await UsersService.declineMeetup(email, meetupId)
    }
);

export const getFriendsAsync = createAsyncThunk(
    actionTypes.GET_FRIENDS,
    async (email) => {
        return await UsersService.getFriends(email)
    }
);

export const getFriendRequestsAsync = createAsyncThunk(
    actionTypes.GET_FRIEND_REQUESTS,
    async (email) => {
        return await UsersService.getFriendRequests(email)
    }
);

export const getFriendRequestsSentAsync = createAsyncThunk(
    actionTypes.GET_FRIEND_REQUESTS_SENT,
    async (email) => {
        return await UsersService.getFriendRequestsSent(email)
    }
);

export const acceptFriendRequestAsync = createAsyncThunk(
    actionTypes.ACCEPT_FRIEND_REQUEST,
    async (email, friendEmail) => {
        return await UsersService.acceptFriendRequest(email, friendEmail)
    }
);

export const declineFriendRequestAsync = createAsyncThunk(
    actionTypes.DECLINE_FRIEND_REQUEST,
    async (email, friendEmail) => {
        return await UsersService.declineFriendRequest(email, friendEmail)
    }
);

export const sendFriendRequestAsync = createAsyncThunk(
    actionTypes.SEND_FRIEND_REQUEST,
    async (email, friendEmail) => {
        return await UsersService.sendFriendRequest(email, friendEmail)
    }
);

export const deleteFriendAsync = createAsyncThunk(
    actionTypes.DELETE_FRIEND,
    async (email, friendEmail) => {
        return await UsersService.deleteFriend(email, friendEmail)
    }
);