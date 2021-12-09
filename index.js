console.log("Nested Mongoose schema example!");

require('dotenv').config()

const express = require("express");
const app = express();

const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/notes_with_authors');

// some global logging
app.use((req, res, next) => {
    console.log(`Received a request with method ${req.method}`);
    next();
});

const notesRouter = require("./routes/notesRoutes")();
app.use("/api", notesRouter);

// start express server
app.listen(process.env.PORT || 8000, 
    () => 
    { 
        console.log(`Started nested schema example at localhost, port ${process.env.PORT}`) 
    });


