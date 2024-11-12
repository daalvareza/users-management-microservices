import IUser from "./IUser";
import axios from 'axios';
import IUserForm from "./IUserForm";

const API_URL = process.env.REACT_APP_SERVER_URL;

const getAll = async (): Promise<IUser[]> => {
    const response = await axios.get(`${API_URL}/users`);
    console.log(`Response from instance: ${response.data.instance}`);
    const sortedUsers = response.data.users.sort((a: IUser, b: IUser) => a.lastName.localeCompare(b.lastName));
    return sortedUsers;
};

const addUser = async (
    user: IUserForm
): Promise<IUser | {error: string}> => {
    try {
        const response = await axios.post(`${API_URL}/users/user`, user);
        console.log(`Response from instance: ${response.data.instance}`);
        return response.data.newUser;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return { error: error.response.data.error || 'Failed to save user' };
        }
        return { error: 'An unexpected error occurred while adding the user' };
    }
};

const deleteUser = async (userId: string): Promise<string> => {
    const response = await axios.delete(`${API_URL}/users/${userId}`);
    console.log(`Response from instance: ${response.data.instance}`);
    return userId;
};

export const UserService = {
    getAll,
    deleteUser,
    addUser,
};
