const mongoose = require('mongoose');

function initDb(connectionString) {
    return new Promise((resolve, reject) => {
        mongoose.connect(connectionString, (err) => {
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
        .catch(console.error);
};