import express from "express";
import Reservation from "../models/Reservation.js";
const router = express.Router();

//CREATE
router.post("/", async(req, res, next) => {

    const newReservation = new Reservation(req.body);
    
    try {
      const savedReservation = await newReservation.save();
      res.status(200).json(savedReservation);
    } catch (err) {
      next(err);
  }
  })

  //GET all
router.get("/", async(req, res, next) => {
    try {
        const reservations = await Reservation.find();
        res.status(200).json(reservations);
      } catch (err) {
        next(err);
      }
})

export default router;