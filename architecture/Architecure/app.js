const express = require('express');
const setupConfig = require('./config/setupConfig');

const app = express();

setupConfig(app);

module.exports = app;