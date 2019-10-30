const envConfig = require('./envConfig');
const initDb = require('./dbConfig');
const initMiddleware = require('./middlewareConfig');
const initViews = require('./viewsConfig');
const initRoutes = require('./routesConfig');

const environment = process.env.NODE_ENV || 'development';
const { dbConnectionString, port, rootPath } = envConfig[environment];

module.exports = (app) => {
    initMiddleware(app, rootPath);
    initViews(app, rootPath);
    initRoutes(app);
    initDb(app, dbConnectionString, port);
}