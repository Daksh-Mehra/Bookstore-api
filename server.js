import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import connectToDB from './database/db.js';
import bookRoutes from './routes/book.routes.js';


const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/books', bookRoutes);
const start = async()=>{
    try {
        await connectToDB();
        app.listen(PORT,()=>{
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start the server:', error);
    }
}
start();