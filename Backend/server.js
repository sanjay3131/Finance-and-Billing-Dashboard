import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./database/connectDB.js";
import authRoute from "./routes/authRoute.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("api is on :--)");
});
app.use("/api/auth", authRoute);

const Port = process.env.PORT || 5000;
app.listen(Port, () => {
  connectDb();
  console.log("server is running on port ", Port);
});
