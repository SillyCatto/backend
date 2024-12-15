const express = require('express');
const connectDB = require('./config/database');
const User = require('./models/user');

const port = 3000;
const app = express();

app.use(express.json());
app.post('/signup', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        res.send('user data added successfully');
    } catch (err) {
        res.status(400).send('error saving user data.\n' + err);
    }

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


