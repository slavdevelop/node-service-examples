const authRouter = require('../routes/auth');
const feedRouter = require('../routes/feed');

module.exports = (app) => {
    app.use('/auth', authRouter);
    //app.use('/feed', feedRouter);
};