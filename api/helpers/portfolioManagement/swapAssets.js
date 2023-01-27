const dayjs = require('dayjs');
const { fetchTokenPrice } = require('../cryptoCompare/cryptoCompare');
const { implementSwapInDB, implementTnxInDB } = require('../../db/portfolio/Tokens');

const swapAssets = async (sendToken, buyTokenName, sendTokenAmount, buyToken, userEmail) => {
    const swapParameters = {
        userEmail: userEmail,
        sendToken: sendToken,
        buyTokenName: buyTokenName,
        sendTokenAmount: parseFloat(sendTokenAmount),
        buyToken: buyToken,
        buyTokenAmount: 0,
        usdValue: 0,
        type: 'swap',
        date: dayjs().format('YYYY-MM-DD HH:mm:ss')
    }


    //get price of sendToken
    const tokensPrices = await fetchTokenPrice([sendToken, buyToken], "USD");

    //calculate buyTokenAmount
    // round number to 4 decimal places
    swapParameters.usdValue = Math.round(sendTokenAmount * tokensPrices[sendToken].USD * 10000) / 10000;
    const buyTokenAmount = Math.round(sendTokenAmount * tokensPrices[sendToken].USD / tokensPrices[buyToken].USD * 10000) / 10000; //Math.round(sendTokenAmount * tokensPrices[sendToken].USD / tokensPrices[buyToken].USD);

    //save transaction to db
    swapParameters.buyTokenAmount = buyTokenAmount;
    const result = await implementSwapInDB(swapParameters);
    const result2 = await implementTnxInDB(swapParameters);
    return result;
}

module.exports = { swapAssets };