import { config } from 'dotenv';
config();

export const PORT = process.env.PORT || 5000;
export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_USERNAME = process.env.DB_USERNAME || "root";
export const DB_PASSWORD = process.env.DB_PASSWORD || "";
export const DB_NAME = process.env.DB_NAME || "";
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "";
export const SESSION_SECRET = process.env.SESSION_SECRET || "";
export const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";
export const __prod__ = process.env.NODE_ENV === "prod";
