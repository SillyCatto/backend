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

app.listen(port, () => {
    console.log(`server running on port: ${port}`);
});
