const envConfig = require('./envConfig');
const initDb = require('./dbConfig');
const initMiddleware = require('./middlewareConfig');
const initRoutes = require('./routesConfig');
const initErrorHandling = require('../middlewares/errorHandlingMiddleware');

const environment = process.env.NODE_ENV || 'development';
const { dbConnectionString, port, rootPath } = envConfig[environment];

module.exports = (app) => {
    initMiddleware(app, rootPath);
    initRoutes(app);
    initErrorHandling(app);
    initDb(app, dbConnectionString, port);
}