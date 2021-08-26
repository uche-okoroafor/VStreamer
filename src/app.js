const express = require("express");
const mongoose = require("mongoose");
// const morgan = require('morgan')
const UserAccess = require("./models/userAccess");
const loginRoute = require('./routes/loginRoute.js')
const createAccountRoute = require('./routes/createAccountRoute.js')
require('dotenv/config');

const app = express();
app.use(express.urlencoded({ extended: true }));





mongoose
  .connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {app.listen(5000)
console.log("connected to data Base")
})
  .catch((err) => console.log(err));



app.use("/login",loginRoute);
app.use("/create_account",createAccountRoute);

