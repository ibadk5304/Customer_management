var express = require('express');
const { route } = require('.');
var router = express.Router();

//var songsRouter = require('./songs');
var customerRouter = require('./customers');

//router.use('/songs',songsRouter)
router.use('/customers',customerRouter)

var usersRouter= require('./users');
router.use('/users',usersRouter);

router.get('/',function(req, res){
    res.send('Welcome to the API');
})

module.exports = router;