const { fetchHistoricalPrices } = require('../cryptoCompare/fetchHistoricalPrices');
const { getPortfolioValuesFromDB } = require('../../db/portfolio/getPortfolioValuesFromDB');
const { updateDBwithNewPortfolioValues } = require('../../db/portfolio/updateDBwithNewPortfolioValues');
const moment = require('moment-timezone');


const calculateHistoricalPortfolioValue = async (userEmail, portfolioTokens, timeRange, userId = false) => {
    // 1. load current portfolio value history from db and convert it to format for chart

    let delta;
    if (timeRange === 'minute') {
        delta = 60;
    } else if (timeRange === 'hour') {
        delta = 3600;
    } else if (timeRange === 'day') {
        delta = 3600 * 24;
    }


    let dataPointsFromDB = [];
    const currentTimestamp = moment().unix();
    if (userId) {
        var portfolioValues = await getPortfolioValuesFromDB(userEmail = false, timeRange, userId);
    } else {
        var portfolioValues = await getPortfolioValuesFromDB(userEmail, timeRange);
    }

    for (let i = 0; i < portfolioValues.length; i++) {
        dataPointsFromDB.push({ x: new Date(portfolioValues[i].date).toISOString().slice(0, 19).replace('T', ' '), y: parseFloat(portfolioValues[i].usd_value) });
    }

    dataPointsFromDB.sort((a, b) => { return new Date(a.x) - new Date(b.x); })

    // 2. determine latest date in dataPointsFromDB, compare it with current date and determine if new data needs to be fetched 
    let lastTimestampFromDB = moment.utc(dataPointsFromDB[dataPointsFromDB.length - 1].x).unix();

    if (currentTimestamp - lastTimestampFromDB <= delta) {
        if (timeRange === 'minute' && dataPointsFromDB.length > 60) {
            dataPointsFromDB = dataPointsFromDB.slice(-60);
            return dataPointsFromDB;
        } else if (timeRange === 'hour' && dataPointsFromDB.length > 24) {
            dataPointsFromDB = dataPointsFromDB.slice(-24);
            return dataPointsFromDB;
        } else if (timeRange === 'day' && dataPointsFromDB.length > 7) {
            dataPointsFromDB = dataPointsFromDB.slice(7);
            return dataPointsFromDB;
        }
        return dataPointsFromDB;
    } else {
        // 3. fetch new data from cryptocompare and add it to dataPointsFromDB

        const arrayOfTokens = [];
        for (let i = 0; i < portfolioTokens.length; i++) {
            arrayOfTokens.push(portfolioTokens[i].ticker);
        }
        const hourlyPrices = await fetchHistoricalPrices(arrayOfTokens, lastTimestampFromDB, delta);

        let dataPoints = [];
        for (let i = 0; i < portfolioTokens.length; i++) {
            for (let j = 0; j < hourlyPrices[portfolioTokens[i].ticker].length; j++) {
                if (!dataPoints.some(obj => obj.x === hourlyPrices[portfolioTokens[i].ticker][j].time)) {
                    dataPoints.push({ x: hourlyPrices[portfolioTokens[i].ticker][j].time, y: hourlyPrices[portfolioTokens[i].ticker][j].open * parseFloat(portfolioTokens[i].value) });
                } else {
                    dataPoints.forEach(obj => {
                        if (obj.x === hourlyPrices[portfolioTokens[i].ticker][j].time) {
                            obj.y += hourlyPrices[portfolioTokens[i].ticker][j].open * parseFloat(portfolioTokens[i].value);
                        }
                    })
                }
            }
        }
        // 4. update DB data with new data from cryptocompare
        if (userId) {
            await updateDBwithNewPortfolioValues(userEmail = false, dataPoints, timeRange, userId);
        } else {
            await updateDBwithNewPortfolioValues(userEmail, dataPoints, timeRange);
        }
        // concat dataPointsFromDB and dataPoints
        dataPointsFromDB.push(...dataPoints);
        // if dataPointsFromDB length > 60 
        if (timeRange === 'minute' && dataPointsFromDB.length > 60) {
            dataPointsFromDB = dataPointsFromDB.slice(-60);
        } else if (timeRange === 'hour' && dataPointsFromDB.length > 24) {
            dataPointsFromDB = dataPointsFromDB.slice(-24);
        } else if (timeRange === 'day' && dataPointsFromDB.length > 7) {
            dataPointsFromDB = dataPointsFromDB.slice(-7);
        }
        return dataPointsFromDB;
    }


}

module.exports = { calculateHistoricalPortfolioValue };