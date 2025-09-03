import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("api is on... ");
});

const Port = process.env.PORT || 5000;
app.listen(Port, () => {
  console.log("seerver is running in port ", Port);
});
