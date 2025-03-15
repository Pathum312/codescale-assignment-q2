import { ENV } from ".";
import {
    Connection,
    connection,
    Schema,
    model,
    connect,
    disconnect,
} from "mongoose";

// Interfaces of the documents
interface IUser {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    access_token: string;
    location_id?: string;
}

interface ILocation {
    id: string;
    latitude: string;
    longitude: string;
    user_id: string;
}

// Schemas of the documents
const userSchema = new Schema<IUser>({
    id: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    access_token: { type: String, required: true },
    location_id: Number,
});

const locationSchema = new Schema<ILocation>({
    id: { type: String, required: true },
    latitude: { type: String, required: true },
    longitude: { type: String, required: true },
    user_id: { type: String, required: true },
});

// Models
const User = model<IUser>("User", userSchema);

const Location = model<ILocation>("Location", locationSchema);

// Database Instance
class Database {
    static _instance: Database;
    private _connected: boolean = false;
    private _connection: Connection | null = null;

    private constructor() {}

    public static get instance(): Database {
        if (!Database._instance) {
            Database._instance = new Database();
        }

        return Database._instance;
    }

    async connectDB() {
        if (this._connected) return this._connection;

        try {
            await connect(ENV.MONGODB_URL);
            this._connection = connection;
            this._connected = true;
            console.log(`\nConnected to the MongoDB Database.`);
        } catch (error) {
            console.log(`\nMongoDB Connection Error: ${error}`);
        }
    }

    async disconnectDB() {
        await disconnect();
        this._connected = false;
        this._connection = null;
        console.log(`\nDisconnected from the MongoDB Database.`);
    }

    getConnection(): Connection | null {
        return this._connection;
    }

    isConnected(): boolean {
        return this._connected;
    }
}

export { User, Location, Database };
