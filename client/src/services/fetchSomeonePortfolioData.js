import axios from 'axios';


async function fetchSomeonePortfolioData(userId, chartPeriod) {
    return await axios.get('/portfolio/getsomeoneportfolio', { params: { id: userId, chartPeriod: chartPeriod } }, {
        withCredentials: true
    }).then(response => {
        return response.data;
    }).catch(error => console.error(error));
}

export default fetchSomeonePortfolioData;