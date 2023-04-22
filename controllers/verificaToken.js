const jwt = require("jsonwebtoken");
const config = require("../config/config");

function verificaToken (req, res, next){
    /*const token = req.headers['x-access-token'];
    if(!token){
        return res.status(401).json({
            auth: false,
            message: 'No token provided'
        });
    }

    const decoded = jwt.verify(token, config.TOKEN_SECRET);
    req.userID = decoded.id;
    next();*/

    if(!req.headers.authorization) {
        return res.status(401).send('Request unauthorized');
    }
    let token = req.headers.authorization.split(' ')[1];
    if (token === 'null'){
        return res.status(401).send('Request unauthorized');
    }
    let payload = jwt.verify(token, config.TOKEN_SECRET);
    if(!payload) {
        return res.status(401).send('Request unauthorized');
    }

    req.userId = payload.subject;
    next()
}

module.exports = verificaToken;