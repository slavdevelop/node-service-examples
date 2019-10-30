const app = require('express')();
const setupConfig = require('./config/setupConfig');

setupConfig(app);

module.exports = app;