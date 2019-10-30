var mongoose = require('mongoose');
var connectionString = 'mongodb://localhost:27017/auth-jwt';

module.exports = () => {
    mongoose.connect(connectionString);
};