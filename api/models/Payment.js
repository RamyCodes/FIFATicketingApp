import mongoose from "mongoose";
const PaymentSchema = new mongoose.Schema(
  {
    paymentId: {
        type: String,
        required: true,
      },
    paymentAmount: {
        type: Number,
        required: true,
      },
    paymentStatus: {
        type: String,
        required: true,
      },
    customerName: {
        type: String,
        required: true,
      },
    paymentDate: {
        type: Date,
        required: true,
      },  
  },
  { timestamps: true }
);

export default mongoose.model("Payment", PaymentSchema);