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
    first_name: string;
    last_name: string;
    email: string;
    location_id?: string;
}

interface ILocation {
    latitude: string;
    longitude: string;
    user_email: string;
}

interface IWeather {
    type: string; // Main value sent by the OpenWeatherMap API
    name: string; // Description value sent by the OpenWeatherMap API
    description: string; // Generative a description using the name, we got from the OWM API
    temp: number; // In K, must convert to C
    temp_feels_like: number; // In K, must convert to C
    wind_speed: number; // In m/s
    wind_direction: number; // Deg
    pressure: number; // In hPa
    clouds: number; // Is a %
    user_email: string;
}

// Schemas of the documents
const userSchema = new Schema<IUser>({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    location_id: String,
});

const locationSchema = new Schema<ILocation>({
    latitude: { type: String, required: true },
    longitude: { type: String, required: true },
    user_email: { type: String, required: true },
});

const weatherSchema = new Schema<IWeather>({
    type: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    temp: { type: Number, required: true },
    temp_feels_like: { type: Number, required: true },
    wind_speed: { type: Number, required: true },
    wind_direction: { type: Number, required: true },
    pressure: { type: Number, required: true },
    clouds: { type: Number, required: true },
    user_email: { type: String, required: true },
});

// Models
const User = model<IUser>("User", userSchema);

const Location = model<ILocation>("Location", locationSchema);

const Weather = model<IWeather>("Weather", weatherSchema);

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

export { User, Location, Weather, Database };
