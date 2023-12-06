import express from 'express';
import mysql from 'mysql'
const app = express()
const port = 3000

import auth from './routes/auth.js';

app.use("/auth", auth);

app.get('/', (req, res) => {
  console.log(req);
  // res.send('Hello World!')
  res.json({ msg: "hello world"});
})
//todo: implement .ENV for security reasons.
export  let con = mysql.createConnection({
  host: "database.discordbothosting.com",
  user: "u2669_s4z6JYe2Hp",
  password: "j!A!cck!kZZ6Wv7U^G4OTda7"
});
//connection to DB
con.connect(function(err) {
  if (err) throw err;
  console.log("Database Connected");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
