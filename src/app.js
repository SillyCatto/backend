const express = require('express');

const port = 3000;
const app = express();

// this code is bad, it exposes your app files, etc
app.get('/getUserData', (req, res) => {
    // ... logic for DB calls ... etc
    // ...
    throw new Error('dummy error');
    // res.send('user data sent');
});

/**
 * always use try-catch block, still you may have some unhandled
 * errors, dont just only throw them and keep it that way.
 * Cuz it will expose your app internals to client side.
 * That is bad >:(
 * instead, create a wild card error handler like below
 * and handle it gracefully
 */
app.use('/', (err, req, res, next) => {
    if (err) {
        // log the error and notify / send alert
        res.status(500).send('something went wrong :(');
    }
});

app.listen(port, () => {
    console.log(`server running on port: ${port}`);
});
