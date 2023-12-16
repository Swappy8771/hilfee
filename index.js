// app.js

const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path'); // Add this line

const app = express();
const port = 3000;

// If 'uploads' is a subfolder within 'public'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/accets', express.static(path.join(__dirname, 'accets')));
app.use('/uploads', express.static('uploads'));
// MongoDB setup
// brjP3hFg8u9znsZ2
// swapnilpatil8771


mongoose.connect('mongodb+srv://swapnilpatil8771:brjP3hFg8u9znsZ2@cluster0.4n9juru.mongodb.net', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Express session setup
app.use(session({
  secret: 'your_secret_key',
  resave: true,
  saveUninitialized: true
}));

// Body parser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set EJS as the view engine
app.set('view engine', 'ejs'); // Add this line
app.set('views', path.join(__dirname, 'views')); // Add this line

// Routes
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
