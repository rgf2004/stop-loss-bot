require('log-timestamp');
const colors = require('colors');

const logInfoInGreen = (msg, currency = '') => {
    var message ;
    if (currency !== '')
        message = currency.padEnd(5) + ' - ' + msg;
    else
        message = msg;

    console.log(message.green);
};

const logInfoYellow = (msg, currency = '') => {
    var message ;
    if (currency !== '')
        message = currency.padEnd(5) + ' - ' + msg;
    else
        message = msg;

    console.log(message.yellow);
};

const logInfoRainbow = (msg, currency = '') => {
    var message ;
    if (currency !== '')
        message = currency.padEnd(5) + ' - ' + msg;
    else
        message = msg;

    console.log(message.rainbow);
};

const logInfoInInverse = (msg, currency = '') => {
    var message ;
    if (currency !== '')
        message = currency.padEnd(5) + ' - ' + msg;
    else
        message = msg;

    console.log(message.inverse);
};

const logError = (msg) => {
    console.log(msg.red);
};

module.exports = 
{
    logInfoInGreen,
    logInfoInInverse,
    logInfoYellow,
    logInfoRainbow,
    logError
};