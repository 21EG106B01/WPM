const express = require('express');
const { indexPage } = require('../controller');
const router = express.Router();
const ctrlProducts = require('../controller/products');
const ctrlOthers = require('../controller/others');


router.get('/', ctrlProducts.homelist);
router.get('/product', ctrlProducts.productInfo);
router.get('/product/review/new', ctrlProducts.addReview);

router.get('/about', ctrlOthers.about);

module.exports = router;
