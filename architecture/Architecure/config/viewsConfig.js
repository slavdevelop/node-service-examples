const path = require('path');

module.exports = (app, rootPath) => {
    app.set('views', path.join(__dirname, rootPath, 'views'));
    app.set('view engine', 'hbs');
}