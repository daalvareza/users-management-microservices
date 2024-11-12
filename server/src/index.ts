import express from 'express';
import userRoutes from './routes/userRoutes';
import mongoose from 'mongoose';
import cors from 'cors';
import { createClient } from 'redis';
import { v4 as uuidv4 } from 'uuid';
import { url } from 'inspector';

const app = express();
/*const MONGO_URI = 'mongodb+srv://diegoalvarez9715:diegoTicTuk@cluster0.carzrj5.mongodb.net/ticTukUsers?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(error => console.error('Error connecting to MongoDB Atlas:', error));*/

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});