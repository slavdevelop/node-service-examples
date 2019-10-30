module.exports = {
    development: {
        dbConnectionString: 'mongodb://localhost:27017/baseRestApiDB',
        port: 3000,
        jwtSecret: 'ggmu',
        rootPath: '../'
    },
    production: {
        dbConnectionString: 'http://some-cloud-host',
        port: process.env.PORT || 3000,
        jwtSecret: process.env.SECRET || 'ggmu',
        rootPath: '../'
    }
};