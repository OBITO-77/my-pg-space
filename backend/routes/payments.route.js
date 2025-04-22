import express from "express";
import {
  checkout,
  paymentVerification,
} from "../controllers/payments.controller.js";

const router = express.Router();

router.route("/checkout").post(checkout);

router.route("/paymentverification").post(paymentVerification);

router.route("/getkey").get( (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
);

export default router;