import mongoose from "mongoose";
const ReservationsSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    matchNumber: {
        type: Number,
        required: true,
      },
    tickets: {
      category: {type: Number},
      quantity: {type: Number},
      price: {type: Number}
    },
    card: {
      number: {type: Number},
      expirationMonth: {type: Number},
      expirationYear: {type: Number},
      cvc: {type: Number}
    },
  },
  { timestamps: true }
);

/*
{
  "email": "desoukya@gmail.com",
  "matchNumber": 1,
  "tickets": {
    "category": 1,
    "quantity": 2,
    "price": 75
  },
  "card": {
    "number": "4242424242424242",
    "expirationMonth": 12,
    "expirationYear": 2024,
    "cvc": "123"   
  }
}
*/

export default mongoose.model("Reservation", ReservationsSchema);