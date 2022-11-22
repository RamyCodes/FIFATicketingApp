import mongoose from "mongoose";
const MatchSchema = new mongoose.Schema({
  matchNumber: {
    type: Number,
    required: true,
  },
  dateUtc: {
    type: Date,
    required: true,
  },
  roundNumber: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  homeTeam: {
    type: String,
    required: true,
  },
  awayTeam: {
    type: String,
    required: true,
  },
  photos: {
    type: [String],
  },
  desc: {
    type: String,
    required: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("Match", MatchSchema)