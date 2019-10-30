const { Schema, model } = require('mongoose');
const encryption = require('../utils/encryption');

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },

    hashedPassword: {
        type: String,
        required: true
    },

    salt: {
        type: String,
        required: true
    },

    posts: [
        { type: Schema.Types.ObjectId, ref: 'Post' }
    ],

    comments: [
        { type: Schema.Types.ObjectId, ref: 'Comment' }
    ]
});

userSchema.method({
    authenticate: function (password) {
        const currentHashedPassword = encryption.generateHashedPassword(this.salt, password);

        return currentHashedPassword === this.hashedPassword;
    }
})

module.exports = model('User', userSchema);