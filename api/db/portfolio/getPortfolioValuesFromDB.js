const connection = require('../connection');


const getPortfolioValuesFromDB = async (userEmail, timeRange, userId = false) => {
    const pool = connection.getPool();

    if (userId) {
        if (timeRange === 'minute') {
            var portfolioValues = await pool.query("SELECT id, user_id, usd_value, date AT TIME ZONE 'UTC' as date FROM portfolio_values WHERE user_id = (SELECT id FROM users WHERE id = $1)", [userId]);
            return portfolioValues.rows;
        } else if (timeRange === 'hour') {
            var portfolioValues = await pool.query("SELECT id, user_id, usd_value, date AT TIME ZONE 'UTC' as date FROM portfolio_values_hours WHERE user_id = (SELECT id FROM users WHERE id = $1)", [userId]);
            return portfolioValues.rows;
        } else if (timeRange === 'day') {
            var portfolioValues = await pool.query("SELECT id, user_id, usd_value, date AT TIME ZONE 'UTC' as date FROM portfolio_values_days WHERE user_id = (SELECT id FROM users WHERE id = $1)", [userId]);
            return portfolioValues.rows;
        }
    } else {
        if (timeRange === 'minute') {
            var portfolioValues = await pool.query("SELECT id, user_id, usd_value, date AT TIME ZONE 'UTC' as date FROM portfolio_values WHERE user_id = (SELECT id FROM users WHERE email = $1)", [userEmail]);
            return portfolioValues.rows;
        } else if (timeRange === 'hour') {
            var portfolioValues = await pool.query("SELECT id, user_id, usd_value, date AT TIME ZONE 'UTC' as date FROM portfolio_values_hours WHERE user_id = (SELECT id FROM users WHERE email = $1)", [userEmail]);
            return portfolioValues.rows;
        } else if (timeRange === 'day') {
            var portfolioValues = await pool.query("SELECT id, user_id, usd_value, date AT TIME ZONE 'UTC' as date FROM portfolio_values_days WHERE user_id = (SELECT id FROM users WHERE email = $1)", [userEmail]);
            return portfolioValues.rows;
        }
    }

}


module.exports = { getPortfolioValuesFromDB };