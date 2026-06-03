import mongoose from 'mongoose';


const connectToDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('successfully connected to MONGODB');
    } catch (error) {
        console.error('Error connecting to database:', error);
        process.exit(1);
    }
}

export default connectToDB;