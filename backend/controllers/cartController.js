import userModel from "../models/userModel.js";

// remove item from user cart
const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findOne({ _id: req.body.userId });
    let cartData = await userData.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "An error accured during the porcess" });
  }
};

// add item to user cart
const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res
      .status(200)
      .json({ success: true, message: "Item removed from the cart" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "An error accured during the process" });
  }
};

// fetch user cart data
const getCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    res.status(200).json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "An error accured during the process" });
  }
};

export { removeFromCart, addToCart, getCart };
