import Book from "../models/book.model.js";
import mongoose from "mongoose";
const getAllBooks = async (req, res) => {
  try {
    const allBooks = await Book.find();
    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: allBooks,
      count: allBooks.length,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getBookById = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: book,
    });
  } catch (error) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid book id",
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const createBook = async (req, res) => {
  try {
    const { title, author, year } = req.body;
    const newBook = await Book.create({ title, author, year });
    console.log("New book added : ", newBook);
    res.status(201).json({
      success: true,
      message: "Book Added successfuly",
      data: newBook,
    });
  } catch (error) {
    console.log("Error : ", error.message);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const updateBook = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid book id'
            });
        }

        const data = req.body;
        const newData = {};
        if (data.title) newData.title = data.title;
        if (data.author) newData.author = data.author;
        if (data.year) newData.year = data.year;

        if (Object.keys(newData).length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Please provide at least one field to update'
            });
        }

        const updatedBook = await Book.findByIdAndUpdate(
            id,
            { $set: newData },
            { new: true, runValidators: true }
        );

        if (!updatedBook) {
            return res.status(404).json({
                success: false,
                message: 'Book not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Book updated successfully',
            data: updatedBook
        });

    } catch (error) {
        console.error('updateBook error:', error.message);

        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

const deleteBook = async (req, res) => {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid book id",
      });
    }
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Books deleted successfully",
      data: deletedBook,
    });
  } catch (error) {
    
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export { getAllBooks, getBookById, createBook, updateBook, deleteBook };
