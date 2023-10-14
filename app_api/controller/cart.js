const mongoose = require('mongoose');
const cartItem = mongoose.model("CartItem");
const Prod = mongoose.model("Product");
const Transac = mongoose.model("Transaction");

async function findCost(prodid) {
    const item = await Prod
        .findById(prodid)
        .select('prodVar.price');
    return item.prodVar[0].price;
}

async function addToCart(req, res) {
    try {
        const productId = req.body.productId;
        let Item = await cartItem.findOne({ productId: productId });

        if (Item) {
            Item.quantity += 1;
            Item.totalCost = Item.quantity * Item.cost;
            await Item.save();
        } else {
            const cost = await findCost(productId);
            Item = await cartItem.create({
                productId: productId,
                quantity: 1,
                cost: cost,
                totalCost: cost
            });
        }
        res.status(201).redirect(`/product/${productId}`);
    } catch (err) {
        res.status(400).json(err);
    }
}

async function showCart(req, res) {
    try {
        const cart = await cartItem.find({})
        .populate('productId')
            .then(function (cartitems) {
                res.status(200).json(cartitems);
            })
    } catch (err) {
        console.log(err);
        redirect('/');
    }
}

async function changeCartItem(req, res) {
    const { cartid } = req.params;
    const updatedData = req.body;
    try {
        const data = await cartItem.findByIdAndUpdate(cartid, updatedData, { new: true });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error updating data' });
    }
}

async function deleteCartItem(req, res) {
    try {
        const { cartid } = req.params;
        const data = await cartItem.findByIdAndDelete(cartid);
        if (!data) {
            return res.status(404).json({ error: "Cart item not found" });
        }
        res.status(200).json({message: "Item deleted succesfully"});
    } catch (error) {
        res.status(500).json({ error: 'Error updating data' });
    }
}

async function completeCart(req, res) {
    try {
        const cartItems = await cartItem.find({});
        await Transac.create({
            transacId: Math.floor(Math.random(8) * 900000000),
            productId: cartItems.map(item => item.productId), // Extract product IDs from cart items
            cost: cartItems.map(item => item.cost), // Extract costs from cart items
            quantity: cartItems.map(item => item.quantity), // Extract quantities from cart items
            totalCosts: cartItems.map(item => item.totalCost),
            total: req.body.total,
            paymethod: req.body.paymethod,
            address: req.body.address,
            special: req.body.special
        });
        cartItem.deleteMany({})
            .then(function () {
                console.log('All documents deleted successfully');
                res.status(200).redirect('/thankyou');
            });
    } catch (err) {
        res.status(400).json(err);
    }
}

async function getTransc(req, res) {
    try {
        const transc = await Transac.find({})
            .populate('productId')
            .then(function (transactions) {
                res.status(200).json(transactions);
            })
    } catch (err) {
        console.log(err);
        redirect('/');
    }
}

module.exports = {
    addToCart,
    showCart,
    changeCartItem,
    deleteCartItem,
    completeCart,
    getTransc
}