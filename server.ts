import cors from "cors";
import express from "express";
import { ENV, Database } from "./config";
import UserRouter from "./routes/user.route";
import { handleErrors } from "./middleware/log.error";

const initServer = (port: number) => {
    const app = express();

    // Server Config
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Database instance
    const mongoDB = Database.instance;

    // Swagger Documentation

    // API Routes
    app.use("/users", UserRouter);

    // Global Error Catcher
    app.use(handleErrors);

    app.listen(port, async () => {
        // Connecting to the MongoDB Database
        if (!mongoDB.isConnected()) await mongoDB.connectDB();

        console.log(
            `\nServer running on port ${port}.\n\nAPI documentation available at http://localhost:${port}/api-docs`
        );
    });

    process.on("SIGINT", async () => await serverShutDown(mongoDB)); // Manually shutdown - Ctrl+C
    process.on("SIGTERM", async () => await serverShutDown(mongoDB)); // Process manager shutdown - pm2
};

const serverShutDown = async (mongoDB: Database) => {
    console.log(`\nServer shutting down...`);

    // Disconnect from the MongoDB Database
    if (mongoDB.isConnected()) await mongoDB.disconnectDB();

    process.exit(0);
};

initServer(ENV.PORT);
