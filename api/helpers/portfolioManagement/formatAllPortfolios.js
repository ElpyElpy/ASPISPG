const formatAllPortfolios = (allPortfolios, presignedUrls) => {


    for (let i = 0; i < allPortfolios.length; i++) {
        const sign = Math.sign(allPortfolios[i].change) === -1 ? "-" : "+";
        allPortfolios[i].change = `${sign}${Math.abs(allPortfolios[i].change * 100).toFixed(2)}%`
        allPortfolios[i].usdValue = allPortfolios[i].usdValue.toLocaleString("en-US", { style: "currency", currency: "USD" });
        allPortfolios[i].url = '';
    }

    allPortfolios.map(portfolio => {
        const user_id = portfolio.user_id;
        const url = presignedUrls.find(url => {
            const regex = new RegExp(`\/${user_id}\/`);
            return regex.test(url);
        });
        if (url) {
            portfolio.url = url;
        }

    })
    return allPortfolios;
}

module.exports = { formatAllPortfolios }