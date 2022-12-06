import express from "express"
import Payment from "../models/Payment.js";
const router = express.Router();

//CREATE
router.post("/",async(req, res, next) => {

    const newPayment = new Payment(req.body);
    
    try {
      const savedPayment = await newPayment.save();
      // saves the object newpayment in the database
      res.status(200).json(savedMatch);
    } 
    catch (err) {
      next(err);
  }
  })
  