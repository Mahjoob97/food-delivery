import foodModel from "../models/foodModel.js";
import fs from "fs";

// add food item
const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: image_filename,
    category: req.body.category,
  });

  try {
    await food.save();
    res.json({ success: true, message: "added successfuly" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "something went wrong" });
  }
};

// all food list
const foodList = async (req, res) => {
  try {
    const foodItems = await foodModel.find({});
    res.json({ success: true, data: foodItems });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "something went wrong" });
  }
};

// remove food item
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`, (err) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ success: false, message: "failed to delete", err });
      }
    });

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "item deleted successfuly" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error });
  }
};

export { addFood, foodList, removeFood };
