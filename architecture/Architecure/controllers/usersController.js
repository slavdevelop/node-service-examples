const User = require('../models/user');

class UsersController {
    getUsers(req, res) {
        res.render('user/users');
    }

    getRegister(req, res) {
        res.render('user/register')
    }

    getProfile(req, res) {
        User.find({})
            .then((users) => {
                res.render('user/profile', { users });
            })
            .catch(err => {
                return res.render('error', err);
            })
    }

    postRegister(req, res) {
        const { email, password, firstName, lastName } = req.body;
        const user = new User({ email, password, firstName, lastName });

        user.save()
            .then(() => {
                res.redirect('/users/profile');
            })
            .catch(err => {
                console.log(err);
                res.render('error', err);
            });
    }
}

module.exports = UsersController;