const express = require('express');
const { adminAuth, userAuth } = require('./middlewares/auth');

const port = 3000;
const app = express();

// testing dummy authorization
app.use('/admin', adminAuth);

app.get('/admin', (req, res) => {
    res.send('Admin page');
});

app.get('/admin/getAllData', (req, res) => {
    res.send('All data sent');
});

app.use('/user', userAuth);

app.get('/user', (req, res) => {
    const data = {
        name: 'Bob',
        age: 10
    };
    res.send(data);
});

app.get('/user/:username/:age', (req, res) => {
    console.log(req.params);
    res.send('got params');
});

app.post('/user', (req, res) => {
    console.log('posted user data', req.query);
    res.send('posted user data')
})

// experimenting with route handlers
app.use('/', (req, res, next) => {
    // res.send('/ handler');
    next();
})

app.use(
    '/test',
    (req, res, next) => {
        console.log('1st handler');
        // res.send('1st handler');
        next();
    },
    (req, res, next) => {
        console.log('2nd handler');
        // res.send('2nd handler');
        next();
    },
    (req, res, next) => {
        console.log('3rd handler');
        res.send('3rd /user handler');
    }
);

app.listen(port, () => {
    console.log(`server running on port: ${port}`);
});
