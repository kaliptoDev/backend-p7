import multer from 'multer';

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'book_covers');
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, `${name}`);
    }
});

export default multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, //? to be changed if needed
    }
}).single('image');