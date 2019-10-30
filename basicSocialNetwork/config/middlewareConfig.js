const cookieParser = require('cookie-parser');
const logger = require('morgan');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

module.exports = (app, rootPath) => {
    app.use(bodyParser.json());
    app.use(logger('dev'));
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, rootPath, 'public')));

    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        next();
    });

    // app.use((req, res, next) => {
    //     next(createError(404));
    // });
}