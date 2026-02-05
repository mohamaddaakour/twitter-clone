import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
    try {
        const mongoURI: string | undefined = process.env.MONGO_URI;

        if (!mongoURI) {
            throw new Error(`The Mongo URI is not saved as an environment variable`);
        }

        await mongoose.connect(mongoURI);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log(`Error: ${error.message}`);
        } else {
            console.log(`Unknown error while connecting to the database`);
        }
        process.exit();
    }
}

export default connectDB;