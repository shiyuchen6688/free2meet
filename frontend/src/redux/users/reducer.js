import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATE } from '../utils';
import {
    acceptFriendRequestAsync, changePasswordAsync, changeUsernameAsync, declineFriendRequestAsync, deleteFriendAsync, deleteUserAccountAsync, forgetPasswordAsync, getFriendRequestsAsync,
    getFriendRequestsSentAsync, getFriendsAsync, getTagsAsync, loginAsync, loginWithTokenAsync, registerAsync, resetPasswordAsync, sendFriendRequestAsync
} from './thunks';

const INITIAL_STATE = {
    username: null,
    email: null,
    list: [],
    friends: [],
    friendRequests: [],
    friendRequestsSent: [],
    tags: [],
    signin: REQUEST_STATE.IDLE,
    loginWithToken: REQUEST_STATE.IDLE,
    register: REQUEST_STATE.IDLE,
    resetPassword: REQUEST_STATE.IDLE,
    getFriends: REQUEST_STATE.IDLE,
    getFriendRequests: REQUEST_STATE.IDLE,
    getFriendRequestsSent: REQUEST_STATE.IDLE,
    acceptFriendRequest: REQUEST_STATE.IDLE,
    declineFriendRequest: REQUEST_STATE.IDLE,
    sendFriendRequest: REQUEST_STATE.IDLE,
    deleteFriend: REQUEST_STATE.IDLE,
    changePassword: REQUEST_STATE.IDLE,
    changeUsername: REQUEST_STATE.IDLE,
    deleteUserAccountAsync: REQUEST_STATE.IDLE,
    getTags: REQUEST_STATE.IDLE,
    forgetPassword: REQUEST_STATE.IDLE,
    error: null,
    sendFriendRequestError: null
};

