import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import cookieParser from "cookie-parser";
import usersRoute from "./routes/users.js";
import matchesRoute from "./routes/matches.js";
import paymentsRoute from "./routes/payments.js";
// import ticketsRoute from "./routes/tickets.js";
import stripeRoute from "./routes/stripe.js";
import reservationsRoute from "./routes/reservations.js";
import cors from "cors";
import rateLimit from 'express-rate-limit';
import { message } from "antd";



const app = express();
dotenv.config()

const connect = async () => {
    try {
      await mongoose.connect(process.env.MONGO);
      console.log("Connected to mongoDB.");
    } catch (error) {
      throw error;
    }
  };

const limiter = rateLimit({
  
	windowMs: 10000,
	max: 3, // Limit each IP to 5 requests per `window` (here, per )
	message: async (request, response) => {
     return response.send('Please be patient while we handle your request.')

	},
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers

  
})

// Apply the rate limiting middleware to all requests
app.use(limiter)






//middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/matches", matchesRoute);
app.use("/api/reservations", reservationsRoute);
// app.use("/api/tickets", ticketsRoute);
app.use("/api/checkout", stripeRoute);
app.use("/api/payments", paymentsRoute);


app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});


app.listen(5000, () => {
    connect()
    console.log("Connected to backend");
  });