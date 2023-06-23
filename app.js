import express, { json } from 'express';
import { connect } from 'mongoose';
import User from './models/User.js';
import Book from './models/Book.js';
import { config } from 'dotenv';
import auth_endpoints from './controllers/auth.js';
import books_endpoints from './controllers/books.js';
import path from 'path';
import { fileURLToPath } from 'url';
import routes from './routes/routes.js';



// variable d'environnement
config();

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const app = express();



//* connect to DB
connect(`mongodb+srv://${process.env.DBUSER}:${process.env.DBPASSWORD}@grimoire.inlthxy.mongodb.net/mon-vieux-grimoire?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !')) //! Debug
    .catch(() => console.log('Connexion à MongoDB échouée !')); //! Debug

//* handle json
app.use(json());

//* cors headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(`/api/${routes.AUTH}`, auth_endpoints);
app.use(`/api/${routes.BOOKS}`, books_endpoints);
app.use('/book_covers', express.static(path.join(__dirname, 'book_covers')));

export default app;