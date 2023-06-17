import { Router } from 'express';
import {
    getBooks,
    getBookByID,
    getBestBooks,
    createBook,
    updateBook,
    deleteBook,
    rateBook
} from '../controllers/books.js';

const router = Router();

router.get('/', getBooks)

router.get('/:id', getBookByID)

router.get('/bestrating', getBestBooks)

router.post('/', createBook)

router.put('/:id', updateBook)

router.delete('/:id', deleteBook)

router.post('/:id/rating', rateBook)

export default router;