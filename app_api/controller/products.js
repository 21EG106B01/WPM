const mongoose = require('mongoose');
const Prod = mongoose.model('Product');

async function productsListByPrice (req, res) { };
async function productsCreate (req, res) {
    try {
        const prod = await Prod.create({
            name: req.body.name,
            smalDesc: req.body.smalDesc,
            prodDesc: req.body.prodDesc,
            tags: req.body.tags.split(','),
            prodVar: [{
                variation: req.body.variation1,
                price: req.body.price1
            }, {
                variation: req.body.variation2,
                price: req.body.price2
            }],
            company: {
                name: req.body.cname,
                desc: req.body.cdesc,
                address: req.body.caddress
            }
        })
        .then(function (product) {
            res
                .status(201)
                .json(product);
        });
    } catch (err) {
        return res
            .status(404)
            .json("PetNeeds Error : " + err);
    }
};
async function productsReadOne(req, res) {
    try {
        const prodId = await Prod.findById(req.params.productid)
            .then(function (product) {
                res
                    .status(200)
                    .json(product);
            });
    } catch (err) {
        return res
            .status(404)
            .json(err);
    }
};
async function productsUpdateOne (req, res) {
    res
        .status(200)
    .json({ "status": "success" });
};
async function productsDeleteOne (req, res) {
    res
        .status(200)
    .json({ "status": "success" });
};

module.exports = {
    productsListByPrice,
    productsCreate,
    productsReadOne,
    productsUpdateOne,
    productsDeleteOne
};