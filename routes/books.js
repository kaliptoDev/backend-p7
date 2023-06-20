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
import Multer from 'multer';

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, //? to be changed if needed
    },
});

const router = Router();

router.get('/', getBooks)

router.get('/:id', getBookByID)

router.get('/bestrating', getBestBooks)

router.post('/', multer.any(),createBook)

router.put('/:id', updateBook)

router.delete('/:id', deleteBook)

router.post('/:id/rating', rateBook)

export default router;