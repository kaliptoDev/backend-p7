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

import { validateToken } from '../utils/utils.js';

import multer from '../middlewares/multer-config.js';

const router = Router();

router.get('/', getBooks)

router.get('/bestrating', getBestBooks)

router.get('/:id', getBookByID)

router.post('/', validateToken, multer, createBook)

router.put('/:id', validateToken, multer, updateBook)

router.delete('/:id', validateToken, deleteBook)

router.post('/:id/rating', validateToken, rateBook)

export default router;