

const getPortfolioParams = (req) => {
    const { name, description } = req.body;
    const icon = req.file ? req.file : '';
    return { name, description, icon };
}

module.exports = { getPortfolioParams };