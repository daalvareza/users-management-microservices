import { Router, Request, Response, NextFunction } from 'express';
import { addUser, deleteUser, getUsers, IUser } from '../models/user/User';
import { addAbortListener } from 'events';

const router: Router = Router();
const instanceId = process.env.INSTANCE_ID || 'unknown-instance';

// Fetch all users
router.get('/', async (req: Request, res: Response) => {
    try {
        const users = await getUsers();
        const userList = users.sort((a : IUser, b: IUser) => a.lastName.localeCompare(b.lastName));
        res.json({
            instance: instanceId,
            userList,
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// Add a new user
router.post('/user', async (req: Request, res: Response) => {
    try {
        const newUser = await addUser(req.body);
        res.status(201).json({
            instance: instanceId,
            newUser,
        });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a user by ID
router.delete('/:id', async (req: Request<{ id: string }>, res: Response) => {
    try {
        const { id } = req.params;
        await deleteUser(id);
        res.json({
            instance: instanceId,
            message: 'User deleted',
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
