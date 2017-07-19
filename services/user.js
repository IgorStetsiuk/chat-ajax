/**
 * Created by Igor on 14.07.2017.
 */
const db = require('../db');



function getAllUsers(callback) {
    db.get().collection('users').find().toArray(function (err, docs) {
        callback(err, docs)
    })
}

function createUser(user, callback) {
    db.get().collection('users').insertOne(user, function (err, docs) {
        callback(err, docs)
    })
};


module.exports = {
    getAllUsers: getAllUsers,
    createUser: createUser

};