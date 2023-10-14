const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Product = mongoose.model('Product');

const cartItemSchema = new Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    cost: Number,
    totalCost: Number
});

const transacSchema = new Schema({
    transacId: Number,
    productId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }],
    cost: [Number],
    totalCosts: [Number],
    quantity: [Number],
    total: Number,
    paymethod: String,
    address: String,
    special: String
});

mongoose.model("CartItem", cartItemSchema);
mongoose.model("Transaction", transacSchema);