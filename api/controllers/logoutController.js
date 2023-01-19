const getUser = require('../db/getUser');
const comparePasswords = require('../helpers/login/comparePasswords');
const singJwt = require('../helpers/jwtManagement/signJwt');
const dayjs = require('dayjs');


const logout = async (req, res) => {
    res.clearCookie('jwt');
    res.status(200).send({ 'msg': 'user logged out' });
}

module.exports = { logout };