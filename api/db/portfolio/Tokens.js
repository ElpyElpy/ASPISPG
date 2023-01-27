const connection = require('../connection');
const cryptoCompare = require('../../helpers/cryptoCompare/cryptoCompare');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc')

const add = async () => {

    const newToken = {
        name: 'Ethereum',
        ticker: 'ETH',
        value: 12.5,
        userId: 73
    }

    const pool = connection.getPool();
    const addedToken = await pool.query('INSERT INTO tokens (name, ticker, value, user_id) VALUES ($1, $2, $3, $4) RETURNING *', [newToken.name, newToken.ticker, newToken.value, newToken.userId]);
    return addedToken.rows[0].id;
}

const getPortfolioMainData = async (email = false, id = false) => {
    const pool = connection.getPool();
    if (email) {
        var portfolio = await pool.query('SELECT portfolio_name, portfolio_description, portfolio_icon, user_id FROM portfolios JOIN users ON portfolios.user_id = users.id WHERE users.email = $1', [email]);
    } else {
        var portfolio = await pool.query('SELECT portfolio_name, portfolio_description, portfolio_icon, user_id FROM portfolios JOIN users ON portfolios.user_id = users.id WHERE users.id = $1', [id]);
    }
    return portfolio.rows[0];
}

const getWithoutQuotation = async (email = false, id = false) => {
    const pool = connection.getPool();
    if (email) {
        var tokens = await pool.query('SELECT name, ticker, value, svg_paths.svg_path FROM tokens JOIN users ON tokens.user_id = users.id JOIN svg_paths ON tokens.name = svg_paths.token_name WHERE users.email = $1', [email]);
    } else {
        var tokens = await pool.query('SELECT name, ticker, value, svg_paths.svg_path FROM tokens JOIN users ON tokens.user_id = users.id JOIN svg_paths ON tokens.name = svg_paths.token_name WHERE users.id = $1', [id]);
    }
    return tokens.rows;

}

const get = async (email = false, id = false) => {
    const pool = connection.getPool();
    if (email) {
        var tokens = await pool.query('SELECT name, ticker, value, svg_paths.svg_path FROM tokens JOIN users ON tokens.user_id = users.id JOIN svg_paths ON tokens.name = svg_paths.token_name WHERE users.email = $1', [email]);
    } else {
        var tokens = await pool.query('SELECT name, ticker, value, svg_paths.svg_path FROM tokens JOIN users ON tokens.user_id = users.id JOIN svg_paths ON tokens.name = svg_paths.token_name WHERE users.id = $1', [id]);
    }
    const arrayOfTickers = tokens.rows.map(function (item) {
        return item.ticker;
    });
    const tokenPrices = await cryptoCompare.fetchTokenPrice(arrayOfTickers, "USD");
    for (let i = 0; i < tokens.rows.length; i++) {
        tokens.rows[i].usdValue = Number(tokens.rows[i].value) * tokenPrices[tokens.rows[i].ticker].USD
    }
    return tokens.rows;
}

const getAllPortfolios = async () => {
    const pool = connection.getPool();
    // ge basic portfolio data (name, desc, etc)
    const portfolios = await pool.query('SELECT portfolio_name, portfolio_description, portfolio_icon, user_id, users.username FROM portfolios JOIN users ON portfolios.user_id = users.id');
    // get all tokens for all users
    const tokens = await pool.query('SELECT ticker, value, user_id FROM tokens');
    // get unique list of tokens
    const uniqueTokens = [...new Set(tokens.rows.map(item => item.ticker))];
    // get prices for all unique tokens
    const tokenPrices = await cryptoCompare.fetchTokenPrice(uniqueTokens, "USD");
    // join tokenPrices with tokens
    for (let i = 0; i < tokens.rows.length; i++) {
        tokens.rows[i].usdValue = Number(tokens.rows[i].value) * tokenPrices[tokens.rows[i].ticker].USD
    }
    return { portfolioMainData: portfolios.rows, tokens: tokens.rows };
}

const getUser = async (email) => {
    const pool = connection.getPool();
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return user.rows[0];
}

const addPortfolio = async (email, name, description, key) => {
    const pool = connection.getPool();
    // check if portfolio already exists
    const portfolioExists = await pool.query('SELECT * FROM portfolios WHERE portfolio_name = $1', [name]);
    if (portfolioExists.rowCount > 0) {
        return 'portfolio name already exists';
    }
    const createdPortfolio = await pool.query('INSERT INTO portfolios (portfolio_name, portfolio_description, portfolio_icon, user_id) VALUES ($1, $2, $3, (SELECT id FROM users WHERE email = $4)) RETURNING *', [name, description, key, email]);
    await pool.query('UPDATE users SET hasportfolio = $1 WHERE email = $2', ['true', email]);

    // add initial portfolio value to the table
    const tokens = await pool.query('SELECT ticker, value FROM tokens WHERE user_id = (SELECT id FROM users WHERE email = $1)', [email]);
    const arrayOfTickers = tokens.rows.map(function (item) {
        return item.ticker;
    })
    const tokenPrices = await cryptoCompare.fetchTokenPrice(arrayOfTickers, "USD");
    let portfolioUsdValue = 0;
    for (let i = 0; i < tokens.rows.length; i++) {
        portfolioUsdValue += Number(tokens.rows[i].value) * tokenPrices[tokens.rows[i].ticker].USD
    }
    await pool.query('INSERT INTO portfolio_values (usd_value, date, user_id) VALUES ($1, $2, (SELECT id FROM users WHERE email = $3))', [portfolioUsdValue, new Date().toUTCString(), email]);
    await pool.query('INSERT INTO portfolio_values_hours (usd_value, date, user_id) VALUES ($1, $2, (SELECT id FROM users WHERE email = $3))', [portfolioUsdValue, new Date().toUTCString(), email]);
    await pool.query('INSERT INTO portfolio_values_days (usd_value, date, user_id) VALUES ($1, $2, (SELECT id FROM users WHERE email = $3))', [portfolioUsdValue, new Date().toUTCString(), email]);

    return createdPortfolio.rows[0].id;
}

