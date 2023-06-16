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

export {
    login,
    signup
}
