import dotenv from "dotenv";
import express from "express";

import router from "./routes/authenticationRoute.js";
import connectDB from "./config/db.js";

// to use process.env
dotenv.config();

const app = express();

// to let the user enter a JSON format in the request.body
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 6000;

app.use("/auth", router);

async function startServer() {
	await connectDB();

	app.listen((PORT), () => { console.log(`Server is running on port ${PORT}`) });
}

startServer();
