/**
 * Created by Igor on 15.07.2017.
 */
const db = require('../db');


function getAllMessages(callback) {
    db.get().collection('messages').find().sort({dateOfPost: 1}).toArray(function (err, docs) {
        callback(err, docs)
    })
}

function createMessage(message, callback) {
    db.get().collection('messages').insertOne(message, function (err, docs) {
        callback(err, docs)
    })
}



module.exports = {
    getAllMessages: getAllMessages,
    createMessage: createMessage

};
