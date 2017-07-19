/**
 * Created by Igor on 14.07.2017.
 */
const user = require('./user');
const message = require('./message');

module.exports = (app) => {
    app.use('/', user);
    app.use('/', message);
};