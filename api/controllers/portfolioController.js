const dayjs = require('dayjs');
const decodeJwt = require('../helpers/jwtManagement/decodeJwt');
const Tokens = require('../db/portfolio/Tokens');
const formatTokens = require('../helpers/portfolioManagement/formatTokens');
const calculateMetrics = require('../helpers/portfolioManagement/calculateMetrics');
const cryptoCompare = require('../helpers/cryptoCompare/cryptoCompare');
const { checkIfInPortfolio } = require('../helpers/portfolioManagement/checkIfTokenInPortfolio');
const { checkIfSufficientBalance } = require('../helpers/portfolioManagement/checkIfSufficientBalance');
const { swapAssets } = require('../helpers/portfolioManagement/swapAssets');
const { getPortfolioParams } = require('../helpers/portfolioCreation/getPortfolioParams');
const { uploadToS3, getUserPresignedUrls } = require('../s3');
const { aumAndChangeforAllPortfolios } = require('../helpers/portfolioManagement/aumAndChangeforAllPortfolios');
const { formatAllPortfolios } = require('../helpers/portfolioManagement/formatAllPortfolios');
const { calculateHistoricalPortfolioValue } = require('../helpers/portfolioManagement/calculateHistoricalPortfolioValue');

const create = async (req, res) => {

    const portfolioParams = getPortfolioParams(req);

    if (!portfolioParams.name || !portfolioParams.description) {
        return res.status(400).send({ 'msg': 'no name or description' });
    } else {
        const userEmail = await decodeJwt.decode(req.cookies.jwt);
        const user = await Tokens.getUser(userEmail);
        if (portfolioParams.icon !== '') {
            const file = portfolioParams.icon;
            const userId = user.id;
            var { error, key } = await uploadToS3({ file, userId, })
            if (error) {
                console.log(error.message);
                return res.status(200).send({ 'msg': error.message });
            }
        }

        if (user.hasportfolio === 'true') {
            return res.status(200).send({ 'msg': 'portfolio already exists' });
        }

        const createdPortfolio = await Tokens.addPortfolio(userEmail, portfolioParams.name, portfolioParams.description, key);

        if (createdPortfolio === 'portfolio name already exists') {
            return res.status(200).send({ 'msg': 'portfolio name already exists' });
        }
        return res.status(200).cookie('hasPortfolio', true, { secure: false, httpOnly: false, expires: dayjs().add(1, "days").toDate() }).send({ 'msg': 'portfolio created' })
    }
}


const get = async (req, res) => {
    const userEmail = await decodeJwt.decode(req.cookies.jwt);
    const chartPeriod = req.query.chartPeriod;
    const portfolioData = await Tokens.getPortfolioMainData(userEmail);
    const portfolioTokens = await Tokens.get(userEmail);
    const transactions = await Tokens.getTransactions(userEmail);
    if (portfolioTokens.length === 0) {
        return res.status(200).send({ 'msg': 'no portfolio' });
    }
    const historicalPortfolioValue = await calculateHistoricalPortfolioValue(userEmail, portfolioTokens, chartPeriod);

    const { error, presignedUrls } = await getUserPresignedUrls(portfolioData.user_id);
    if (error) return res.status(200).send({ 'msg': error.message });
    const aum = calculateMetrics.calculateAum(portfolioTokens);
    const changeTotal = calculateMetrics.calculateChange(aum);

    // Get data for ranking calculation
    let allPortfolios = await Tokens.getAllPortfolios();
    allPortfolios = aumAndChangeforAllPortfolios(allPortfolios);
    // sort all portfolios by change and add rank
    allPortfolios.sort((a, b) => b.change - a.change);
    allPortfolios.forEach((portfolio, index) => portfolio.rank = index + 1);
    // determine rank of current portfolio
    const rank = allPortfolios.find(portfolio => portfolio.portfolio_name === portfolioData.portfolio_name).rank;

    const formattedPortfolioTokens = await formatTokens.format(portfolioData, portfolioTokens, transactions, aum, changeTotal, presignedUrls, historicalPortfolioValue, rank);
    return res.status(200).send(formattedPortfolioTokens);
}

