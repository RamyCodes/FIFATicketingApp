import mongoose from "mongoose";
const ReservationsSchema = new mongoose.Schema(
  {
    ticketID: {
      type: String,
      required: true,
    },
    DatePurchased: {
        type: String,
        required: true,
      },
    userEmail: {
        type: String,
        required: true,
      },
  },
  { timestamps: true }
);

export default mongoose.model("Reservation", ReservationsSchema);