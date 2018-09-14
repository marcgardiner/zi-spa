require('dotenv');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
require('./app_api/models/db');
const uglifyJs = require('uglify-js');
const fs = require('fs');
const passport = require('passport');
require('./app_api/config/passport');

const routesApi = require('./app_api/routes/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'jade');

// uglify
const appClientFiles = [
    'app_client/app.js',
    'app_client/home/home.controller.js',
    'app_client/about/about.controller.js',
    'app_client/common/services/geolocation.service.js',
    'app_client/common/services/zispaData.service.js',
    'app_client/common/filters/formatDistance.filter.js',
    'app_client/common/filters/addHtmlLineBreaks.filter.js',
    'app_client/common/directives/ratingStars/ratingStars.directive.js',
    'app_client/common/directives/footerGeneric/footerGeneric.directive.js',
    'app_client/common/directives/navigation/navigation.directive.js',
    'app_client/common/directives/pageHeader/pageHeader.directive.js',
    'app_client/locationDetail/locationDetail.controller.js'
];

const fileContent = appClientFiles.map((file) => {
    return fs.readFileSync(file, 'utf-8');
});

const uglified = uglifyJs.minify(fileContent, {
    compress: false
});

fs.writeFile('public/angular/zispa.min.js', uglified.code, (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log('Script generated and saved: zispa.min.js');
    }
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_client')));
app.use(passport.initialize());

app.use('/api', routesApi);

app.use((req, res) => {
    res.sendfile(path.json(__dirname, 'app_client', 'index.html'));
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.use((err, req, res, next) => {
    if (err.name === 'unauthorizedError') {
        res.status(401);
        res.join({ 'message': `${err.name}: ${err.message}` });
    }
});

module.exports = app;
