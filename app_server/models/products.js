const mongoose = require('mongoose');

const companyDescSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    desc: String,
    coords: {
        type: { type: String },
        index: [Number]
    },
    address: String
});

const prodVariationSchema = new mongoose.Schema({
    variation: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

const reviewSchema = new mongoose.Schema({
    author: String,
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    reviewText: String,
    createdOn: {
        type: Date,
        'default': Date.now
    }
});

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    smalDesc: String,
    prodDesc: String,
    rating: {
        type: Number,
        'default': 0,
        min: 1,
        max: 5
    },
    tags: [String],
    company: companyDescSchema,
    prodvar: [prodVariationSchema],
    reviews: [reviewSchema]
});

companyDescSchema.index({ coords: '2dsphere' });

mongoose.model('Product', productSchema);
