const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

const sendJSONresponse = (res, status, content) => {
    res.status(status);
    res.json(content);
};

module.exports.register = (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
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

module.exports.login = (req, res) => {
    if (!req.body.email || !req.body.password) {
        sendJSONresponse(res, 400, {
            'message': 'All fields required'
        });
        return;
    }
    passport.authenticate('local', (err, user, info) => {
        let token;
        if (err) {
            sendJSONresponse(res, 404, err);
            return;
        }
        if (user) {
            token = user.generateJWT();
            sendJSONresponse(res, 200, {
                'token': token
            });
        }
        else {
            sendJSONresponse(res, 401, info);
        }
    })(req, res);
};
