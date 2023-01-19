
const format = async (arrayOfTokens, transactions, aum, changeTotal) => {

    // support data for formatting data
    const currencyFractionDigits = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EUR',
    }).resolvedOptions().maximumFractionDigits;


    for (let i = 0; i < arrayOfTokens.length; i++) {
        arrayOfTokens[i].id = i + 1;
        arrayOfTokens[i].share = ((arrayOfTokens[i].usdValue / aum) * 100).toFixed(2) + "%";
        arrayOfTokens[i].token = arrayOfTokens[i].name;
        arrayOfTokens[i].svgpath = arrayOfTokens[i].svg_path
        arrayOfTokens[i].quantity = arrayOfTokens[i].value;
        arrayOfTokens[i].usdValue = arrayOfTokens[i].usdValue.toLocaleString("en-US", { style: "currency", currency: "USD" });
        arrayOfTokens[i].quantity = Number(arrayOfTokens[i].quantity).toLocaleString("en-US", {
            maximumFractionDigits: 4
        });
        delete arrayOfTokens[i].svg_path;
        delete arrayOfTokens[i].name;
        delete arrayOfTokens[i].value;
    }

    for (let i = 0; i < transactions.length; i++) {

        transactions[i].date = transactions[i].date.toLocaleString("en-US", { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' });
        transactions[i].usd_value = Number(transactions[i].usd_value).toLocaleString("en-US", { style: "currency", currency: "USD" });
        transactions[i].send_token_amount = Number(transactions[i].send_token_amount).toLocaleString("en-US", {
            maximumFractionDigits: 4,
            minimumFractionDigits: 4
        });
        transactions[i].buy_token_amount = Number(transactions[i].buy_token_amount).toLocaleString("en-US", {
            maximumFractionDigits: 4,
            minimumFractionDigits: 4
        });
    }

    const formattedAum = aum.toLocaleString("en-US", { style: "currency", currency: "USD" });

    const decimalPlaces = 2;
    const sign = Math.sign(changeTotal) === -1 ? "-" : "+";
    const formattedChangeTotal = `${sign}${Math.abs(changeTotal * 100).toFixed(2)}%`; // TODO: fix this line to show the correct percentage


    return { portfolio: arrayOfTokens, aum: formattedAum, changeTotal: formattedChangeTotal, transactions: transactions };
}

module.exports = { format };
