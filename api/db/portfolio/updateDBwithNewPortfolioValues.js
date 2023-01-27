const connection = require('../connection');


const updateDBwithNewPortfolioValues = async (userEmail, dataPoints, timeRange, userId = false) => {
    const pool = connection.getPool();
    // update table portfolio_values with new data

    if (userId) {
        if (timeRange === 'minute') {
            for (let i = 0; i < dataPoints.length; i++) {
                await pool.query('INSERT INTO portfolio_values (user_id, date, usd_value) VALUES ((SELECT id FROM users WHERE id = $1), $2, $3)', [userId, dataPoints[i].x, dataPoints[i].y]);
            }
        } else if (timeRange === 'hour') {
            for (let i = 0; i < dataPoints.length; i++) {
                await pool.query('INSERT INTO portfolio_values_hours (user_id, date, usd_value) VALUES ((SELECT id FROM users WHERE id = $1), $2, $3)', [userId, dataPoints[i].x, dataPoints[i].y]);
            }
        } else if (timeRange === 'day') {
            for (let i = 0; i < dataPoints.length; i++) {
                await pool.query('INSERT INTO portfolio_values_days (user_id, date, usd_value) VALUES ((SELECT id FROM users WHERE id = $1), $2, $3)', [userId, dataPoints[i].x, dataPoints[i].y]);
            }
        }
    } else {
        if (timeRange === 'minute') {
            for (let i = 0; i < dataPoints.length; i++) {
                await pool.query('INSERT INTO portfolio_values (user_id, date, usd_value) VALUES ((SELECT id FROM users WHERE email = $1), $2, $3)', [userEmail, dataPoints[i].x, dataPoints[i].y]);
            }
        } else if (timeRange === 'hour') {
            for (let i = 0; i < dataPoints.length; i++) {
                await pool.query('INSERT INTO portfolio_values_hours (user_id, date, usd_value) VALUES ((SELECT id FROM users WHERE email = $1), $2, $3)', [userEmail, dataPoints[i].x, dataPoints[i].y]);
            }
        } else if (timeRange === 'day') {
            for (let i = 0; i < dataPoints.length; i++) {
                await pool.query('INSERT INTO portfolio_values_days (user_id, date, usd_value) VALUES ((SELECT id FROM users WHERE email = $1), $2, $3)', [userEmail, dataPoints[i].x, dataPoints[i].y]);
            }
        }
    }

}

module.exports = { updateDBwithNewPortfolioValues };