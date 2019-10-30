const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

function initDb(connectionString) {
    return new Promise((resolve, reject) => {
        mongoose.connect(connectionString, { useNewUrlParser: true }, (err) => {
            if (err) {
                reject(err);
            }

            resolve();
        });
    });
}

module.exports = (app, dbConnectionString, port) => {
    initDb(dbConnectionString)
        .then(() => {
            console.log('Successfully connected to database !');
            app.listen(port, () => {
            console.log(`Server is running on port ${port} . . .`);
            });
        })
        .catch((err) => console.error(err));
};