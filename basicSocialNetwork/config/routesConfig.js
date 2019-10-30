const indexRouter = require('../routes/index');
const usersRouter = require('../routes/users');
const postsRouter = require('../routes/posts');
const commentsRouter = require('../routes/comments');
const reactionsRouter = require('../routes/reactions');

module.exports = (app) => {
    app.use('/users', usersRouter);
    app.use('/posts', postsRouter);
    app.use('/comments', commentsRouter);
    app.use('/reactions', reactionsRouter);
    app.use('/', indexRouter);
};