const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const todoRoute = require('./routes/todoRoute')

const app = express();
app.use(cors());
app.use(express.json());  // Parantez eksikti, bu şekilde düzeltilmeli

mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log("Connected to Database Successfully!");
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Listening to the port ${PORT}`);
        });
    }).catch((error) => {
        console.error(`Mongoose Connection Error! ${error}`);
    });

app.use('/api/todos', todoRoute);

module.exports = app;
