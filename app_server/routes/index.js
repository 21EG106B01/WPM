const express = require('express');
const { indexPage } = require('../controller');
const router = express.Router();
const ctrlProducts = require('../controller/products');
const ctrlOthers = require('../controller/others');


router.get('/', ctrlProducts.homelist);
router.get('/product/:productid', ctrlProducts.productInfo);
router.get('/new/product', ctrlProducts.addProduct);
router
    .route('/product/:productid/review/new')
    .get(ctrlProducts.addReview)
    .post(ctrlProducts.doAddReview);

router.get('/cart', ctrlProducts.buyProduct);
router.get('/transactions', ctrlProducts.transcAll);

router.get('/thankyou', ctrlOthers.thankyou);

router.get('/about', ctrlOthers.about);

module.exports = router;