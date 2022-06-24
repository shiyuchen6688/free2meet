import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATE } from '../utils';
import { loginAsync, registerAsync } from './thunks';

const INITIAL_STATE = {
    username: null,
    email: null,
    signin: REQUEST_STATE.IDLE,
    register: REQUEST_STATE.IDLE,
    error: null
};


const usersSlice = createSlice({
    name: 'users',
    initialState: INITIAL_STATE,
    reducers: {
        logout: (state) => {
            // console.log(action)
            state.username = null
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
                console.log(action.payload)
                state.username = action.payload.username
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
    }
});

export default usersSlice.reducer;
export const { logout } = usersSlice.actions