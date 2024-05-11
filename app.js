const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const productRoutes = require('./routes/product.router');
const {bot} = require('./bot')

const app = express();
const PORT = process.env.PORT || 4000;


bot.onText(/\/echo (.+)/, (msg, match) => {

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

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
