const Product = require("../models/productModels");
const ErrorHandler = require("../utils/ErrorHandler");
const CatchAsyncError = require("../middleware/CatchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");


// Create Products -- (Admin Dashboard)

exports.createProduct = CatchAsyncError(async(req,res,next) => {

    req.body.user = req.user.id;

    const product = await Product.create(req.body);
    res.status(200).json({
        success:true,
        product
    })
});

// Get Products

exports.getAllProducts = CatchAsyncError(async (req,res,next) => {

const resultPerPage = 5;
const productCount = await Product.countDocuments();

 const apiFeature = new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage);
    const products = await apiFeature.query; 
    res.status(200).json({
        success:true,
        products,
        productCount
    })
})

// Update PRoducts -- (Admin)

exports.updateProduct = CatchAsyncError(async (req,res,next) => {
    let product =  await Product.findById(req.params.id);
    if(!product){
        return res.status(500).json({
            success:false,
            message:"Product not found"
        }) 
    }
    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
    new:true,
    ranValidators:true,
    useFindAndModify:false
   });
   res.status(200).json({
       success:true,
       product
   })
});

// Delete Products

exports.deleteProduct = CatchAsyncError(async(req,res,next) => {

    const product = await Product.findByIdAndDelete(req.params.id);

    res.send({
        success:true,
        message:"Product Deleated Sucessfully"
    })

    // if(!product){
    //     return res.status(500).json({
    //         success:false,
    //         message:"Product not found"
    //     })
    // }

    //  await Product.remove().exec();

    // res.status(200).json({
    //     success:true,
    //     message:"Product Deleted sucessfully"
    // })

});

// Get products Details

exports.getProductDetails = CatchAsyncError(async(req,res,next) => {
    const product = await Product.findById(req.params.id);
    if(!product){
        // return res.status(500).json({
        //     success:false,
        //     message:"Product not found"
        // })
        return next(new ErrorHandler("Product not Found",404))
    }
    res.status(200).json({
        success:true,
        product
    })
})