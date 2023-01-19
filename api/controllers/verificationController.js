const getUser = require('../db/getUser');
const comparePasswords = require('../helpers/login/comparePasswords');
const singJwt = require('../helpers/jwtManagement/signJwt');
const dayjs = require('dayjs');



const verificate = async (req, res) => {
    return res.status(200).send({ 'msg': 'User was authenticated' });
}

module.exports = { verificate };