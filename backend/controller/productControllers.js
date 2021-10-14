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
});


// Create New Review or apdate the rivew 

exports.createProductReview = CatchAsyncError(async (req, res, next) => {
    const { rating, comment, productId } = req.body;
  
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };
  
    const product = await Product.findById(productId);
  
    const isReviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );
  
    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString())
          (rev.rating = rating), (rev.comment = comment);
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }
  
    let avg = 0;
  
    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    product.ratings = avg / product.reviews.length;
  
    await product.save({ validateBeforeSave: false });
  
    res.status(200).json({
      success: true,
    });
  });

  // Get all reviews of a product 
  exports.getProductReviews = CatchAsyncError(async(req,res,next) => {
    const product = await Product.findById(req.query.id);

    if(!product){
      return next(new ErrorHandler("product not found",404));
    }
    res.status(200).json({
      success:true,
      reviews:product.reviews,
    });
  });

 // Delete Review
 exports.deleteReview = CatchAsyncError(async (req, res, next) => {


  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});

