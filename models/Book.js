import { mongoose } from 'mongoose';

const bookSchema = mongoose.Schema({

    userId: { type: String, required: true },
    title: { type: String, required: true },
    author: { type: String, required: false },
    imageUrl: { type: String, required: false },
    year: { type: Number, required: false },
    genre: { type: String, required: false },
    ratings: [
        {
            userId: { type: String, required: true },
            grade: { type: Number, required: true }
        }
    ],
    averageRating: { type: Number, required: false }
});

export default mongoose.model('Book', bookSchema);