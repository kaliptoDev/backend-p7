import Book from "../models/Book.js";
import { validateToken } from "./auth.js";



const getBooks = async (req, res) => {
    const books = await Book.find();
    books == null ? res.status(404).json({ message: "No books found" }) : res.status(200).json(books);
};

const getBookByID = async (req, res) => {
    const book = await Book.findById(req.params.id);
    book == null ? res.status(404).json({ message: "No book found" }) : res.status(200).json(book);
};

const getBestBooks = async (req, res) => { 
    const books = await Book.find().sort({ averageRating: -1 }).limit(3);
    books == null ? res.status(404).json({ message: "No books found" }) : res.status(200).json(books);
};

const createBook = (req, res) => {
    try {
        const book = JSON.parse(req.body.book);

        book.userId ? delete book.userId : null;

        book.userId = req.userId;

        const newBook = new Book({
            ...book,
            imageUrl: `${req.protocol}://${req.get('host')}/book_covers/${req.file.filename}`,
            ratings: [],
            averageRating: 0
        });

        newBook.save()
            .then(() => res.status(201).json({ message: "Book created successfully" }))
            .catch(error => res.status(400).json({ error }))
            .finally(() => console.log("Book created successfully"));  //! Debug
    } catch (error) {
        console.log(error)   //! Debug
        res.status(400).json({ error })
    }
};

const updateBook = (req, res) => { };

const deleteBook = (req, res) => {

};

const rateBook = (req, res) => { };

export { getBooks, getBookByID, getBestBooks, createBook, updateBook, deleteBook, rateBook };