import axios from 'axios';


async function calculateUsdValue(tokenInfo, quantity) {

    const token = tokenInfo.ticker ? tokenInfo.ticker : tokenInfo.Symbol;

    return await axios.get('/portfolio/closed/getprice', {
        params: {
            token: token
        },
        withCredentials: true
    }).then(response => {
        return (response.data.usdPrice * quantity);
    }).catch(error => console.error(error));
}

export default calculateUsdValue;