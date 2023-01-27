const jwt = require('jsonwebtoken');

const isVerified = async (req, res, next) => {
    try {
        const jwtToken = req.cookies.jwt;
        const encodedJWT = await jwt.verify(jwtToken, process.env.AUTH_SECRET_KEY);
        next();
    } catch (error) {
        return res.status(200).send({ 'msg': 'User was not authenticated' })
    }
}

module.exports = { isVerified };