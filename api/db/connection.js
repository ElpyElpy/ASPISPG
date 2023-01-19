const Pool = require('pg').Pool
const dotenv = require('dotenv');



const getPool = () => {
    try {
        const pool = new Pool({
            user: process.env.DB_USERNAME,
            host: process.env.DB_HOST,
            database: process.env.DB_DATABASE,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT,
        })
        return pool
    } catch (err) {
        console.log(err);
    }
}


module.exports = { getPool };