import Book from "../models/Book.js";
import { deleteFile } from "../utils/utils.js";


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
            .then(() => console.log("Book created successfully"))   //! Debug
            .catch(error => res.status(400).json({ error }))
    } catch (error) {
        console.log(error)   //! Debug
        res.status(400).json({ error })
    }
};

const updateBook = async (req, res) => {

    try {
        const book = JSON.parse(req.body.book);
        const oldBook = await Book.findById(req.params.id);
        if (req.userId == oldBook.userId) {
            try {
                const oldBook = await Book.findById(req.params.id);
                const oldUrl = oldBook.imageUrl;
                Book.updateOne({ _id: req.params.id }, {
                    ...book,
                    imageUrl: `${req.protocol}://${req.get('host')}/book_covers/${req.file ? req.file.filename : oldUrl.split('/book_covers/')[1]}`
                })
                    .then(() => res.status(200).json({ message: "Book updated successfully" }))
                    .catch(error => res.status(400).json({ error }))
                deleteFile(oldUrl.split(`${req.protocol}://${req.get('host')}`)[1]);
            } catch (error) {
                res.status(400).json({ error })
            };
        } else {
            res.status(403).json({ error: "You are not allowed to do this" })
        }
    }
    catch (error) {
        res.status(400).json({ error })
    }
};

const deleteBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (req.userId == book.userId) {
            Book.findById(req.params.id)
                .then(book => {
                    const filename = book.imageUrl.split('/book_covers/')[1];
                    deleteFile(`book_covers/${filename}`);
                })
                .catch(error => res.status(500).json({ error }));
            Book.deleteOne({ _id: req.params.id })
                .then(() => res.status(200).json({ message: "Book deleted successfully" }))
                .catch(error => res.status(400).json({ error }))
        } else {
            res.status(403).json({ error: "You are not allowed to do this" })
        }
    }
    catch (error) {
        res.status(400).json({ error })
    }
};

const rateBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        Book.updateOne({ _id: req.params.id }, {
            ratings: [...book.ratings, { userId: req.userId, grade: req.body.rating }]
        })
            .then(() => console.log("Book rated successfully"))
            .catch(error => res.status(400).json({ error }))
        let sum = req.body.rating;
        book.ratings?.length > 0 ? book.ratings.map(rating => sum = sum + rating.grade) : book.averageRating = sum;
        book.averageRating = sum / (book.ratings?.length + 1);
        book.save()
        res.status(200).json(book)
    }
    catch (error) {
        res.status(400).json({ error })
    }
};

export { getBooks, getBookByID, getBestBooks, createBook, updateBook, deleteBook, rateBook };