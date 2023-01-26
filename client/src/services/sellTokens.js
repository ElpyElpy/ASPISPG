import axios from 'axios';


async function sellTokens(sendToken, buyTokenName, buyToken, sendTokenAmount) {

    const quote = {
        sendToken: sendToken,
        buyTokenName: buyTokenName,
        buyToken: buyToken,
        sendTokenAmount: sendTokenAmount
    }


    return await axios.post('/portfolio/closed/quote', { quote }, {
        withCredentials: true
    }).then(response => {
        return response.data;
    }).catch(error => console.error(error));
}

export default sellTokens;