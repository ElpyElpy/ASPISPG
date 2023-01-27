

const checkIfInPortfolio = (token, portfolioTokens) => {

    for (let i = 0; i < portfolioTokens.length; i++) {
        if (portfolioTokens[i].ticker === token) {
            return true;
        }
    }
    return false;
}

module.exports = { checkIfInPortfolio };
