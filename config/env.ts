import env from "dotenv";

env.config();

export default {
    PORT: parseInt(process.env.PORT || "3000", 10),
    MONGODB_URL: String(process.env.MONGODB_URL),
};
