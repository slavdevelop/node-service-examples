module.exports = (app) => {

    // General error handling
    app.use((err, req, res, next) => {
        const status = err.statusCode || 500;
        const message = err.message;
        res.status(status).json({ message: message });
        next();
    });
}