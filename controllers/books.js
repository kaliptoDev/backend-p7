import Book from "../models/Book.js";
import { validateToken } from "./auth.js";



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

const createBook =  (req, res) => {
try {
    const book = JSON.parse(req.body.book);

    book._id? delete book._id : null;
    book._userId? delete book._userId : null;

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

// const createBook = (req, res) => {
//     console.log(req)   //! Debug
//     console.log(req.body.book.title)   //! Debug
//     const book = req.body.book;
//     const parsedBook = JSON.parse(book);
//     console.log(parsedBook.userId)   //! Debug
// };

const updateBook = (req, res) => { };

const deleteBook = (req, res) => { };

const rateBook = (req, res) => { };

export { getBooks, getBookByID, getBestBooks, createBook, updateBook, deleteBook, rateBook };