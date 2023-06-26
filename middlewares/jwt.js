import jwt from 'jsonwebtoken';

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
            return res.status(401);
        }

        const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
        const userId = decodedToken.userId;

        jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
            if (err) {
                console.log('Invalid token, please reconnect')   //! Debug
                return res.status(401);
            }
        });
        req.userId? delete req.userId : null
        req.userId = userId;

        next();
    } catch (error) {
        console.log(error)  //! Debug
        return res.status(401);
    }

}

export { genToken, validateToken };