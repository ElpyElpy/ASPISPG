


function isTokenExists(portfolio, ticker) {
    const isTokenInPortfolio = portfolio.find(obj => obj.ticker === ticker) ? true : false;
    return isTokenInPortfolio;
}

export default isTokenExists;