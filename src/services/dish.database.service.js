const Dish = require("../models/dish.model");

exports.findAllDishes = () => {
  return Dish.find().populate("dishCategory").exec();
};

exports.findDishById = (id) => {
  return Dish.findById(id).exec();
};

exports.createNewDish = (dish) => {
  const newDish = new Dish(dish);
  return newDish.save();
};

exports.findDishByIdAndUpdate = (id, data) => {
  return Dish.findByIdAndUpdate(id, data, { returnDocument: "after" }).exec();
};

exports.findDishByIdAndDelete = (id) => {
  return Dish.findByIdAndDelete(id).exec();
};
