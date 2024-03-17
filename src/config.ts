import dotenv from 'dotenv';

dotenv.config();

const EXTERNAL_BASE_URL = process.env.EXTERNAL_BASE_URL;
const API_VERSION = process.env.API_VERSION;
const PORT = process.env.PORT ?? 8080;

export { EXTERNAL_BASE_URL, API_VERSION, PORT };
