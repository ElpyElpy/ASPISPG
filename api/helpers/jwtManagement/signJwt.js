const jwt = require('jsonwebtoken');

const sign = async (username, email) => {
    const accessToken = jwt.sign({ name: username, mail: email, authorized: true }, process.env.AUTH_SECRET_KEY, { expiresIn: "1d" });
    return accessToken;
}


module.exports = { sign };
