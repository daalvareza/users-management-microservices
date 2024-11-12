import IUser from "./IUser";
import { createReducer } from '@reduxjs/toolkit';
import { createUser, fetchUsersData, removeUser } from "./userActions";

interface UserState {
    users: IUser[];
}

const initialState: UserState = {
    users: [],
};

export const userReducer = createReducer(initialState, (builder) => {
    builder.addCase(fetchUsersData.pending, (state) => {
        state.users = [];
    });

    builder.addCase(fetchUsersData.rejected, (state) => {
        state.users = [];
    });

    builder.addCase(fetchUsersData.fulfilled, (state, action) => {
        state.users = action.payload;
    });

    builder.addCase(removeUser.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user.id !== action.payload);
    });

    builder.addCase(createUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
    });
});
