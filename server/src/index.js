import express from "express";
//import morgan from 'morgan';
import cors from 'cors';
import * as fs from "fs";

import tokenRouter from "./routes/token-router.js";
import userRouter from "./routes/user-router.js";
import testsRouter from "./routes/test-router.js";
import sprintRouter from "./routes/sprint-router.js";
import {performQuery} from "./database/database.js";

const port = 3000;
const app = express();
const morganFormat = ':method :url :status :res[content-length] - :response-time ms';

app.use(cors());
app.use(express.json());
// app.use(morgan(morganFormat));

app.use('/token', tokenRouter);
app.use('/users', userRouter);
app.use('/test', testsRouter);
app.use('/sprint', sprintRouter);



const sqlFile = fs.readFileSync('../server/src/database/DatabaseScript.sql', 'utf8');
performQuery(sqlFile);

app.listen(port, function () {
    console.log(`Server listening on port ${port}`);
});
