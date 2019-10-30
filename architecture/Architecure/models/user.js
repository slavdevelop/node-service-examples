const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 30
    },
    firstName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30
    },
    lastName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30
    }
});

module.exports = model('User', UserSchema);