const getSomeonePortfolio = async (req, res) => {
    const userId = req.query.id;
    const chartPeriod = req.query.chartPeriod;
    const portfolioData = await Tokens.getPortfolioMainData(email = false, id = userId);
    const portfolioTokens = await Tokens.get(email = false, id = userId);
    const transactions = await Tokens.getTransactions(email = false, id = userId);
    if (portfolioTokens.length === 0) {
        return res.status(200).send({ 'msg': 'no portfolio' });
    }
    const historicalPortfolioValue = await calculateHistoricalPortfolioValue(userEmail = false, portfolioTokens, chartPeriod, userId);
    const { error, presignedUrls } = await getUserPresignedUrls(portfolioData.user_id);
    if (error) return res.status(200).send({ 'msg': error.message });
    const aum = calculateMetrics.calculateAum(portfolioTokens);
    const changeTotal = calculateMetrics.calculateChange(aum);

    // Get data for ranking calculation
    let allPortfolios = await Tokens.getAllPortfolios();
    allPortfolios = aumAndChangeforAllPortfolios(allPortfolios);
    // sort all portfolios by change and add rank
    allPortfolios.sort((a, b) => b.change - a.change);
    allPortfolios.forEach((portfolio, index) => portfolio.rank = index + 1);
    // determine rank of current portfolio
    const rank = allPortfolios.find(portfolio => portfolio.portfolio_name === portfolioData.portfolio_name).rank;

    const formattedPortfolioTokens = await formatTokens.format(portfolioData, portfolioTokens, transactions, aum, changeTotal, presignedUrls, historicalPortfolioValue, rank);

    return res.status(200).send(formattedPortfolioTokens);
}



const getAll = async (req, res) => {
    // get all portfolios data (main and tokens)
    let allPortfolios = await Tokens.getAllPortfolios();

    if (allPortfolios.portfolioMainData.length === 0) {
        return res.status(200).send({ 'msg': 'no portfolios' });
    }

    // calculate aum and changeTotal for each portfolio
    allPortfolios = aumAndChangeforAllPortfolios(allPortfolios);
    const { error, presignedUrls } = await getUserPresignedUrls();
    if (error) {
        return res.status(200).send({ 'msg': error.message });
    }
    // console.log(allPortfolios);
    allPortfolios = formatAllPortfolios(allPortfolios, presignedUrls);



    return res.status(200).send(allPortfolios);
}

const isUsersPortfolio = async (req, res) => {
    const portfolioName = req.query.portfolioName;
    const userEmail = await decodeJwt.decode(req.cookies.jwt);
    const portfolioData = await Tokens.getPortfolioMainData(email = userEmail, id = false);
    if (portfolioData) {
        if (portfolioData.portfolio_name === portfolioName) {
            return res.status(200).send({ 'msg': 'true' });
        } else {
            return res.status(200).send({ 'msg': 'false' });
        }
    } else {
        return res.status(200).send({ 'msg': 'no portfolio' });
    }
}

const getPrice = async (req, res) => {
    const priceFromCryptoCompare = await cryptoCompare.fetchTokenPrice([req.query.token], "USD");
    const usdPrice = priceFromCryptoCompare[req.query.token].USD; //.toLocaleString("en-US", { style: "currency", currency: "USD" })
    return res.status(200).send({ usdPrice });
}

const quote = async (req, res) => {

    const userEmail = await decodeJwt.decode(req.cookies.jwt);
    const portfolioTokens = await Tokens.getWithoutQuotation(userEmail);
    // check if req.body.quote.buyToken in portfolioTokens
    const buyTokenIsNew = !checkIfInPortfolio(req.body.quote.buyToken, portfolioTokens);

    if (buyTokenIsNew && portfolioTokens.length >= 15) {
        return res.status(200).send({ 'msg': 'The maximum number of tokens in the portfolio is 15' });
    } else {
        if (checkIfInPortfolio(req.body.quote.sendToken, portfolioTokens) === false) {
            return res.status(200).send({ 'msg': 'sendToken not in portfolio' });
        } else {
            if (checkIfSufficientBalance(req.body.quote.sendToken, req.body.quote.sendTokenAmount, portfolioTokens) === false) {
                return res.status(200).send({ 'msg': 'not enough funds' });
            } else {
                const historicalPortfolioValueMin = await calculateHistoricalPortfolioValue(userEmail, portfolioTokens, 'minute');
                const historicalPortfolioValueHour = await calculateHistoricalPortfolioValue(userEmail, portfolioTokens, 'hour');
                const historicalPortfolioValueDay = await calculateHistoricalPortfolioValue(userEmail, portfolioTokens, 'day');
                const swapParameters = await swapAssets(req.body.quote.sendToken, req.body.quote.buyTokenName, req.body.quote.sendTokenAmount, req.body.quote.buyToken, userEmail);
                return res.status(200).send({ 'msg': swapParameters });
            }
        }
    }

}



module.exports = { create, get, getSomeonePortfolio, getAll, isUsersPortfolio, getPrice, quote };