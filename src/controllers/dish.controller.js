const Dish = require("../models/dish.model");

// get all dishes data
exports.getAllDishes = (req, res) => {
  Dish.find()
    .exec()
    .then((allDishes) => {
      return res.status(200).json({
        success: "Get all dishes!",
        existingDishes: allDishes,
      });
    })
    .catch((err) => {
      console.log(err, "find allUsers");
      // TODO: handle type error from mongoose and return 400
      // TODO: handle required error from mongoose and return 400
      // TODO: handle unique error from mongoose and return 409
      return res.status(400).json({
        error: err,
      });
    });
};

// get a dish data
exports.getDish = (req, res) => {
  Dish.findById(req.params.findById)
    .exec()
    .then((dish) => {
      return res.status(200).json({
        success: "Get a dish!",
        existingDishes: dish,
      });
    })
    .catch((err) => {
      console.log(err, "find dish");
      // TODO: handle type error from mongoose and return 400
      // TODO: handle required error from mongoose and return 400
      // TODO: handle unique error from mongoose and return 409
      return res.status(400).json({
        error: err,
      });
    });
};

// create a dish
exports.createDish = (req, res) => {
  const newDish = new Dish({
    name: req.body.name,
    price: req.body.price,
  });

  newDish
    .save()
    .then((saveDish) => {
      return res.status(200).json({
        success: "Dish save successfully!!!",
        data: saveDish,
      });
    })
    .catch((err) => {
      console.log(err, "createDish");
      // TODO: handle type error from mongoose and return 400
      // TODO: handle required error from mongoose and return 400
      // TODO: handle unique error from mongoose and return 409
      return res.status(400).json({
        error: err,
      });
    });
};

// update dish
exports.updateDish = (req, res) => {
  Dish.findByIdAndUpdate(req.params.id, {
    $set: req.body,
  })
    .then((dishUpdated) => {
      return res.status(200).json({
        success: "Dish updated successfully!!!",
        data: dishUpdated,
      });
    })
    .catch((err) => {
      console.log(err, "updateDish");
      // TODO: handle type error from mongoose and return 400
      // TODO: handle required error from mongoose and return 400
      // TODO: handle unique error from mongoose and return 409
      return res.status(400).json({
        error: err,
      });
    });
};

// delete dish
exports.deleteDish = (req, res) => {
  Dish.findByIdAndDelete(req.params.id)
    .exec()
    .then((dishDelete) => {
      return res.status(200).json({
        success: "Dish deleted!!!",
        data: dishDelete,
      });
    })
    .catch((err) => {
      console.log(err, "deleteDish");
      // TODO: handle required error from mongoose and return 400
      // TODO: handle unique error from mongoose and return 409
      return res.status(400).json({
        error: err,
      });
    });
};
