import { Router } from 'express';
import {
    getBooks,
    getBookByID,
    getBestBooks,
    createBook,
    updateBook,
    deleteBook,
    rateBook
} from '../services/books.js';

import { validateToken } from '../middlewares/jwt.js';

import multer from '../middlewares/multer-config.js';

import { optimizeImage } from '../utils/utils.js';

const router = Router();

router.get('/', getBooks)

router.get('/bestrating', getBestBooks)

router.get('/:id', getBookByID)

router.post('/', validateToken, multer, optimizeImage, createBook)

router.put('/:id', validateToken, multer, optimizeImage, updateBook)

router.delete('/:id', validateToken, deleteBook)

router.post('/:id/rating', validateToken, rateBook)

export default router;