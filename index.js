import express from "express";
import dotenv from "dotenv";
import { schoolRouter } from "./src/routes/schoolRouter.js";

dotenv.config();

const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", schoolRouter);

app.listen(process.env.PORT, (req, res) => {
  console.log(`Server is running on Port:${process.env.PORT}`);
});
