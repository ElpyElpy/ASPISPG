const axios = require("axios");

const fetchTokenPrice = async (tokens, priceCurrency) => {
    const API_KEY = "2babd6b1436220809785b6bbb1c11f62ba8c398b26e088f464f8bcf79e926330";
    const baseUrl = "https://min-api.cryptocompare.com/data/pricemulti";

    const strOfTokens = tokens.join(",");

    try {
        const response = await axios.get(`${baseUrl}?fsyms=${strOfTokens}&tsyms=${priceCurrency}`, {
            headers: {
                "Authorization": `Apikey ${API_KEY}`
            }
        });
        return response.data;
    } catch (err) {
        throw new Error(err);
    }
}

module.exports = { fetchTokenPrice };