

const checkIfSufficientBalance = (token, value, portfolio) => {

    for (let i = 0; i < portfolio.length; i++) {
        if (portfolio[i].ticker === token) {
            if (parseFloat(portfolio[i].value) >= parseFloat(value)) {
                return true;
            }
            return false;
        }
    }
    return false;
}

module.exports = { checkIfSufficientBalance };