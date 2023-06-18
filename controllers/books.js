import Book from "../models/Book.js";
import { verifyToken } from "./auth.js";

const getBooks = async (req, res) => {
    const books = await Book.find();
    books == null ? res.status(404).json({ message: "No books found" }) : res.status(200).json(books);
    console.log(books)      //! Debug
};

const getBookByID = async (req, res) => {
    const book = await Book.findById(req.body.id);
    book == null ? res.status(404).json({ message: "No book found" }) : res.status(200).json(book);
    console.log(book)   //! Debug
};

const getBestBooks = (req, res) => {

};

const createBook = (req, res) => {

    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        imageUrl: req.body.imageUrl,
        year: req.body.year,
        genre: req.body.genre,
        ratings: [],
        averageRating: 0
    });

    book.save()
        .then(() => res.status(201).json({ message: "Book created successfully" }))
        .catch(error => res.status(400).json({ error }))
        .finally(() => console.log("Book created successfully"));  //! Debug

    console.log(book) //! Debug

};

const updateBook = (req, res) => { };

const deleteBook = (req, res) => { };

const rateBook = (req, res) => { };

export { getBooks, getBookByID, getBestBooks, createBook, updateBook, deleteBook, rateBook };