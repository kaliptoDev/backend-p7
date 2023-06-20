import express, { json } from 'express';
import { connect } from 'mongoose';
import User from './models/User.js';
import Book from './models/Book.js';
import { config } from 'dotenv';
// const auth_routes = require('./routes/auth.js');
import auth_routes from './routes/auth.js';
import books_routes from './routes/books.js';
import path from 'path';
import { fileURLToPath } from 'url';




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

//* cors (maybe check for cors() )
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/api/auth', auth_routes);
app.use('/api/books', books_routes);
app.use('/book_covers', express.static(path.join(__dirname, 'book_covers')));

// routing
// app.use(router);




// CONTROLLER
// endpoints
// router.use('/api/auth', require('./routes/auth.js'))
// app.use('/api/books', require('./api/books.js'))

export default app;