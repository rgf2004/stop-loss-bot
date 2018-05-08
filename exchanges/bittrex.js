const  bittrex = require('node-bittrex-api');

bittrex.options({
    'apikey': process.env.BittrexApiKey,
    'apisecret': process.env.BittrexApiSecrect,
    'cleartext' : true
});


const getBalance = () => {
    return new Promise((resolve, reject) => {
        bittrex.getbalance({ currency: 'BTC' }, (error, data) => {
            if (error) {
                reject(error);
            } else {
                resolve(data.result);
            }
        });
    });
};

const placeOrder = (pair, type, ordertype, price, volume) => {
    return new Promise((resolve, reject) => {
        const options = {
            pair,
            type,
            ordertype,
            price,
            volume,
        }
        bittrex.tradesell(options, (error, data) => {
            if (error) {
                reject(error);
            } else {
                resolve(data.result);
            }
        });
    });
};

module.exports = {
    getBalance,
    placeOrder,
};
