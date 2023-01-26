import axios from 'axios';


async function fetchAllPortfolios() {
    return await axios.get('/portfolio/getallportfolios', {
        withCredentials: true
    }).then(response => {
        console.log(response.data);
        return response.data;
    }).catch(error => console.error(error));
}

export default fetchAllPortfolios;