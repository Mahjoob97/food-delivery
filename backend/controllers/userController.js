import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// creating token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// user login
const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "user doesn't exist" });
    }

    // checking if the password is match
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: "invalid username or password",
      });
    } else {
      const token = createToken(user._id);
      res.json({ success: true, token });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "something went wrong" });
  }
};

// user register
const userRegister = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    // checking if the user exist
    const userExist = await userModel.findOne({ email });
    if (userExist) {
      return res.json({ success: false, message: "Email already exist" });
    }

    // validating the email format and password
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "please enter a valid email address",
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "password must not be less than 8 digits",
      });
    }

    // encrypting the user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // creating the new user
    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    //saving the user in the DB
    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error accured during the process" });
  }
};

export { userLogin, userRegister };
