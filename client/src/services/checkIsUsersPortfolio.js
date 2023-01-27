import axios from 'axios';


async function checkIsUsersPortfolio(name) {
    return await axios.get('/portfolio/closed/isUsersportfolio', {
        params: { portfolioName: name },
        withCredentials: true
    }).then(response => {
        return response.data;
    }).catch(error => console.error(error));
}

export default checkIsUsersPortfolio;