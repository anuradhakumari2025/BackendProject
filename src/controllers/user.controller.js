import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models.user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  /*
  //for api testing
  res.status(200).json({
    message: "ok",
 });
 */
  //steps for register of user
  //get user details from frontend

  const { fullName, email, username, password } = req.body;
  console.log("email", email);

  //validation - not empty
  //either check validation using nested ifElse or use method of array.some
  /*  if(fullName === ""){
     throw new ApiError(400,"fullName can't be blank")
   }*/

  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }
  /*field => field?.trim() === "": This arrow function takes each element of the array (fullName, email, username, password) as field and checks if, after trimming, it is an empty string.
  .some(field => ...): The .some() method will return true if at least one of the fields is empty or contains only whitespace.*/

  //check if user already exists : username,email
  const existedUser = User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new ApiError(409, "User with email or username already existed");
  }

  /* 
  findOne() is a Mongoose method that retrieves a single document (user) from the database that matches the given query. It returns the first document it finds that meets the criteria, or null if no document matches

  { username }: This is shorthand for { username: username }, meaning the query is checking if there is a document where the username field matches the username variable's value.
  { email }: Similarly, this checks if the email field in the document matches the email variable's value.
  The $or operator ensures that the query will return a user document if either the username or the email matches.
  */

  //check for images,check for avatar
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "avatar required");
  }
  //upload them to cloudinary,avatar

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);
  if (avatar) {
    throw new ApiError(400, "avatar required");
  }

  //create user object - create entry in db

  const user = await User.create({
    fullName,
    password,
    email,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    username: username.toLowerCase(),
  });

  //check for user creation

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  //remove password and refresh token field from response

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering of user");
  }

  //return res
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

export { registerUser };
