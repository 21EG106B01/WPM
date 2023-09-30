const mongoose = require('mongoose');
const Prod = mongoose.model('Product');
const express = require('express');

express().use(express.urlencoded({ extended: true }));

async function productsAll(req, res) {
    try {
        const data = await Prod.find({})
            .then(function (products) {
                res.status(200).json(products);
            })
    } catch (err) {
        res.status(404).json(err);
    }
};
async function productsCreate (req, res) {
    try {
        const prod = await Prod.create({
            name: req.body.name,
            smalDesc: req.body.smalDesc,
            prodDesc: req.body.prodDesc,
            tags: req.body.tags.split(','),
            imgSrc: `/resources/${req.file.filename}`,
            prodVar: [{
                variation: req.body.variation1,
                price: req.body.price1
            }, {
                variation: req.body.variation2,
                price: req.body.price2
            }, {
                variation: req.body.variation3,
                price: req.body.price3
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
                .redirect('/');
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
    try {
        await Prod
            .findById(req.params.productid)
            .select('-reviews -rating')
            .then(function (product) {
                product.name = req.body.name;
                product.smalDesc = req.body.smalDesc;
                product.prodDesc = req.body.prodDesc;
                product.tags = req.body.tags.split(',');
                product.company = {
                    name: req.body.cname,
                    desc: req.body.cdesc,
                    address: req.body.caddress
                };
                product.prodVar = [{
                    variation: req.body.variation1,
                    price: req.body.price1
                }, {
                    variation: req.body.variation2,
                    price: req.body.price2
                }];
            });
        try {
            product.save(prod)
                .then(res.status(200).json(loc));
        } catch (err) {
            res.status(404).json(err);
        }
    } catch (err) {
        return res.status(404).json(err);
    }
};
async function productsDeleteOne (req, res) {
    try {
        const { productid } = req.params;
        if (productid) {
            Prod.findByIdAndRemove(productid)
                .then(function (product) {
                    res.status(204).json(null);
                });
        } else {
            res.status(404).json({ "message": "No Product" });
        }
    } catch (err) {
        return res.status(404).json(err);
    }
};

module.exports = {
    productsAll,
    productsCreate,
    productsReadOne,
    productsUpdateOne,
    productsDeleteOne
};