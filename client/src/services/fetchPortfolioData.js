import axios from 'axios';


async function fetchPortfolioData(chartPeriod) {
    return await axios.get('/portfolio/closed/getportfolio', {
        params: { chartPeriod: chartPeriod },
        withCredentials: true
    }).then(response => {
        return response.data;
    }).catch(error => console.error(error));
}

export default fetchPortfolioData;