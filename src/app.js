const express = require('express');

const port = 3000;
const app = express();

app.get('/user', (req, res) => {
    const data = {
        name: 'Cat',
        age: 10
    };
    res.send(data);
});

app.post('/user', (req, res) => {
    console.log('posted user data', req.query);
    res.send('posted user data')
})

app.use('/test', (req, res) => {
    res.send('test page\nAPI returned:\n');
});

app.listen(port, () => {
    console.log(`server running on port: ${port}`);
});
