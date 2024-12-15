const express = require('express');
const connectDB = require('./config/database');

const port = 3000;
const app = express();

connectDB()
    .then(() => {
        console.log('Database connected successfully.');
        app.listen(port, () => {
            console.log(`server running on port: ${port}`);
        });
    })
    .catch((err) => {
        console.error('Error connecting to database');
    });


