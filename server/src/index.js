import express from "express";
//import morgan from 'morgan';
import cors from 'cors';
import * as fs from "fs";

import tokenRouter from "./routes/token-router.js";
import userRouter from "./routes/user-router.js";
import testsRouter from "./routes/test-router.js";
import sprintRouter from "./routes/sprint-router.js";
import {performQuery} from "./database/database.js";
import statusRouter from "./routes/status-router.js";
import moduleRouter from "./routes/module-router.js"
import testModuleRouter from "./routes/test-module-router.js";
import fileUploadRouter from "./routes/file-upload-router.js";

const port = 3000;
const app = express();
const morganFormat = ':method :url :status :res[content-length] - :response-time ms';

app.use(cors());
app.use(express.json());
// app.use(morgan(morganFormat));

app.use('/token', tokenRouter);
app.use('/users', userRouter);
app.use('/test', testsRouter)
app.use('/status', statusRouter);
app.use('/module', moduleRouter)
app.use('/testmodule', testModuleRouter)
app.use('/sprint', sprintRouter);
app.use('/upload', fileUploadRouter)


const sqlFile = fs.readFileSync('../server/src/database/DatabaseScript.sql', 'utf8');
void performQuery(sqlFile);

app.listen(port, function () {
    console.log(`Server listening on port ${port}`);
});
