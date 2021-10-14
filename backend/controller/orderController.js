const Order = require("../models/orderModels");
const Product = require("../models/productModels");
const ErrorHandler = require("../utils/ErrorHandler");
const CatchAsyncError = require("../middleware/CatchAsyncError");

// Create new Order
exports.newOrder = CatchAsyncError(async(req,res,next) => {

    const {shippingInfo,orderItems,paymentInfo,itemsPrice, taxPrice,shippingPrice,totalPrice} = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        PaidAt:Date.now(),
        user:req.user._id,
    });

    res.status(201).json({
        success:true,
        order,
    });

});


// Get single order
exports.getSingleOrder = CatchAsyncError(async(req,res,next) => {

    const order = await Order.findById(req.params.id).populate(
        "user",
        "name email"
    );

    if(!order){
        return next(new ErrorHandler("Order not found with this Id",404));
    }

    res.status(200).json({
        success:true,
        order,
    });
});

// Get loggesin user order
exports.myOrders = CatchAsyncError(async(req,res,next) => {

    const orders = await Order.find({user:req.user._id});

    res.status(200).json({
        success:true,
        orders,
    });
});