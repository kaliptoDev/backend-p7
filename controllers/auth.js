import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// const login = async (req, res) => {
//     console.log('Requête reçue pour login!');
//     console.log(req.headers['authorization']);
//     res.status(200).json({
//         message: 'Requête reçue pour login avec contenu: ' + req.headers['authorization']
//     });
// };

// const signup = async (req, res) => {
//     console.log("Requête reçue pour signup!");
//     res.status(200).json({
//         message: 'Requête reçue pour signup!'
//     });
// };

const signup = async (req, res) => {

    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ error: 'Both email and password fields must be filled' });
    }
    req.body.email = req.body.email.toLowerCase();

    const foundUser = await User.findOne({ email: req.body.email });
    if (foundUser) {
        console.log('Email already used by another user')   //! Debug
        return res.status(401).json({ error: 'Email already used by another user' });
    }

    console.log(req.body.email, req.body.password)    //! Debug

    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const user = new User({
        email: req.body.email,
        password: hashedPassword
    });
    user.save()
        .then(() => res.status(201).json({ message: "User created successfully" }))
        .catch(error => res.status(400).json({ error }))
        .finally(() => console.log("User created successfully"));   //! Debug


};

const login = async (req, res) => {
    const foundUser = await User.findOne({ email: req.body.email });
    if (!foundUser) {
        return res.status(401).json({ error: 'User not found' });
    }
    const passwordIsValid = await bcrypt.compare(req.body.password, foundUser.password);
    if (!passwordIsValid) {
        return res.status(401).json({ error: 'Wrong password' });
    }
    res.status(200).json({
        userId: foundUser._id,
        token: genToken(foundUser.email, process.env.TOKEN_KEY)
    });
    console.log(foundUser)  //! Debug
};

const genToken = (email, key) => {
    return jwt.sign({ email }, key, {
        algorithm: 'HS256',
        expiresIn: process.env.TOKEN_EXPIRATION
    });
};

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }
    jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid token' });
        }
    });
}



export {
    login,
    signup,
    verifyToken
}
