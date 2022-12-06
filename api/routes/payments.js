import express from "express"
import Payment from "../models/Payment.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

router.put("/:id", async(req, res, next) => {
    try {
     const updatePayment = await Payment.findByIdAndUpdate(
     req.params.id,
     { $set: req.body },
     { new: true }
     );
     res.status(200).json(updatePayment);
    } catch (err) {
       next(err);
    }
})







export default router;
