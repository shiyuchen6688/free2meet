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
    async ({ email, friendEmail }) => {
        return await UsersService.acceptFriendRequest(email, friendEmail)
    }
);

export const declineFriendRequestAsync = createAsyncThunk(
    actionTypes.DECLINE_FRIEND_REQUEST,
    async ({ email, friendEmail }) => {
        return await UsersService.declineFriendRequest(email, friendEmail)
    }
);

export const sendFriendRequestAsync = createAsyncThunk(
    actionTypes.SEND_FRIEND_REQUEST,
    async ({ email, friendEmail }) => {
        return await UsersService.sendFriendRequest(email, friendEmail)
    }
);

export const deleteFriendAsync = createAsyncThunk(
    actionTypes.DELETE_FRIEND,
    async ({ email, friendEmail }) => {
        return await UsersService.deleteFriend(email, friendEmail)
    }
);

export const changePasswordAsync = createAsyncThunk(
    actionTypes.CHANGE_PASSWORD,
    async ({ email, oldPassword, newPassword }) => {
        console.log("email", email)
        return await UsersService.changePassword(email, oldPassword, newPassword)
    }
);

export const changeUsernameAsync = createAsyncThunk(
    actionTypes.CHANGE_USERNAME,
    async ({ email, password, newUsername }) => {
        console.log("changeUsernameAsync")
        return await UsersService.changeUsername(email, password, newUsername)
    }
);

export const getMeetupsCreatedAsync = createAsyncThunk(
    actionTypes.GET_MEETUPS_CREATED,
    async (email) => {
        console.log("getMeetupsCreatedAsync")
        return await UsersService.getMeetupsCreated(email);
    }
)

export const deleteUserAccountAsync = createAsyncThunk(
    actionTypes.DELETE_USER_ACCOUNT,
    async (email) => {
        console.log("deleteUserAccountAsync", email)
        return await UsersService.deleteUserAccount(email);
    }
)
