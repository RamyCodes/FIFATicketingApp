import express from "express";
import Stripe from "stripe";
// const KEY = process.env.STRIPE_KEY
// const stripe = require("stripe")(KEY);

const router = express.Router();
const stripe = new Stripe("sk_test_51Kz0mQCAdufLrSrfd8bWUZ182QyvN43Tbc7L7174338zml0seLUBZYeNfxHy1N2mSA8t9zmASjaNGcImaD1soeA200T7JLdj0e")

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
