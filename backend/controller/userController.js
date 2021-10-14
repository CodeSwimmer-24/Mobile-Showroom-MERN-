const ErrorHandler = require("../utils/ErrorHandler");
const CatchAsyncError = require("../middleware/CatchAsyncError");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

// Register a User

exports.registerUser = CatchAsyncError(async (req,res,next) => {
    const {name,email,password} = req.body;
    const user = await User.create({
        name,email,password,
        avatar:{
            public_id:"this is a sample id",
            url:"profilepictureUrl"
        },
    });

    sendToken(user,201,res);
});

// Login User

exports.loginUser = CatchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
  
    // checking if user has given password and email both
  
    if (!email || !password) {
      return next(new ErrorHandler("Please Enter Email & Password", 400));
    }
  
    const user = await User.findOne({ email }).select("+password");
  
    if (!user) {
      return next(new ErrorHandler("Invalid email or password", 400));
    }
  
    const isPasswordMatched = await user.comparePassword(password);
  
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid email or password", 400));
    }

    sendToken(user,200,res);

  });

//   Logout User

exports.logout = CatchAsyncError(async(req,res,next) => {

    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    });

    res.status(200).json({
        success:true,
        message:"Logout"
    });
});


// Forgot Password 
exports.forgotPassword = CatchAsyncError(async(req,res,next) => {
  const user = await User.findOne({email:req.body.email});

  if(!user){
    return next(new ErrorHandler("user not found",404))
  }
  // Get reset password token
 const resetToken = user.getResetPasswordToken();

 await user.save({ validateBeforeSave:false });

 const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

 const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested this email then please ignore it`;

 try{
  await sendEmail({
    email:user.email,
    subject:`Ecommerce Password Recovery`,
    message,

  });
  res.status(200).json({
    success:true,
    message:`Email sent to ${user.email} successfully`
  })

 }catch(error){
   user.resetPasswordToken = undefined;
   user.resetPasswordExpire = undefined;

   await user.save({ validateBeforeSave:false });

   return next(new ErrorHandler(error.message,500))
 };
});

// Reset Password 

exports.resetPassword = CatchAsyncError(async(req,res,next) => {

  const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: {$gt: Date.now()},
  });

    if(!user){
    return next(new ErrorHandler("Reset Password Token is invalid or has been expired",400));
  }

  if(req.body.password !== req.body.confirmPassword){
  return next(new ErrorHandler("Password doesnot match",400));
  }
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

 await user.save();

 sendToken(user,200,res);

});

// Get user Details

exports.getUserDetails = CatchAsyncError(async(req,res,token) => {

  const user = await User.findById(req.user.id);

  res.status(200).json({
    success:true,
    user,
  });
});

// Update user password

exports.updatePassword = CatchAsyncError(async(req,res,next) => {

  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("password does not match", 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});

// Update user profile

exports.updateProfile = CatchAsyncError(async(req,res,next) => {

  const newUserData = {
    name:req.body.name,
    email:req.body.email,
  }

  const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
    new:true,
    runValidators:true,
    useFindAndModify:false
  });

  res.status(200).json({
    success:true,
  })
  sendToken(user, 200, res);
});


// Get all users (For admin to see other normal user details)

exports.getAllUsers = CatchAsyncError(async(req,res,next) => {
  const users = await User.find();

  res.status(200).json({
    success:true,
    users,
  });
});

// Get all users (For admin to see other single user details)

exports.getSingleUser = CatchAsyncError(async(req,res,next) => {
  const user = await User.findById(req.params.id);

  if(!user){
    return next(
      new ErrorHandler(`User does not exist`)
    );
  }

  res.status(200).json({
    success:true,
    user,
  });
});


// Update user role

exports.updateUserRole = CatchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user,
  });
});

// Delete User 

exports.deleteUser = CatchAsyncError(async(req,res,next) => {

   const user = await User.findByIdAndDelete(req.params.id);

   if(!user){
     return next(new ErrorHandler(`User does not exist`))
   }

  res.status(200).json({
    success:true,
    message:"User deleated successfully"
  });
});
