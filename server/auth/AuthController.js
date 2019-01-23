const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/config');
const VerifyToken = require('./VerifyToken');


router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


// middleware function

router.use(function(user, req, res, next) {
    res.status(200).send(user);
});

//Register user route

router.post('/register', function(req, res) {

    var hashedPassword = bcrypt.hashSync(req.body.password, 8);

    User.findOne({ email: req.body.email }, async function(err, user) {
        if (err) return res.status(500).send('Error on the server.');
        if (user) { return res.status(404).send(`User ${req.body.email} Already exists`); }

        var user_id = await User.count({});

        User.create({
                id: user_id + 1,
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword
            },
            function(err, user) {
                if (err) return res.status(500).send("There was a problem registering the user.")
                    //create a token
                var token = jwt.sign({ id: user.id }, config.secret, {
                    expiresIn: 86400 // expires in 24 hours
                });
                res.status(200).send({ auth: true, token: token, message: "user has been registered" });

            }
        );
    });
});


router.get('/me', VerifyToken, function(req, res, next) {

    User.findById(req.userId, { password: 0 }, // projection
        function(err, user) {
            if (err) return res.status(500).send("There was a problem finding the user.");
            if (!user) return res.status(404).send("No user found.");

            res.status(200).send(user);

        });
});

//Login
router.post('/login', function(req, res) {
    User.findOne({ email: req.body.email }, function(err, user) {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
        var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({ auth: true, token: token });
    });
});

//Simulated Logout
router.get('/logout', function(req, res) {
    res.status(200).send({ auth: false, token: null });
});
module.exports = router;