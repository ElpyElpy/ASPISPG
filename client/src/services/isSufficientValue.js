


function isSufficientValue(portfolio, ticker, quantitySendToken) {
    const tokenFromPortfolio = portfolio.find(obj => obj.ticker === ticker);
    console.log(tokenFromPortfolio);
    if (tokenFromPortfolio) {
        return tokenFromPortfolio && (parseFloat(quantitySendToken.replace(/,/g, '')) > 0) && (parseFloat(tokenFromPortfolio.quantity.replace(/,/g, '')) >= parseFloat(quantitySendToken.replace(/,/g, '')));
    }
    return false;
}

export default isSufficientValue;