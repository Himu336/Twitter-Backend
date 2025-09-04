import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT;
export const ATLAS_DB_URL = process.env.ATLAS_DB_URL;
export const NODE_ENV = process.env.NODE_ENV;
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
export const REGION = process.env.REGION;
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
export const ACCESS_KEY_ID = process.env.ACCESS_KEY_ID;