const getTransactions = async (email = false, id = false) => {
    const pool = connection.getPool();
    if (email) {
        var transactions = await pool.query('SELECT transactions.id, transactions.date, transactions.send_token_amount, transactions.buy_token_amount, transactions.usd_value, transactions.send_token, transactions.buy_token, send_svg_paths.svg_path as send_svg_path, buy_svg_paths.svg_path as buy_svg_path FROM transactions JOIN users ON transactions.user_id = users.id JOIN svg_paths send_svg_paths ON transactions.send_token = send_svg_paths.token_ticker JOIN svg_paths buy_svg_paths ON transactions.buy_token = buy_svg_paths.token_ticker WHERE users.email = $1', [email]);
    } else {
        var transactions = await pool.query('SELECT transactions.id, transactions.date, transactions.send_token_amount, transactions.buy_token_amount, transactions.usd_value, transactions.send_token, transactions.buy_token, send_svg_paths.svg_path as send_svg_path, buy_svg_paths.svg_path as buy_svg_path FROM transactions JOIN users ON transactions.user_id = users.id JOIN svg_paths send_svg_paths ON transactions.send_token = send_svg_paths.token_ticker JOIN svg_paths buy_svg_paths ON transactions.buy_token = buy_svg_paths.token_ticker WHERE users.id = $1', [id]);
    }
    return transactions.rows;
}

const putSvgPaths = async () => {
    const svg_path = {
        token_name: 'USDT',
        token_ticker: 'USDT',
        svg_path: 'M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zm1.922-18.207v-2.366h5.414V7.819H8.595v3.608h5.414v2.365c-4.4.202-7.709 1.074-7.709 2.118 0 1.044 3.309 1.915 7.709 2.118v7.582h3.913v-7.584c4.393-.202 7.694-1.073 7.694-2.116 0-1.043-3.301-1.914-7.694-2.117zm0 3.59v-.002c-.11.008-.677.042-1.942.042-1.01 0-1.721-.03-1.971-.042v.003c-3.888-.171-6.79-.848-6.79-1.658 0-.809 2.902-1.486 6.79-1.66v2.644c.254.018.982.061 1.988.061 1.207 0 1.812-.05 1.925-.06v-2.643c3.88.173 6.775.85 6.775 1.658 0 .81-2.895 1.485-6.775 1.657z'
    }

    const pool = connection.getPool();
    const addedSvg = await pool.query('INSERT INTO svg_paths (token_name, token_ticker, svg_path) VALUES ($1, $2, $3) RETURNING *', [svg_path.token_name, svg_path.token_ticker, svg_path.svg_path]);
    return addedSvg;
}

const implementSwapInDB = async (swapParameters) => {
    const pool = connection.getPool();

    const decreaseSendToken = await pool.query('UPDATE tokens SET value = value - $1 WHERE ticker = $2 AND user_id = (SELECT id FROM users WHERE email = $3)', [swapParameters.sendTokenAmount, swapParameters.sendToken, swapParameters.userEmail]);

    const checkIfSendTokenExists = await pool.query('SELECT * FROM tokens WHERE ticker = $1 AND user_id = (SELECT id FROM users WHERE email = $2)', [swapParameters.sendToken, swapParameters.userEmail]);
    if (parseFloat(checkIfSendTokenExists.rows[0].value) === 0) {
        const deleteSendToken = await pool.query('DELETE FROM tokens WHERE ticker = $1 AND user_id = (SELECT id FROM users WHERE email = $2)', [swapParameters.sendToken, swapParameters.userEmail]);
    }

    const checkIfBuyTokenExists = await pool.query('SELECT * FROM tokens WHERE ticker = $1 AND user_id = (SELECT id FROM users WHERE email = $2)', [swapParameters.buyToken, swapParameters.userEmail]);
    if (checkIfBuyTokenExists.rows.length > 0) {
        const increaseBuyToken = await pool.query('UPDATE tokens SET value = value + $1 WHERE ticker = $2 AND user_id = (SELECT id FROM users WHERE email = $3) RETURNING *', [swapParameters.buyTokenAmount, swapParameters.buyToken, swapParameters.userEmail]);
        return increaseBuyToken;
    } else {
        const addNewToken = await pool.query('INSERT INTO tokens (name, ticker, value, user_id) VALUES ($1, $2, $3, (SELECT id FROM users WHERE email = $4)) RETURNING *', [swapParameters.buyTokenName, swapParameters.buyToken, swapParameters.buyTokenAmount, swapParameters.userEmail]);
        return addNewToken;
    }
}

const implementTnxInDB = async (swapParameters) => {
    const pool = connection.getPool();

    // add transaction into DB based on swapParameters
    const addTnx = await pool.query('INSERT INTO transactions (user_id, send_token, send_token_amount, buy_token, buy_token_amount, date, usd_value) VALUES ((SELECT id FROM users WHERE email = $1), $2, $3, $4, $5, $6, $7) RETURNING *', [swapParameters.userEmail, swapParameters.sendToken, swapParameters.sendTokenAmount, swapParameters.buyToken, swapParameters.buyTokenAmount, swapParameters.date, swapParameters.usdValue]);
}


module.exports = { add, getAllPortfolios, getUser, addPortfolio, getPortfolioMainData, get, getWithoutQuotation, getTransactions, putSvgPaths, implementSwapInDB, implementTnxInDB };
