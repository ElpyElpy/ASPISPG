const dayjs = require('dayjs');
const decodeJwt = require('../helpers/jwtManagement/decodeJwt');
const Tokens = require('../db/portfolio/Tokens');
const formatTokens = require('../helpers/portfolioManagement/formatTokens');
const calculateMetrics = require('../helpers/portfolioManagement/calculateMetrics');
const cryptoCompare = require('../helpers/cryptoCompare/cryptoCompare');
const { checkIfInPortfolio } = require('../helpers/portfolioManagement/checkIfTokenInPortfolio');
const { checkIfSufficientBalance } = require('../helpers/portfolioManagement/checkIfSufficientBalance');
const { swapAssets } = require('../helpers/portfolioManagement/swapAssets');

const get = async (req, res) => {
    const userEmail = await decodeJwt.decode(req.cookies.jwt);
    // const temp = await Tokens.add()
    // const temp = await Tokens.putSvgPaths();

    const portfolioTokens = await Tokens.get(userEmail);
    const transactions = await Tokens.getTransactions(userEmail);
    if (portfolioTokens.length === 0) {
        return res.status(200).send({ 'msg': 'no portfolio' });
    }
    const aum = calculateMetrics.calculateAum(portfolioTokens);
    const changeTotal = calculateMetrics.calculateChange(aum);
    const formattedPortfolioTokens = await formatTokens.format(portfolioTokens, transactions, aum, changeTotal);

    return res.status(200).send(formattedPortfolioTokens);

    // const portfolioTransactions = getPortfolio.getPortfolioTransactions(userEmail);

}

const getPrice = async (req, res) => {
    const priceFromCryptoCompare = await cryptoCompare.fetchTokenPrice([req.query.token], "USD");
    const usdPrice = priceFromCryptoCompare[req.query.token].USD; //.toLocaleString("en-US", { style: "currency", currency: "USD" })
    return res.status(200).send({ usdPrice });
}

const quote = async (req, res) => {

    const userEmail = await decodeJwt.decode(req.cookies.jwt);
    const portfolioTokens = await Tokens.get(userEmail); // TODO: get portfolio tokens from db without cryptoCompare call

    console.log(req.body.quote.sendTokenAmount);
    if (checkIfInPortfolio(req.body.quote.sendToken, portfolioTokens) === false) {
        return res.status(200).send({ 'msg': 'sendToken not in portfolio' });
    } else {
        if (checkIfSufficientBalance(req.body.quote.sendToken, req.body.quote.sendTokenAmount, portfolioTokens) === false) {
            return res.status(200).send({ 'msg': 'not enough funds' });
        } else {
            const swapParameters = await swapAssets(req.body.quote.sendToken, req.body.quote.buyTokenName, req.body.quote.sendTokenAmount, req.body.quote.buyToken, userEmail);
            // saveTransaction(swapParameters, userEmail);
            return res.status(200).send({ 'msg': swapParameters });
        }
    }
}

module.exports = { get, getPrice, quote };