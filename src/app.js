const express = require('express');

const port = 3000;
const app = express();

app.use('/hello', (req, res) => {
    res.send('hello!');
});

app.use('/test', (req, res) => {
    res.send('test page');
});

app.use((req, res) => {
    res.send('hello from the server');
});

app.listen(port, () => {
    console.log(`server running on port: ${port}`);
});
