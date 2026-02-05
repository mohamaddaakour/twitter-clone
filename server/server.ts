import express from "express";
import type { Application } from "express";
import dotenv from "dotenv";

import connectDB from "./config/db.ts";

import userRoutes from "./routes/user.route.ts";

dotenv.config();

const app: Application = express();

const PORT: number = Number(process.env.PORT) || 6000;

// middlewares
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRoutes);

// connection to the database function
const connectionDB = async (): Promise<void> => {
    try {
        await connectDB();
        console.log(`Connection successfully to the database`);

        app.listen((PORT), () => {
            console.log(`Server listening on port ${PORT}`);
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log(`Error: ${error.message}`);
        } else {
            console.log(`Unknown error connecting to the database`);
        } 
    }
}

connectionDB();
