var system    = require('../controllers/system');
var express    = require('express');
var router     = express.Router();

router.post('/fam', system.fam);

module.exports = router;
