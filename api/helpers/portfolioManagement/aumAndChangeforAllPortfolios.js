function aumAndChangeforAllPortfolios(portfolios) {
    const result = {};
    for (const obj of portfolios.tokens) {
        if (!result[obj.user_id]) {
            result[obj.user_id] = 0;
        }
        result[obj.user_id] += obj.usdValue;
    }
    portfolios.portfolioMainData = portfolios.portfolioMainData.map(user => ({ user_id: user.user_id, portfolio_name: user.portfolio_name, portfolio_description: user.portfolio_description, username: user.username, usdValue: result[user.user_id] || 0, change: ((result[user.user_id] / 100000) - 1) || 0 }));

    return portfolios.portfolioMainData
}

module.exports = { aumAndChangeforAllPortfolios }