import Book from "../models/Book.js";
import { isTokenValidated } from "./auth.js";



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

    const rawBook = req.body.book;
    const parsedBook = JSON.parse(rawBook);

    const book = new Book({
        userId: parsedBook.userId,
        title: parsedBook.title,
        author: parsedBook.author,
        // imageUrl: req.body.book.imageUrl,
        imageUrl: "https://www.randonnee-urbain-v.com/es/wp-content/uploads/sites/6/2015/04/livres.jpg",
        year: parsedBook.year,
        genre: parsedBook.genre,
        ratings: [],
        averageRating: 0
    });

    book.save()
        .then(() => res.status(201).json({ message: "Book created successfully" }))
        .catch(error => res.status(400).json({ error }))
        .catch(error => console.log(error)) //! Debug
        .finally(() => console.log("Book created successfully"));  //! Debug

    console.log(book) //! Debug

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