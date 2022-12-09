import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config()

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_KEY)

router.post("/payment", (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "egp",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});

export default router;
