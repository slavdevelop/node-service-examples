const { Schema, model } = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const emailValidator = require('email-validator');

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: (value) => emailValidator.validate(value)
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [
        {
            _id: {
                type: String,
                required: true
            }
        }
    ]
});

UserSchema.methods.generateAuthToken = function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toHexString() }, 'secret');

    user.tokens.push(token);
    
    return user.save()
        .then(() => token)
        .catch((err) => console.log(err));
};

UserSchema.statics.findByToken = function (token) {
    const User = this;
    let decodedToken;

    try {
        decodedToken = jwt.verify(token, 'secret');
    } catch (e) {
        Promise.reject(err);
    }

    return User.findOne({
        _id: decodedToken._id
    });
}

function hashPassword(password) {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                reject(err);
            }

            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    reject(err);
                }

                resolve(hash);
            });
        });
    });
}

UserSchema.pre('save', function(next) {
    var user = this;
    
    if (user.isModified('password')) {
        hashPassword(user.password)
            .then((hashedPassword) => user.password = hashedPassword)
            .then(() => next());
    } else {
        next();
    }
})

const User = model('User', UserSchema);

module.exports = User;