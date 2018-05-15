const bittrex   = require('node-bittrex-api');
const cc        = require('../utils/cc');
const logger    = require('../utils/logger');

bittrex.options({
    'apikey': process.env.BittrexApiKey,
    'apisecret': process.env.BittrexApiSecrect,
    'cleartext': true
});


const getBalance = (currencySymbol) => {
    return new Promise((resolve, reject) => {
        bittrex.getbalance({ currency: currencySymbol }, (error, data) => {
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

const monitorAssetForSell = (price, asset) => {
    asset.mode = "sell";
    const newSellThreshold = cc.calculateSellValue(price.USD, asset.percentage); //price.USD - (price.USD * (asset.percentage / 100));
    if (!asset.sellThreshold) {
        asset.sellThreshold = newSellThreshold;
        logger.logInfoInGreen(`First time checking stop loss threshold has been initialized - ${asset.sellThreshold}`, asset.symbol);
    }
    else {
        if (price.USD <= asset.sellThreshold) {
            logger.logInfoInInverse(`Sell Order will be sumbitted - ${price.USD} - ######################################`, asset.symbol);
            // after sell place order buy with current price                
            logger.logInfoRainbow(`order finished - ${price.USD}`, asset.symbol);
            delete asset.sellThreshold;
            asset.mode = "buy";
        }
        else if (price.USD >= newSellThreshold && newSellThreshold > asset.sellThreshold) {
            asset.sellThreshold = newSellThreshold;
            logger.logInfoYellow(`New Stop loss threshold has been set - ${asset.sellThreshold}`, asset.symbol);
        }
    }
    return asset;
}

const monitorAssetForBuy = (price, asset) => {
    const newBuyThreshold = cc.calculateBuyValue(price.USD, asset.percentage); //price.USD - (price.USD * (asset.percentage / 100));
    if (!asset.buyThreshold) {
        asset.buyThreshold = newBuyThreshold;
        logger.logInfoInGreen(`First time checking buy threshold has been initialized - ${asset.buyThreshold}`, asset.symbol);
    }
    else {
        if (price.USD >= asset.buyThreshold) {
            logger.logInfoInInverse(`Buy Order will be sumbitted - ${price.USD} - ######################################`, asset.symbol);
            // after place order buy with current price              
            logger.logInfoRainbow(`order finished - ${price.USD}`, asset.symbol);
            delete asset.buyThreshold;
            asset.mode = "sell";
        }
        else if (price.USD <= newBuyThreshold && newBuyThreshold < assset.buyThreshold) {
            asset.buyThreshold = newBuyThreshold;
            logger.logInfoRainbow(`New Buy threshold has been set - ${asset.buyThreshold}`, asset.symbol);
        }
    }
}

module.exports = {
    getBalance,
    placeOrder,
    monitorAssetForSell,
    monitorAssetForBuy
};
