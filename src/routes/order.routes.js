const express = require("express");
const orderRouter = express.Router();
const orderController = require("../controllers/order.controller");
const authMiddleware = require("../middleware/auth.middleware");

// get all orders
orderRouter.get("/", orderController.getAllOrders);

// get a single order
orderRouter.get("/:id", orderController.getOrder);

// create a new order
orderRouter.post(
  "/",
  authMiddleware.validateToken,
  orderController.createOrder,
);

//update a order partially
orderRouter.patch("/:id", orderController.updateOrderPartially);

// update a order completely
orderRouter.put("/:id", orderController.updateOrder);

// delete a order
orderRouter.delete("/:id", orderController.deleteOrder);

module.exports = orderRouter;
