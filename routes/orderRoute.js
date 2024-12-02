import express from "express";
import { placeOrderStripe, userOrders, updateStatus, verifyStripe, allOrder } from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser  from "../middleware/authUser.js";

const orderRouter = express.Router();

//Admin Features
orderRouter.post("/list", adminAuth, allOrder);
orderRouter.post("/status", adminAuth, updateStatus);

//Payment Features
orderRouter.post("/stripe", authUser, placeOrderStripe);

//User Features
orderRouter.post("/userorders", authUser, userOrders);

//Verify payment
orderRouter.post("/verifyStripe", authUser, verifyStripe);

export default orderRouter;