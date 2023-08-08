var express = require('express');
const { indexPage } = require('../controller');
var router = express.Router();

/* GET home page. */
router.get('/',indexPage)

module.exports = router;
