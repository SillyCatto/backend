const express = require('express');
const connectDB = require('./config/database');
const User = require('./models/user');

const port = 3000;
const app = express();

app.post('/signup', async (req, res) => {
    const userData = {
        name: 'Bob',
        emailID: 'bob@gmail.com',
        password: '123',
        age: 20,
        gender: 'male'
    };
    const user = new User(userData);
    await user.save();
    res.send('user data added successfully');
});

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


