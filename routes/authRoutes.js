const express = require('express');
const router = express.Router();

module.exports = function(admin) {
    const controller = require('../controllers/authController')(admin);

    router.post('/signup', (req, res) => {
        controller.signup(req, res);
    });

    router.post('/signin', (req, res) => {
        controller.signin(req, res);
    });

    return router;
};