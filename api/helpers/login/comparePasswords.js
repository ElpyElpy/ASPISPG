const CryptoJS = require('crypto-js');

const compare = (pwdFromUser, pwdFromDBEncrypted) => {
    const pwdFromDB = CryptoJS.AES.decrypt(pwdFromDBEncrypted, process.env.AUTH_SECRET_KEY).toString(CryptoJS.enc.Utf8);
    return pwdFromUser !== pwdFromDB ? false : true;
}

module.exports = { compare };