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
)