const usersSlice = createSlice({
    name: 'users',
    initialState: INITIAL_STATE,
    reducers: {
        logout: (state) => {
            state.username = null
            state.email = null
            window.localStorage.removeItem('token');
            window.location.reload(false);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAsync.pending, (state) => {
                state.getMeetups = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.getMeetups = REQUEST_STATE.FULFILLED;
                state.username = action.payload.username;
                state.email = action.payload.email
                window.localStorage.setItem('token', action.payload.token)
            })
            .addCase(loginAsync.rejected, (state, action) => {
                state.getMeetups = REQUEST_STATE.REJECTED;
                state.error = action.error;
            })
            .addCase(loginWithTokenAsync.pending, (state) => {
                state.loginWithToken = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(loginWithTokenAsync.fulfilled, (state, action) => {
                state.loginWithToken = REQUEST_STATE.FULFILLED;
                state.username = action.payload.username;
                state.email = action.payload.email
            })
            .addCase(loginWithTokenAsync.rejected, (state, action) => {
                state.loginWithToken = REQUEST_STATE.REJECTED;
                state.error = action.error;
            })
            .addCase(registerAsync.pending, (state) => {
                state.getMeetups = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(registerAsync.fulfilled, (state, action) => {
                state.getMeetups = REQUEST_STATE.FULFILLED;
            })
            .addCase(registerAsync.rejected, (state, action) => {
                state.getMeetups = REQUEST_STATE.REJECTED;
                state.error = action.error;
            })
            .addCase(resetPasswordAsync.pending, (state) => {
                state.resetPassword = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(resetPasswordAsync.fulfilled, (state, action) => {
                state.resetPassword = REQUEST_STATE.FULFILLED;
            })
            .addCase(resetPasswordAsync.rejected, (state, action) => {
                state.resetPassword = REQUEST_STATE.REJECTED;
                state.error = action.error;
            })
            .addCase(acceptFriendRequestAsync.pending, (state) => {
                state.acceptFriendRequest = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(acceptFriendRequestAsync.fulfilled, (state, action) => {
                state.acceptFriendRequest = REQUEST_STATE.FULFILLED;
                state.friends = action.payload.friends;
                state.friendRequests = action.payload.friendRequests;
            })
            .addCase(acceptFriendRequestAsync.rejected, (state, action) => {
                state.acceptFriendRequest = REQUEST_STATE.REJECTED;
                state.error = action.error;
            })
            .addCase(declineFriendRequestAsync.pending, (state) => {
                state.declineFriendRequest = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(declineFriendRequestAsync.fulfilled, (state, action) => {
                state.declineFriendRequest = REQUEST_STATE.FULFILLED;
                state.friendRequests = action.payload;
            })
            .addCase(declineFriendRequestAsync.rejected, (state, action) => {
                state.declineFriendRequest = REQUEST_STATE.REJECTED;
                state.error = action.error;
            })
            .addCase(getFriendsAsync.pending, (state) => {
                state.getFriends = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(getFriendsAsync.fulfilled, (state, action) => {
                state.getFriends = REQUEST_STATE.FULFILLED;
                state.friends = action.payload;
            })
            .addCase(getFriendsAsync.rejected, (state, action) => {
                state.getFriends = REQUEST_STATE.REJECTED;
                state.error = action.error;
            })
            .addCase(getFriendRequestsAsync.pending, (state) => {
                state.getFriendRequests = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(getFriendRequestsAsync.fulfilled, (state, action) => {
                state.getFriendRequests = REQUEST_STATE.FULFILLED;
                state.friendRequests = action.payload;
            })
            .addCase(getFriendRequestsAsync.rejected, (state, action) => {
                state.getFriendRequests = REQUEST_STATE.REJECTED;
                state.error = action.error;
            })
            .addCase(getFriendRequestsSentAsync.pending, (state) => {
                state.getFriendRequestsSent = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(getFriendRequestsSentAsync.fulfilled, (state, action) => {
                state.getFriendRequestsSent = REQUEST_STATE.FULFILLED;
                state.friendRequestsSent = action.payload;
            })
            .addCase(getFriendRequestsSentAsync.rejected, (state, action) => {
                state.getFriendRequestsSent = REQUEST_STATE.REJECTED;
                state.error = action.error;
            })
            .addCase(sendFriendRequestAsync.pending, (state) => {
                state.sendFriendRequest = REQUEST_STATE.PENDING;
                state.sendFriendRequestError = null;
            })
            .addCase(sendFriendRequestAsync.fulfilled, (state, action) => {
                state.sendFriendRequest = REQUEST_STATE.FULFILLED;
                state.sendFriendRequestError = null;
            })
            .addCase(sendFriendRequestAsync.rejected, (state, action) => {
                state.sendFriendRequest = REQUEST_STATE.REJECTED;
                state.sendFriendRequestError = action.error;
            })
            .addCase(deleteFriendAsync.pending, (state) => {
                state.deleteFriend = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(deleteFriendAsync.fulfilled, (state, action) => {
                state.deleteFriend = REQUEST_STATE.FULFILLED;
                state.friends = action.payload;
            })
            .addCase(deleteFriendAsync.rejected, (state, action) => {
                state.deleteFriend = REQUEST_STATE.REJECTED;
                state.error = action.error;
            })
            .addCase(changePasswordAsync.pending, (state) => {
                state.changePassword = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(changePasswordAsync.fulfilled, (state, action) => {
                state.changePassword = REQUEST_STATE.FULFILLED;
            })
            .addCase(changePasswordAsync.rejected, (state, action) => {
                state.changePassword = REQUEST_STATE.REJECTED;
                state.error = action.error;
            })
            .addCase(changeUsernameAsync.pending, (state) => {
                state.changeUsername = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(changeUsernameAsync.fulfilled, (state, action) => {
                state.changeUsername = REQUEST_STATE.FULFILLED;
                state.username = action.payload.username
            })
            .addCase(changeUsernameAsync.rejected, (state, action) => {
                state.changeUsername = REQUEST_STATE.REJECTED;
                state.error = action.error;
            })
            .addCase(deleteUserAccountAsync.pending, (state) => {
                state.deleteUserAccountAsync = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(deleteUserAccountAsync.fulfilled, (state, action) => {
                state.deleteUserAccountAsync = REQUEST_STATE.FULFILLED;
                let deletedUser = action.payload;
                if (deletedUser.username === state.username) {
                    state.username = null;
                    state.email = null;
                    window.localStorage.removeItem('token');
                    window.location.reload(false);
                }
            })
            .addCase(deleteUserAccountAsync.rejected, (state, action) => {
                state.deleteUserAccountAsync = REQUEST_STATE.REJECTED;
                state.error = action.error;
            })
            .addCase(getTagsAsync.pending, (state) => {
                state.getTags = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(getTagsAsync.fulfilled, (state, action) => {
                state.getTags = REQUEST_STATE.FULFILLED;
                state.tags = action.payload;
            })
            .addCase(getTagsAsync.rejected, (state, action) => {
                state.getTags = REQUEST_STATE.REJECTED;
                state.error = action.error;
            })
            .addCase(forgetPasswordAsync.pending, (state, action) => {
                state.forgetPassword = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(forgetPasswordAsync.fulfilled, (state, action) => {
                state.forgetPassword = REQUEST_STATE.FULFILLED;
            })
            .addCase(forgetPasswordAsync.rejected, (state, action) => {
                state.forgetPassword = REQUEST_STATE.REJECTED;
                state.error = action.error;
            })
    }
});

export default usersSlice.reducer;
export const { logout } = usersSlice.actions