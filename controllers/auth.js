import User from '../models/User.js';

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
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const user = new User({
        email: req.body.email,
        password: hashedPassword
    });
    user.save()
        .then(() => res.status(201).json({ message: "User created successfully" }))
        .catch(error => res.status(400).json({ error }))
        .finally(() => console.log("User created successfully"));


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
        userId: foundUser._id
    });
};






export {
    login,
    signup
}
