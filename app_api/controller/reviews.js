const mongoose = require('mongoose');
const Prod = mongoose.model('Product');

async function reviewsCreate (req, res) { };
async function reviewsReadOne(req, res) {
    try {
        const prodId = await Prod.findById(req.params.productid)
        .select("name reviews")
            .then(function (product) {
                if (product.reviews && product.reviews.length > 0) {
                    const review = product.reviews.id(req.params.reviewid);
                    response = {
                        product: {
                            name: product.name,
                            id: req.params.productid
                        },
                        review
                    }
                    res
                        .status(200)
                        .json(review);
                } else {
                    return res
                        .status(404)
                        .json({ "message": "No Reviews found" });
                }
            });
    } catch (err) {
        return res
            .status(404)
            .json(err);
    }
};
async function reviewsUpdateOne (req, res) { };
async function reviewsDeleteOne (req, res) { };

module.exports = {
    reviewsCreate,
    reviewsReadOne,
    reviewsUpdateOne,
    reviewsDeleteOne
};