import pkg from 'pg';
import dotenv from 'dotenv';

const { Pool } = pkg;
dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

export async function runDatabase() {
    const client = await pool.connect();

    // uncomment to test that it works. Probably add some users first to confirm it works.

    // const result = await client.query('SELECT * FROM Users');
    // const data = result.rows;
    // console.log(data);

    client.release();
}
export async function getAllUsers() {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM users');
        const users = result.rows;
        client.release();
        return users;
    } catch (error) {
        console.error('Error retrieving users from the database', error);
        throw error;
    }
}