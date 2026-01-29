import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./database/connectDB.js";
import authRoute from "./routes/authRoute.js";
import productRoute from "./routes/productRoute.js";
import expenseRoute from "./routes/expenseRoute.js";
import billingRoute from "./routes/billingRoute.js";
import salesReportRoute from "./routes/salesReportRoute.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("api is on :--)");
});
app.use("/api/auth", authRoute);
app.use("/api/product", productRoute);
app.use("/api/expense", expenseRoute);
app.use("/api/billing", billingRoute);
app.use("/api/report", salesReportRoute);

const Port = process.env.PORT || 5000;
app.listen(Port, () => {
  connectDb();
  console.log("server is running on port ", Port);
});
