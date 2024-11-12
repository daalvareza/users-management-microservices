import { createAsyncThunk } from '@reduxjs/toolkit';
import IUser from "./IUser";
import { UserService } from './userService';
import IUserForm from './IUserForm';
import axios, { AxiosError } from 'axios';

interface ErrorResponse {
    error: string;
}

export const fetchUsersData = createAsyncThunk<IUser[]>(
    'users/fetchUsersData',
    UserService.getAll,
);

export const removeUser = createAsyncThunk<string, string>(
    'users/removeUser',
    async (userId: string) => {
        const deletedUserId = await UserService.deleteUser(userId);
        return deletedUserId;
    }
);

export const createUser = createAsyncThunk<IUser, IUserForm, { rejectValue: string }>(
    'users/createUser',
    async (user: IUserForm, { rejectWithValue }) => {
        try {
            const newUser = await UserService.addUser(user);
            if ('error' in newUser) {
                return rejectWithValue(newUser.error);
            }
            return newUser;
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<ErrorResponse>;
                return rejectWithValue(axiosError.response?.data?.error || 'Failed to save user');
            } else {
                return rejectWithValue('Failed to save user');
            }
        }
    }
);
