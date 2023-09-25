const request = require('request');
const apiOptions = {
    server: "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
    apiOptions.server = 'https://petneedstore.cyclic.cloud';
};

const renderHomepage = (req, res, responseBody) => {
    res.render('products-list', {
        title: 'PetNeeds - For all your pets needs',
        pageHeader: {
            title: 'PetNeeds',
            strapline: 'Find the best products for your pets'
        },
        sidebar: 'Looking for grooming products for your pets? PetNeeds helps you find the best qulity products for your pets. Perhaps a brush or food? Let PetNeeds help you find the products you are looking for.',
        products: responseBody
    });
};

const renderDetailPage = (req, res, product) => {
    res.render('product-info', {
        title: `${product.name}`,
        product,
        sidebar: {
            last: 'If you have bought and liked it - or if you dont - please leave a review to help other people just like you.'
        }
    });
};

const renderReviewForm = (req, res, body) => {
    res.render('product-review-form', {
        title: 'Add Review',
        imgSrc: `${body.imgSrc}`,
        productid: body._id,
        pageHeader: {
            title: `${body.name} - ${body.company.name}`
        },
        error: req.query.err
    });
};

const showError = (req, res, status) => {
    let title = '';
    let content = '';
    if (status === 404) {
        title = '404, page not found';
        content = 'Looks like you can\'t find this page. Sorry.';
    } else {
        title = `${status}, something's gone wrong`;
        content = 'Something, somewhere, has gone just a little bit wrong.';
    }
    res.status(status);
    res.render('generic-text', {
        title,
        content
    });
};

const doAddReview = (req, res, product) => {
    const productid = req.params.productid;
    const path = `/api/products/${productid}/reviews`;
    const postdata = {
        author: req.body.name,
        rating: parseInt(req.body.rating, 10),
        reviewText: req.body.review
    };
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'POST',
        json: postdata
    };
    if (!postdata.author || !postdata.rating || !postdata.reviewText) {
        res.redirect(`/product/${productid}/review/new?err=val`);
    } else {
        request(
            requestOptions,
            (err, { statusCode }, { name }) => {
                if (statusCode === 201) {
                    res.redirect(`/product/${productid}`);
                } else if (statusCode === 400 && name && name === 'ValidationError') {
                    res.redirect(`/product/${productid}/review/new?err=val`);
                } else if (statusCode === 400) {
                    console.log("Waste Error");
                    showError(req, res, statusCode);
                } else {
                    showError(req, res, statusCode);
                }
            }
        )
    };
};

const getProductInfo = (req, res, callback) => {
    const path = `/api/products/${req.params.productid}`;
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {}
    };
    request(
        requestOptions,
        (err, { statusCode }, body) => {
            if (statusCode === 200) {
                callback(req, res, body);
            } else {
                showError(req, res, statusCode);
            }
        });
};



const homelist = (req, res) => {
    const path = '/api/products';
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {},
        qs: {}
    };
    request(
        requestOptions,
        (err, response, body) => {
            renderHomepage(req, res, body);
        }
    );
};

/* GET 'Product info' page */
const productInfo = (req, res) => {
    getProductInfo(req, res,
        (req, res, responseData) => renderDetailPage(req, res, responseData)
    );
};

/* GET 'Add product' page */
const addProduct = (req, res) => {
    res.render('product-add-form', {
        title: 'Add Product'
    });
};

/* GET 'Add review' page */
const addReview = (req, res) => {
    getProductInfo(req, res,
        (req, res, responseData) => renderReviewForm(req, res, responseData)
    );
};
    
module.exports = {
    homelist,
    productInfo,
    addProduct,
    addReview,
    doAddReview
};