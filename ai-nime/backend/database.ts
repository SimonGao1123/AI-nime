import pg from 'pg';
import "dotenv/config";

const {Pool} = pg;

export const db = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,

    ssl: { rejectUnauthorized: false },
    max: 10, // max clients in pool
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 5_000,
});