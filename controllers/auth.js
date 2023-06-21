import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

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
    const foundUser = await User.findOne({ email: req.body.email.toLowerCase() });
    
    if (!foundUser) {
        return res.status(401).json({ error: 'User not found' });
    }
    const passwordIsValid = await bcrypt.compare(req.body.password, foundUser.password);
    if (!passwordIsValid) {
        return res.status(401).json({ error: 'Wrong password' });
    }
    res.status(200).json({
        userId: foundUser._id,
        token: genToken(foundUser.id, process.env.TOKEN_KEY)
    });

};

const genToken = (userId, key) => {
    return jwt.sign({ userId }, key, {
        algorithm: 'HS256',
        expiresIn: process.env.TOKEN_EXPIRATION
    });
};

const validateToken = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            console.log('No token provided, please connect')   //! Debug
            return res.status(401).json({ error: 'No token provided, please reconnect' });
        }

        const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
        const userId = decodedToken.userId;

        jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
            if (err) {
                console.log('Invalid token, please reconnect')   //! Debug
                return res.status(401).json({ error: 'Invalid token, please reconnect' });
            }
        });
        req.userId? delete req.userId : null
        req.userId = userId;

        next();
    } catch (error) {
        console.log(error)  //! Debug
        return res.status(401).json({ error: 'Invalid token, please reconnect' });
    }

}





export {
    login,
    signup,
    validateToken
}
