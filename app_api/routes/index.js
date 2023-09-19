const express = require('express');
const router = express.Router();
const ctrlProducts = require('../controller/products');
const ctrlReviews = require('../controller/reviews');

// products
router
    .route('/products')
    .get(ctrlProducts.productsListByPrice)
    .post(ctrlProducts.productsCreate);
router
    .route('/products/:productid')
    .get(ctrlProducts.productsReadOne)
    .put(ctrlProducts.productsUpdateOne)
    .delete(ctrlProducts.productsDeleteOne);

// reviews
router
    .route('/products/:productid/reviews')
    .post(ctrlReviews.reviewsCreate);
router
    .route('/products/:productid/reviews/:reviewid')
    .get(ctrlReviews.reviewsReadOne)
    .put(ctrlReviews.reviewsUpdateOne)
    .delete(ctrlReviews.reviewsDeleteOne);
module.exports = router;