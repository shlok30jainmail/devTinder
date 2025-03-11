const express = require("express");
const connectDB = require("./config/Database")
const app = require("./app");
require('dotenv').config()

// Note always database must connect first then our server must be start
connectDB().then(()=>{
    console.log("Connection stabilished successfully");
    app.listen("7776", ()=>{
        console.log("Server is listening on 7776");
        });
}).catch((err)=>{
    console.log("Connection is not estabilished");
});