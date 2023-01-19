const connection = require('./connection');

const isExists = async (newUser) => {
    const pool = connection.getPool();
    const proposedUser = await pool.query('SELECT * FROM users WHERE email = $1 OR username = $2', [newUser.email, newUser.username]);
    if (proposedUser.rowCount === 1) {
        if (proposedUser.rows[0].username === newUser.username && proposedUser.rows[0].email === newUser.email) {
            return { status: true, reason: 'username and email' }
        } else if (proposedUser.rows[0].username === newUser.username) {
            return { status: true, reason: 'username' }
        } else {
            return { status: true, reason: 'email' }
        }
    }
    return { status: false, reason: null };
}


module.exports = { isExists };