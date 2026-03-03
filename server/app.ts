import express from "express";
import type { Application } from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route.ts";

const app: Application = express();

// middlewares
app.use(helmet());
app.use(cors());

app.use(morgan("dev"));

app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);

// health route
app.get("/health", (_, res) => {
  res.status(200).json({ status: "OK" });
});

export default app;