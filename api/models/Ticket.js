import mongoose from "mongoose";
const TicketsSchema = new mongoose.Schema(
  {
    ticketID: {
      type: String,
      required: true,
    },
    availability: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    matchNumber: {
      type: Number,
      required: true,
    },
    dateUtc: {
      type: Date,
      required: true,
    },
    gate: {
      type: String,
      required: true,
    },
    block: {
      type: Number,
      required: true,
    },
    row: {
      type: String,
      required: true,
    },
    seat: {
      type: Number,
      required: true,
      },
  },
  { timestamps: true }
);

export default mongoose.model("Ticket", TicketsSchema);