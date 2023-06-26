import fs from 'fs';
import sharp from 'sharp';
import path from 'path';

const deleteFile = (path) => {
    fs.unlink(`./${path}`, (err) => {
        if (err) {
            console.error(err);
            return;
        }
    });
};

const optimizeImage = async (req, res, next) => {
    try {
        await sharp(req.file.path)
            .resize(206, 260)
            .toFile(`./book_covers/${req.file.filename}`), (err, info) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log(info);
            };
        try {
            deleteFile(path.normalize(req.file.path))
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    } catch (error) {
        console.log(error)
        res.status(400)
    }
    next();
};


export { deleteFile, optimizeImage };
