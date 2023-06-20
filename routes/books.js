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

import { validateToken } from '../controllers/auth.js';
import multer from '../middlewares/multer-config.js';

const router = Router();

router.get('/', getBooks)

router.get('/:id', getBookByID)

router.get('/bestrating', getBestBooks)

router.post('/', validateToken, multer, createBook)

router.put('/:id', validateToken, updateBook)

router.delete('/:id', validateToken, deleteBook)

router.post('/:id/rating', validateToken, rateBook)

export default router;