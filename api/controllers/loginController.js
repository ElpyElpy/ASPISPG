const getUser = require('../db/getUser');
const comparePasswords = require('../helpers/login/comparePasswords');
const singJwt = require('../helpers/jwtManagement/signJwt');
const dayjs = require('dayjs');
const checkCredentials = require('../helpers/login/checkCredentials');



const login = async (req, res) => {
    const isValidCredentials = checkCredentials.check(req, true);
    if (!isValidCredentials) {
        return res.status(200).send({ 'msg': 'wrong credentials' });
    }
    const user = await getUser.getFromDB(req.body.email);
    if (!user) {
        return res.status(200).send({ 'msg': 'Wrong password or username' });
    }
    const pwdComparisonResult = comparePasswords.compare(req.body.password, user.rows[0].password);
    if (!pwdComparisonResult) {
        return res.status(200).send({ 'msg': 'Wrong password or username' });
    }
    const accessToken = await singJwt.sign(user.rows[0].username, user.rows[0].email);
    return res.status(200).cookie('jwt', accessToken, { secure: false, httpOnly: true, expires: dayjs().add(1, "days").toDate() }).send({ 'msg': user.rows[0].username });
}

module.exports = { login };