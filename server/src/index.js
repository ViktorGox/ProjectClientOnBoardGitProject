import express from 'express';
import mysql from 'mysql';
import dotenv from 'dotenv';

const app = express()

dotenv.config()
const port = process.env.PORT;

import auth from './routes/auth.js';


app.use("/auth", auth);
app.get('/', (req, res) => {
  console.log(req);
  res.json({ msg: "hello world"});
})
export let con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: `s2669_ClientOnBoardDevDB`,
});
//connection to DB
con.connect(function(err) {
  if (err) throw err;
  console.log("Database Connected");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

 {
  con.query("SELECT * FROM Test", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
}