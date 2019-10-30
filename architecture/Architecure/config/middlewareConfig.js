const cookieParser = require('cookie-parser');
const logger = require('morgan');
const createError = require('http-errors');
const express = require('express');
const path = require('path');

module.exports = (app, rootPath) => {
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, rootPath, 'public')));

    // app.use((req, res, next) => {
    //     next(createError(404));
    // });

    app.use((err, req, res, next) => {
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        res.status(err.status || 500);
        res.render('error');
    });
}