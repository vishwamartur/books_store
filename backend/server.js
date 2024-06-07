import express from "express";
import { PORT, DB_URI } from "./config.js";
import mongoose from "mongoose";
import cors from "cors";
import booksRouter from "./routes/booksRoute.js";

const app = express();

app.use(express.json());

app.use(cors());

app.use(
  cors({
    origin: "http://localhost:5555",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/books", booksRouter);

mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("APP Connected to database");
    app.listen(PORT, () => {
      console.log(`app Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
