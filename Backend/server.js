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
import session from "express-session";
import passport from "./config/passportConfig.js";
import https from "https";

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

// Session middleware for Passport
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    },
  }),
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("api is on :--)");
});

app.get("/health", (req, res) => {
  res.send("ok");
});

const keepAlive = () => {
  console.log(process.env.BACKEND_URL);

  https
    .get(process.env.BACKEND_URL + "/health", (res) => {
      console.log("Keep alive ping:", res.statusCode);
    })
    .on("error", (err) => {
      console.log("Ping error:", err.message);
    });
};

// Ping every 10 minutes
setInterval(keepAlive, 10 * 60 * 1000);
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
