import mongoose from "mongoose";
const TicketsSchema = new mongoose.Schema(
  {
    ticketID: {
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
  },
  { timestamps: true }
);

export default mongoose.model("Ticket", TicketsSchema);