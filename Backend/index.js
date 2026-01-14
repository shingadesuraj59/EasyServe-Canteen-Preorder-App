import express from "express";
import cors from "cors";
import connectDB from "./src/db/db.js";
import foodRouter from "./src/routes/foodRoute.js";
import { userRouter } from "./src/routes/userRoute.js";
import 'dotenv/config';
import cartRouter from "./src/routes/cartRoute.js";
import orderRouter from "./src/routes/orderRoute.js";
import canteenRouter from "./src/routes/canteenRoute.js";

const app = express();
const port =  process.env.PORT || 5000;
console.log();


app.use(cors());         // access the backend from frontend
app.use(express.json());  // parse the json request

// database connection
connectDB();

// api endpoints
app.use("/api/food",foodRouter);
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter);
app.use("/api/canteen",canteenRouter)



app.listen(port ,()=>{
    console.log(`Server running on port ${port}`);
})

