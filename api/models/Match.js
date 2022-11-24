import mongoose from "mongoose";
const MatchSchema = new mongoose.Schema({
  MatchNumber: {
    type: Number,
    required: true,
  },
  RoundNumber: {
    type: Number,
    required: true,
  },
  DateUtc: {
    type: Date,
    required: true,
  },
  Location: {
    type: String,
    required: true,
  },
  StadiumCapacity: {
    type: Number,
    required: true,
  },
  HomeTeam: {
    type: String,
    required: true,
  },
  AwayTeam: {
    type: String,
    required: true,
  },
  Group: {
    type: String,
    required: true,
  },
  HomeTeamScore: {
    type: Number,
    required: true,
  },
  AwayTeamScore: {
    type: Number,
    required: true,
  },
  Featured: {
    type: Boolean,
    default: false, //will be used for data analytics
  },
});

export default mongoose.model("Match", MatchSchema)