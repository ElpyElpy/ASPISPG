const CryptoJS = require('crypto-js');

const createUserFromRequest = (req) => {
    return {
        "username": req.body.username,
        "email": req.body.email,
        "password": CryptoJS.AES.encrypt(req.body.password, process.env.AUTH_SECRET_KEY).toString()
    }
}

module.exports = { createUserFromRequest };