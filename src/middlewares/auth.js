const adminAuth = (req, res, next) => {
    console.log('Authorizing Admin');
    const token = 'abc';
    // const token = 'xyz';
    const isAuthorized = token === 'xyz';
    if (!isAuthorized){
        res.status(401).send('Not Allowed');
    } else {
        next();
    }
};

const userAuth = (req, res, next) => {
    console.log('Authorizing User');
    // const token = 'abc';
    const token = 'xyz';
    const isAuthorized = token === 'xyz';
    if (!isAuthorized){
        res.status(401).send('Not Allowed');
    } else {
        next();
    }
};

module.exports = {
    adminAuth,
    userAuth
}
