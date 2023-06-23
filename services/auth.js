import User from '../models/User.js';

import bcrypt from 'bcrypt';
import { genToken } from '../middlewares/jwt.js';

const signup = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({ error: 'Both email and password fields must be filled' });
        }
        req.body.email = req.body.email.toLowerCase();
        const foundUser = await User.findOne({ email: req.body.email });
        if (foundUser) {
            console.log('Email already used by another user')   //! Debug
            return res.status(401).json({ error: 'Email already used by another user' });
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        const user = new User({
            email: req.body.email,
            password: hashedPassword
        });
        user.save()
            .then(() => res.status(201).json({ message: "User created successfully" }))
            .then(() => console.log("User created successfully"))  //! Debug
            .catch(error => res.status(400).json({ error }));
    } catch (error) {
        console.log(error)   //! Debug
        res.status(400).json({ error })
    }
};

const login = async (req, res) => {
    try {
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
    }
    catch (error) {
        console.log(error)   //! Debug
        res.status(400).json({ error })
    }
};

export {
    login,
    signup
}
