import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATE } from '../utils';
import { declineMeetupAsync, getFriendsAsync, getMeetupsDeclinedAsync, getMeetupsAcceptedAsync, getMeetupsCreatedAsync, getMeetupsPendingAsync, loginAsync, registerAsync, resetPasswordAsync, getFriendRequestsAsync, getFriendRequestsSentAsync, acceptFriendRequestAsync, declineFriendRequestAsync, sendFriendRequestAsync, deleteFriendAsync, acceptMeetupAsync } from './thunks';

const INITIAL_STATE = {
    username: null,
    email: null,
    friends: [],
    friendsRequests: [],
    friendsRequestsSent: [],
    signin: REQUEST_STATE.IDLE,
    register: REQUEST_STATE.IDLE,
    resetPassword: REQUEST_STATE.IDLE,
    getFriends: REQUEST_STATE.IDLE,
    getFriendRequests: REQUEST_STATE.IDLE,
    getFriendRequestsSent: REQUEST_STATE.IDLE,
    acceptFriendRequest: REQUEST_STATE.IDLE,
    declineFriendRequest: REQUEST_STATE.IDLE,
    sendFriendRequest: REQUEST_STATE.IDLE,
    deleteFriend: REQUEST_STATE.IDLE,
    error: null
};


const usersSlice = createSlice({
    name: 'users',
    initialState: INITIAL_STATE,
    reducers: {
        logout: (state) => {
            // console.log(action)
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
                // console.log(action.payload)
                window.localStorage.setItem('token', action.payload.token)

            })
            .addCase(loginAsync.rejected, (state, action) => {
                state.getMeetups = REQUEST_STATE.REJECTED;
                state.error = action.error;
            })
            .addCase(registerAsync.pending, (state) => {
                state.getMeetups = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(registerAsync.fulfilled, (state, action) => {
                state.getMeetups = REQUEST_STATE.FULFILLED;
                // state.user = action.payload;
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
                // state.user = action.payload;
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
                state.friendsRequests = action.payload.friendsRequests;
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
                state.friendsRequests = action.payload;
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
                state.error = null;
            })
            .addCase(sendFriendRequestAsync.fulfilled, (state, action) => {
                state.sendFriendRequest = REQUEST_STATE.FULFILLED;
                state.friendsRequestsSent = action.payload;
            })
            .addCase(sendFriendRequestAsync.rejected, (state, action) => {
                state.sendFriendRequest = REQUEST_STATE.REJECTED;
                state.error = action.error;
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
    }
});

export default usersSlice.reducer;
export const { logout } = usersSlice.actions