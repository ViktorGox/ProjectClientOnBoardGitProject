import express from "express";
import cors from 'cors';

import * as database from "./database/database.js";
import tokenRouter from "./routes/token-router.js";
import userRouter from "./routes/user-router.js";

const port = 3000;
const app = express();

database.createDatabase();

app.use(cors());
app.use(express.json());

app.use('/token', tokenRouter);
app.use('/users', userRouter);

app.listen(port, function () {
    console.log(`Server listening on port ${port}`);
});
