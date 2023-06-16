const login = async (req, res) => {
    console.log('Requête reçue pour login!');
    console.log(req.headers['authorization']);
    res.status(200).json({
        message: 'Requête reçue pour login avec contenu: ' + req.headers['authorization']
    });
};

const signup = async (req, res) => {
    console.log("Requête reçue pour signup!");
    res.status(200).json({
        message: 'Requête reçue pour signup!'
    });
};

const test = (req, res) => {
    console.log('Requête reçue !');
    console.log(req.headers['authorization']);
    res.status(418).json({
        message: 'Requête reçue avec contenu: ' + req.headers['authorization']
    });
};

export {
    login,
    signup,
    test
}

// export default {
//     login,
//     signup,
//     test
// }