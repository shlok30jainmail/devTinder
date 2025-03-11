const express = require('express');
const app = express();
const userRoute = require("./routes/userRoute");
const cookieParser = require("cookie-parser");

// express.json() --> it is a middleware which is used to convert json data to js object
app.use(express.json());
app.use(cookieParser()); // cookie parser is also a middleware that is used to read the cookie. without it ..we can get undefined wheneven we try to read the cookie



app.use("/api",userRoute);

module.exports = app;
