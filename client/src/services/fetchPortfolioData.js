import axios from 'axios';


async function fetchPortfolioData() {
    return await axios.get('/portfolio/closed/getportfolio', {
        withCredentials: true
    }).then(response => {
        return response.data;
    }).catch(error => console.error(error));
}

export default fetchPortfolioData;