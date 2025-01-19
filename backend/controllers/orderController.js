import orderModel from "../models/ordersModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// placing order for frontend
const placeOrder = async (req, res) => {
  const fronendURL = "http://localhost:5174";

  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "SAR",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100 * 3.75,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "SAR",
        product_data: {
          name: "Delivery charges",
        },
        unit_amount: 3 * 100 * 3.75,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${fronendURL}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${fronendURL}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.status(200).json({
      success: true,
      session_url: session.url,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error accured",
    });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success == "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "payment received successfuly" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Payment cancled" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error accured during the process" });
  }
};

// user orders for frontend
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error accured druing the process" });
  }
};

//list all orders for admin panel
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "An error accured during the process",
    });
  }
};

//api for updating order status
const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });
    res.json({ success: true, message: "status updated" });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "An error accured during the process",
    });
  }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
