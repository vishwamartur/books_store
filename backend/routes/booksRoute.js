import express from "express";
import Book from "../models/bookModel.js";

const router = express.Router();
const app = express();

app.use(express.json());

// app.use("/books", booksRouter);

// Improved error handling for other endpoints
app.get("/", async (req, res) => {
  try {
    res.status(200).send("Hello World");
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Improved error handling for POST request
router.post("/", async (req, res) => {
  try {
    if (
      !req.body.title ||
      !req.body.author ||
      !req.body.description ||
      !req.body.published
    ) {
      return res.status(400).send({ message: "All fields are required" });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      published: req.body.published,
    };
    const book = await Book.create(newBook);
    return res.status(201).send(book);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// get all books data from database
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    if (!books) {
      return res.status(404).send({ message: "Books not found" });
    }
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// get one book data from database by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).send({ message: "Book not found" });
    }
    return res.status(200).json(book);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// update book data from database by id
router.put("/:id", async (req, res) => {
  try {
    if (
      !req.body.title &&
      !req.body.author &&
      !req.body.description &&
      !req.body.published
    ) {
      return res.status(400).send({ message: "All fields are required" });
    }
    const { id } = req.params;
    const book = await Book.findByIdAndUpdate(id, req.body, { new: true });
    if (!book) {
      return res.status(404).send({ message: "Book not found" });
    }
    return res.status(200).json(book);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//route for deleting a book
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return res.status(404).send({ message: "Book not found" });
    }
    return res.status(200).json(book);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export default router;
