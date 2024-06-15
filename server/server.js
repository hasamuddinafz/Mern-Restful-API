const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json);

mongoose.connect(process.env.DB_URL)
    .then(()=>{
        console.log("Connected to Database Successfully !");
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, ()=>{
            console.log(`Listening to the port ${PORT}`)
        });
    }).catch((error)=>{
        console.error(`Moongose Connection Error ! ${error}`);
    });

module.exports = app;