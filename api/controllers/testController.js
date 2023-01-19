const getUser = require('../db/getUser');
const comparePasswords = require('../helpers/login/comparePasswords');
const singJwt = require('../helpers/jwtManagement/signJwt');
const dayjs = require('dayjs');



const doSmth = async (req, res) => {
    const userName = req.body.username;
    console.log(userName);
    return res.status(200).send({ 'msg': userName });
}

module.exports = { doSmth };