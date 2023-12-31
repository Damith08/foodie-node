require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bearerToken = require("express-bearer-token");

// import routes
const authRoutes = require("./routes/auth.routes");
const commonRoutes = require("./routes/common.routes");
const restaurantRoutes = require("./routes/restaurant.routes");
const userRoutes = require("./routes/user.routes");
const orderRoutes = require("./routes/order.routes");
const dishRoutes = require("./routes/dish.routes");
const dishCategoryRoutes = require("./routes/dish-category.routes");

// connecting to the Database
mongoose
  .connect("mongodb://localhost:27017/foodie-node")
  .then(() => {
    console.log("Connected to the Database successfully!");
  })
  .catch(() => {
    console.log("Connection to the database failed");
  })
  .finally(() => {
    console.log("Database process completed");
  });

const app = express();
const port = 3000;

// to parse the JSON body to JavaScript objects
app.use(bodyParser.json());
app.use(cors()); // CORS for all routes
app.use(bearerToken());
app.use(express.json());
// routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/restaurants", restaurantRoutes);
app.use("/orders", orderRoutes);
app.use("/dishes", dishRoutes);
app.use("/dish-categories", dishCategoryRoutes);
app.use(commonRoutes);

app.listen(port, () => {
  console.log(`foodie-node API listening on port ${port}`);
});
