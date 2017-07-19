/**
 * Created by Igor on 14.07.2017.
 */
const router = require('express').Router();
const messageService = require('../services/message');


router.get('/messages', (req, res) => {
    messageService.getAllMessages(function (err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    })
});
router.post('/messages', (req, res) => {
let message ={
    nickname:req.body.nickname,
    author:req.body.author,
    text:req.body.text,
    dateOfPost:req.body.dateOfPost
};
    messageService.createMessage(message, (err, docs) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(message);
    });
});


module.exports = router;