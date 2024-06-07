// models/bookModel.js
import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    published: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Define Book model
const Book = mongoose.model("Book", bookSchema);

export default Book;
