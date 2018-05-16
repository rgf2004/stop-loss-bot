const fetch = require('node-fetch');
const telegram = require('../notifications/telegram');

const histo = (fromSymbol, toSymbol, limit = 3, aggregate = 1, period = 'minute') => new Promise((resolve, reject) => {
  fetch(`${process.env.CCApiURL}histo${period}?fsym=${fromSymbol}&tsym=${toSymbol}&limit=${limit}&aggregate=${aggregate}&e=Poloniex`)
    .then(response => resolve(response.json()))
    .catch((error) => {
      console.log('Cryptocompare API not available.');
      reject(`Cryptocompare API not available.Error: ${error}`);
    });
});

const getPrice = (fromSymbol, toSymbol, exchange) => new Promise((resolve, reject) => {
    fetch(`${process.env.CCApiURL}price?fsym=${fromSymbol}&tsyms=${toSymbol}`)
        .then(response => resolve(response.json()))
        .catch(error => reject(error));
});


const calculateSellValue = (amount, percentage) => {
  var num = amount - (amount * (percentage / 100));
  num = num.toFixed(3);
  return num;
}

const calculateBuyValue = (amount, percentage) => {
  var num = amount + (amount * (percentage / 100));
  num = num.toFixed(3);
  return num;
}


const sendTelegramSellNotify = (symbol, price, amount) => {
  if (process.env.TelegramNotification === 'true') {
    telegram.sendTelegramMessage(`Bot is going to sell           
    Symbol:${symbol}
    Amount:${amount}
    Price:${price}`);
  }
};

const sendTelegramBuyNotify = (symbol, price, amount) => {
  if (process.env.TelegramNotification === 'true') {
    telegram.sendTelegramMessage(`Bot is going to buy           
    Symbol:${symbol}
    Amount:${amount}
    Price:${price}`);
  }
};

module.exports = {
  histo,
  getPrice,
  calculateSellValue,
  calculateBuyValue,
  sendTelegramSellNotify,
  sendTelegramBuyNotify
};