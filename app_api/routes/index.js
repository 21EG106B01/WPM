const express = require('express');
const router = express.Router();
const ctrlProducts = require('../controller/products');
const ctrlReviews = require('../controller/reviews');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/resources/');
    },
    filename: function (req, file, cb) {
        cb(null, Math.round(Math.random() * 1E9) + file.originalname);
    }
});
const upload = multer({ storage: storage });

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
module.exports = router;