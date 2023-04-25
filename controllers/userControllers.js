import {User} from "../models/UserModel.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import {sendToken } from "../utils/sendToken.js";

export const registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password, mobile } = req.body;

    if(!name || !email || !password || !mobile)return next(new ErrorHandler("Please enter all fields", 400))

    const user = await User.findOne({email});
    if(user) return next(new ErrorHandler("User already exists", 400));

  const Newuser = await User.create({
    name,
    email,
    password,
    mobile,
    avatar: {
      public_id: "public_id",
      url: "url",
    },
  });


  sendToken(res, Newuser, "Registerd successfully", 201);

});


//login route

export const loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new ErrorHandler("Please enter all field", 400));

  const user = await User.findOne({ email }).select("+password");

  if (!user) return next(new ErrorHandler("Incorrect Email or Password", 401));

  const isMatch = await user.comparePassword(password);

  if (!isMatch)
    return next(new ErrorHandler("Incorrect Email or Password", 401));

  sendToken(res, user, `Welcome back, ${user.name}`, 200);
});

//logout
export const logout = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })
    .json({
      success: true,
      message: "Logged Out Successfully",
    });
});


//get profile;
export const getProfile = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user._id);
    
    res.status(200).json({
        success: true,
        user,
    });
})
