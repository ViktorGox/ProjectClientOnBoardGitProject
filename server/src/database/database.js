import pkg from 'pg';
 const {  Client } = pkg;


export const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'RegressionTestingDB',
    password: '123',
    port: 42069,
})

await client.connect();
console.log(`Database logged in as ${client.user} on port ${client.port}`);