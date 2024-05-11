const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const productRoutes = require('./routes/product.router');
const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '7000242911:AAFID_HmudqFWo3HQFo9B3W6nNGQdAnhHqA';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});
const botMiddleware = (req,res,next)=>{
  req.bot = bot
  next()
}

const app = express();
const PORT = process.env.PORT || 4000;
 app.use(botMiddleware)



// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
  const options = {
    reply_markup: {
        inline_keyboard: [
            [{
              text: 'Start Shopping 🛍️',
              web_app: { url: 'https://ac986765.store' }  // Replace this with your Mini App URL
          }]
        ]
    }
};
  bot.sendMessage(chatId, 'Click the button below to start shopping 😊',options);
});

// Set up Multer storage


// Middleware to enable CORS for all origins
app.use(cors({origin:"*"}));
// app.use(cors({origin:"https://ac986765.store"}));
app.use('/public', express.static(path.join(__dirname, 'public')));
// Middleware to parse JSON bodies
app.use(express.json({ limit: '50mb' }));
app.get('/',(req, res)=>{
    res.send({message:"hello"})
})
// Use user routes
app.use('/api', productRoutes);



// MongoDB connection URL
const mongoURI = 'mongodb://127.0.0.1:27017/telemini';

// Connect to MongoDB
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
