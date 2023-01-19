


function isSufficientValue(portfolio, ticker, quantitySendToken) {
    const tokenFromPortfolio = portfolio.find(obj => obj.ticker === ticker);
    console.log(tokenFromPortfolio);
    if (tokenFromPortfolio) {
        console.log(parseFloat(tokenFromPortfolio.quantity.replace(/,/g, '')));
        // console.log(parseFloat(quantitySendToken.replace(/,/g, '')));
        console.log(quantitySendToken);

        return tokenFromPortfolio && (parseFloat(quantitySendToken.replace(/,/g, '')) > 0) && (parseFloat(tokenFromPortfolio.quantity.replace(/,/g, '')) >= parseFloat(quantitySendToken.replace(/,/g, '')));
    }
    return false;
}

export default isSufficientValue;