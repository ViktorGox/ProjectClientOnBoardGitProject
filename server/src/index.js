import express from "express";
import cors from 'cors';

import tokenRouter from "./routes/token-router.js";
import userRouter from "./routes/user-router.js";

const port = 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/token', tokenRouter);
app.use('/users', userRouter);

// runDatabase();

app.listen(port, function () {
    console.log(`Server listening on port ${port}`);
});

