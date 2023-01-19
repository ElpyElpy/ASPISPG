
const calculateAum = (arrayOfTokens) => {
    let aum = 0;
    for (let i = 0; i < arrayOfTokens.length; i++) {
        aum = aum + arrayOfTokens[i].usdValue;
    }
    return aum;
}

const calculateChange = (aum) => {
    const INITIAL_USER_AUM = process.env.INITIAL_USER_AUM;
    const changeTotal = (aum / INITIAL_USER_AUM) - 1;
    return changeTotal;
}

module.exports = { calculateAum, calculateChange };
