const jwt = require('jsonwebtoken');

const decode = async (jwtToken) => {
    const decodedJwt = await jwt.verify(jwtToken, process.env.AUTH_SECRET_KEY);
    const email = decodedJwt.mail;
    return email;
}

module.exports = { decode };