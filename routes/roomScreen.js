var express = require('express');
var router = express.Router();

/* GET roomScreen. */
router.get('/', function(req, res, next) {
    res.render('roomScreen', { title: 'Choose a room' });
});

module.exports = router;
