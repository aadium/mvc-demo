const admin = require('firebase-admin');
const cors = require('cors');

const authMiddleware = (req, res, next) => {
    cors()(req, res, () => {
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
            const idToken = req.headers.authorization.split('Bearer ')[1];

            admin.auth().verifyIdToken(idToken)
                .then((decodedIdToken) => {
                    req.user = decodedIdToken;
                    next();
                })
                .catch((error) => {
                    res.status(403).send('Unauthorized');
                });
        } else {
            res.status(403).send('Unauthorized');
        }
    });
};

module.exports = authMiddleware;