import "dotenv/config";
import mongoose from "mongoose";
import app from "./app.ts";
import connectDB from "./config/db.ts";

const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;

const startServer = async (): Promise<void> => {
  try {
    await connectDB();

    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    const shutdown = async (): Promise<void> => {
      console.log("Shutting down server...");
      await mongoose.connection.close();
      server.close(() => {
        console.log("Server closed");
        process.exit(0);
      });
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);

  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Server startup failed:", error.message);
    } else {
      console.error("Unknown startup error");
    }

    process.exit(1);
  }
};

startServer();