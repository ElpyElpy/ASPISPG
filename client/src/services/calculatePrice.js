import axios from 'axios';

async function calculatePrice(ticker) {
    return await axios.get('/portfolio/closed/getprice', {
        params: {
            token: ticker
        },
        withCredentials: true
    }).then(response => {
        return response.data.usdPrice;
    }).catch(error => console.error(error));
}

export default calculatePrice;