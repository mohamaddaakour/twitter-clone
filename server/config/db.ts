import mongoose from "mongoose";

const connectDB = async () => {
    const { MONGO_URI } = process.env;

    if (!MONGO_URI) {
        throw new Error("MONGO_URI is not defined in environment variables");
    }

    try {
        const conn = await mongoose.connect(MONGO_URI);

        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log(`MongoDB connection error: ${error.message}`);
        } else {
            console.log(`Unknown mongoDB connection error`);
        }
        
        throw error;
    }
}

export default connectDB;