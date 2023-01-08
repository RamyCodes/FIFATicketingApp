import express from "express"
import Payment from "../models/Payment.js";
import { verifyAdmin } from "../utils/verifyToken.js";
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

router.put("/:id", async(req, res, next) => {
    try {
     const updatePayment = await Payment.findByIdAndUpdate(req.params.id,
     { $set: req.body },
     { new: true }
     );
     res.status(200).json(updatePayment);
    } catch (err) {
       next(err);
    }
})

router.get("/:id", async(req, res, next) => {
    try {
        const payment = await Payment.findById(req.params.id);
        res.status(200).json(match);
      } 
      catch (err) {
        next(err);
      }
})

router.get("/", async(req, res, next) => {
    try {
        const payment = await Payment.findById(req.params.id);
        res.status(200).json(match);
      } 
      catch (err) {
        next(err);
      }
})






export default router;
