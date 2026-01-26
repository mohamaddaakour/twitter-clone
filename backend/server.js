import dotenv from "dotenv";
import express from "express";

import router from "./routes/authenticationRoute.js";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 6000;

app.use("/auth", router);

async function startServer() {
	await connectDB();

	app.listen((PORT), () => { console.log(`Server is running on port ${PORT}`) });
}

startServer();
