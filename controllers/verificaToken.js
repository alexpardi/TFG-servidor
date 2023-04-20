const jwt = require("jsonwebtoken");
const config = require("../config/config");

function verificaToken (req, res, next){
    const token = req.headers['x-access-token'];
    if(!token){
        return res.status(401).json({
            auth: false,
            message: 'No token provided'
        });
    }

    const decoded = jwt.verify(token, config.TOKEN_SECRET);
    req.userID = decoded.id;
    next();
}

module.exports = verificaToken;