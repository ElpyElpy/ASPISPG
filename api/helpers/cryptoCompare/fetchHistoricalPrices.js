const axios = require("axios");
const moment = require('moment-timezone');


const fetchHistoricalPrices = async (arrayOfTokens, lastTimestampFromDB, delta) => {

    const API_KEY = "2babd6b1436220809785b6bbb1c11f62ba8c398b26e088f464f8bcf79e926330";
    let baseUrl;
    if (delta === 60) {
        baseUrl = "https://min-api.cryptocompare.com/data/v2/histominute";
    } else if (delta === 3600) {
        baseUrl = "https://min-api.cryptocompare.com/data/v2/histohour";
    } else if (delta === 3600 * 24) {
        baseUrl = "https://min-api.cryptocompare.com/data/v2/histoday";
    }

    const dataPoints = {};
    const currentTimestamp = moment().unix();
    let limit = Math.floor((currentTimestamp - lastTimestampFromDB) / delta);
    if (delta === 60 && limit > 60) {
        limit = 60;
    } else if (delta === 3600 && limit > 24) {
        limit = 24;
    } else if (delta === 3600 * 24 && limit > 7) {
        limit = 7;
    }


    for (let i = 0; i < arrayOfTokens.length; i++) {
        try {
            const response = await axios.get(`${baseUrl}?fsym=${arrayOfTokens[i]}&tsym=USD&limit=${limit}`, {
                headers: {
                    "Authorization": `Apikey ${API_KEY}`
                }
            });
            dataPoints[arrayOfTokens[i]] = response.data.Data.Data;
        } catch (err) {
            throw new Error(err);
        }
    }
    // in dataPoints convert value of key time to format 2020-01-01 00:00:00
    for (let i = 0; i < arrayOfTokens.length; i++) {
        for (let j = 0; j < dataPoints[arrayOfTokens[i]].length; j++) {
            dataPoints[arrayOfTokens[i]][j].time = new Date(dataPoints[arrayOfTokens[i]][j].time * 1000).toISOString().slice(0, 19).replace('T', ' ');
        }
    }


    // if limit is 1 return only last object from dataPoints
    if (limit === 1) {
        for (let i = 0; i < arrayOfTokens.length; i++) {
            dataPoints[arrayOfTokens[i]] = dataPoints[arrayOfTokens[i]].slice(-1);
        }
    } else if (limit > 1) {
        // delete first object from dataPoints
        for (let i = 0; i < arrayOfTokens.length; i++) {
            dataPoints[arrayOfTokens[i]].shift();
        }
    }
    return dataPoints;
}

module.exports = { fetchHistoricalPrices };