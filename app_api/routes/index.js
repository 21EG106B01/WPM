const express = require('express');
const router = express.Router();
const ctrlProducts = require('../controller/products');
const ctrlReviews = require('../controller/reviews');
const ctrlCart = require('../controller/cart');
const upload = require('../middlewares/multer');

// products
router
    .route('/products')
    .get(ctrlProducts.productsAll)
    .post(upload.single('imgSrc'), ctrlProducts.productsCreate);
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

//cart
router
    .route('/cart')
    .post(ctrlCart.addToCart)
    .get(ctrlCart.showCart);

router
    .route('/cart/:cartid')
    .put(ctrlCart.changeCartItem)
    .delete(ctrlCart.deleteCartItem);

router
    .route('/cart/complete')
    .post(ctrlCart.completeCart)
    .get(ctrlCart.getTransc);


module.exports = router;