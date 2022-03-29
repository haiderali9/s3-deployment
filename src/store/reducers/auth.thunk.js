import {SERVER_URL} from '@app/constants/index';
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk('LOGIN_USER', async (formData) => {
    const {data} = await axios.post(`${SERVER_URL}/login`, formData);
    return data;
});
export const logout = createAsyncThunk('LOGOUT_USER', async () => {
    const response = await axios.get(`${SERVER_URL}/logout`);
    return response;
});
