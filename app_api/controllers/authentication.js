import { mongo } from 'mongoose';

const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

const sendJSONresponse = (res, status, content) => {
    res.status(status);
    res.json(content);
};

module.exports.register = (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.passport) {
        sendJSONresponse(res, 400, {
            'message': 'All fields required'
        });
        return;
    }
    const user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.setPassword(req.body.password);

    user.save((err) => {
        let token;
        if (err) {
            sendJSONresponse(res, 404, err);
        }
        else {
            token = user.generateJwt();
            sendJSONresponse(res, 200, {
                'token': token
            });
        }
    });
};
