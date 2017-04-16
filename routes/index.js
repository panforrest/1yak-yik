var express = require('express');
var router = express.Router();

var app = require('../public/build/es5/serverapp')

/* GET home page. */
router.get('/', function(req, res, next) {

    var testHtml = '<h1>Test Title</h1>'
    res.render('index', { react:testHtml });
  // res.render('createzone', { title: 'Express' });
});

router.get('/:page', function(req, res, next) {
    res.render(req.params.page, null);	

});

module.exports = router;
