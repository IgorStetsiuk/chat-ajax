/**
 * Created by Igor on 14.07.2017.
 */
const router = require('express').Router();
let userService = require('../services/user');


router.get('/users', (req, res) => {
    userService.getAllUsers(function (err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    })
});


router.post('/users', (req, res) => {
    let user = {
        name: req.body.name,
        nickname: req.body.nickname,
    };
    userService.createUser(user, function (err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.sendStatus(200);
    })
});



module.exports = router;


