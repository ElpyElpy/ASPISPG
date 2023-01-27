const createUser = require('../helpers/login/createUser');
const checkUser = require('../db/checkUser');
const saveUser = require('../db/saveUser');
const singJwt = require('../helpers/jwtManagement/signJwt');
const checkCredentials = require('../helpers/login/checkCredentials');
const dayjs = require('dayjs');


const register = async (req, res) => {
    const isValidCredentials = checkCredentials.check(req, false);
    if (!isValidCredentials) {
        return res.status(200).send({ 'msg': 'wrong credentials' });
    }
    const newUser = createUser.createUserFromRequest(req);
    const isUserExists = await checkUser.isExists(newUser);
    if (isUserExists.status) {
        if (isUserExists.reason === 'email') {
            return res.status(200).send({ 'msg': 'E-mail already exists' });
        } else if (isUserExists.reason === 'username') {
            return res.status(200).send({ 'msg': 'Username already exists' });
        } else if (isUserExists.reason === 'username and email') {
            return res.status(200).send({ 'msg': 'username and email already exist' });
        }
    }
    const savedUserId = await saveUser.save(newUser);
    const accessToken = await singJwt.sign(newUser.username, newUser.email);
    return res.status(200).cookie('jwt', accessToken, { secure: false, httpOnly: true, expires: dayjs().add(1, "days").toDate() }).cookie('hasPortfolio', false, { secure: false, httpOnly: false, expires: dayjs().add(1, "days").toDate() }).send({ 'msg': newUser.username });
}

module.exports = { register };