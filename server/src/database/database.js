import pkg from 'pg';
import dotenv from 'dotenv';

const {Pool} = pkg;
dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

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

/**
 * Executes a query in the database, and returns the data found. Can be one generated automatically, or custom one
 * with replacement positions ($1).
 * <p> Example: </p>
 * <p> return performQueryInputAnswers('SELECT * FROM test WHERE status = \'bug\' OR status = \'blocker\''); </p>
 * <p> return performQueryInputAnswers('SELECT * FROM test WHERE status = $1 OR status = $2', ['bug', 'blocker']); </p>
 * @param query Generate query and pass it, or enter your own custom query, if it uses replacement
 * positions, put ${number} for every parameter the query takes. Start from 1 and increment by one.
 * @param answers An array which contains the replacements for the ${number}.
 * @returns Returns an array of all data found.
 */
export async function performQuery(query, answers = []) {
    const client = await pool.connect();

    try {
        return await new Promise((resolve, reject) => {
            client.query(query, answers, (err, result) => {
                if (err) {
                    console.error('Error executing query', err);
                    reject(err);
                } else {
                    resolve(result.rows);
                }
            });
        });
    } finally {
        client.release();
    }
}