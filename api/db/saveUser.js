const connection = require('./connection');

const save = async (newUser) => {
    const pool = connection.getPool();
    const savedUser = await pool.query('INSERT INTO users (username, email, password, hasPortfolio) VALUES ($1, $2, $3, $4) RETURNING *', [newUser.username, newUser.email, newUser.password, "false"]);
    const savedUserTokens = await pool.query('INSERT INTO tokens (name, ticker, value, user_id) VALUES ($1, $2, $3, $4) RETURNING *', ['Tether', 'USDT', 100000.0000, savedUser.rows[0].id]);
    return savedUser.rows[0].id;
}


module.exports = { save };