import redisClient from "../../services/redisClient";
import { v4 as uuidv4 } from 'uuid';

const USERS_KEY = 'users';

export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    gender?: string;
    email: string;
    description?: string;
}

export const getUsers = async (): Promise<IUser[]> => {
    const users = await redisClient.get(USERS_KEY);
    const parsedUsers: IUser[] = users ? JSON.parse(users) : [];

    // Sorting by last name
    return parsedUsers.sort((a: IUser, b: IUser) => a.lastName.localeCompare(b.lastName));
};

export const saveUsers = async (users: IUser[]): Promise<void> => {
    await redisClient.set(USERS_KEY, JSON.stringify(users))
}

const validateUserData = async (userData: Partial<IUser>): Promise<string | null> => {
    const { firstName, lastName, email, description } = userData;

    // Required fields
    if (!firstName || !lastName || !email) {
        return 'First name, last name, and email are required fields.';
    }

    // Type checks
    if (typeof firstName !== 'string' || typeof lastName !== 'string' || typeof email !== 'string') {
        return 'First name, last name, and email must be strings.';
    }

    // Optional field checks
    if (description && typeof description !== 'string') {
        return 'Description must be a string.';
    }

    if (description && description.length > 200) {
        return 'Description cannot exceed 200 characters.';
    }

    // Unique email check
    const emailExists = await redisClient.json.get(`userByEmail:${email}`);
    if (emailExists) {
        return 'A user with this email already exists.';
    }

    return null;
}

export const addUser = async (userData: Omit<IUser, 'id'>): Promise<IUser | string> => {
    const validationError = await validateUserData(userData);
    if (validationError) {
        throw new Error(validationError);
    }

    const users = await getUsers();
    const newUser: IUser = { id: uuidv4(), ...userData };
    users.push(newUser);
    await saveUsers(users);
    return newUser;
};
  

export const deleteUser = async (id: string): Promise<void> => {
    await redisClient.json.del(USERS_KEY, `.users[?(@.id=='${id}')]`);
};
