const mongoose = require("mongoose");

const connectDB = async ()=>{
    // this is url ---> cluster url (cluster which have multiple DB)
    // await mongoose.connect("mongodb+srv://shlokjain30:shlok30jain%40%40222@namastedev.rwox6.mongodb.net/");
    // this is url ---> this is particular DB URL ok because at the end of the url we typed manual name which is a DB
    await mongoose.connect("mongodb+srv://shlokjain30:shlok30jain%40%40222@namastedev.rwox6.mongodb.net/devTinder");
}

module.exports = connectDB;


