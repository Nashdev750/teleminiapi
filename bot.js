const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '7000242911:AAFID_HmudqFWo3HQFo9B3W6nNGQdAnhHqA';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});


module.exports = {bot}