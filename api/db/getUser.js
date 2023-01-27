const connection = require('./connection');

const getFromDB = async (email) => {
    const pool = connection.getPool();
    const loggedUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (loggedUser.rowCount === 1) {
        return loggedUser;
    }
    return false;
}


module.exports = { getFromDB };