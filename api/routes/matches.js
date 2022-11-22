import express from "express"
import Match from "../models/Match.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

//CREATE
router.post("/", verifyAdmin,async(req, res, next) => {

  const newMatch = new Match(req.body);
  
  try {
    const savedMatch = await newMatch.save();
    res.status(200).json(savedMatch);
  } catch (err) {
    next(err);
}
})

//UPDATE
router.put("/:id", verifyAdmin, async(req, res, next) => {
     try {
      const updatedMatch = await Match.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
      );
      res.status(200).json(updatedMatch);
     } catch (err) {
        next(err);
     }
})

//DELETE
router.delete("/:id", async(req, res, next) => {
    try {
        await Match.findByIdAndDelete(req.params.id);
        res.status(200).json("Match has been deleted.");
    } catch (err) {
        next(err);
    }
})

//GET by id
router.get("/:id", async(req, res, next) => {
    try {
        const match = await Match.findById(req.params.id);
        res.status(200).json(match);
      } catch (err) {
        next(err);
      }
})

//GET all
router.get("/", async(req, res, next) => {
    try {
        const matches = await Match.find();
        res.status(200).json(matches);
      } catch (err) {
        next(err);
      }
})
export default router;