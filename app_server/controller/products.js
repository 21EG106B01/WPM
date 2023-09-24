const request = require('request');
const apiOptions = {
    server: "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
    apiOptions.server = 'https://petneedstore.cyclic.app';
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
    path = `/api/products/${req.params.productid}`;
    requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: "GET",
        json: {},
        qs: {}
    };
    request(requestOptions, (err, {statusCode} , body) => {
        if (statusCode === 200)
            renderDetailPage(req, res, body);
        else showError(req, res, statusCode);
    });
};

/*GET 'Add product' page */
const addProduct = (req, res) => {
    res.render('product-add-form', {
        title: 'Add Product'
    });
};

/* GET 'Add review' page */
const addReview = (req, res) => {
    res.render('product-review-form', {
        title: 'Add review',
        product: 'Pedigree'
    });
};
    
module.exports = {
    homelist,
    productInfo,
    addProduct,
    addReview
};