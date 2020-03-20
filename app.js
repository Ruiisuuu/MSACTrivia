const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');

// Load env vars
require('dotenv').config();

const app = express();

// Body parser
app.use(express.json());

// Enable cors
app.use(cors());

// Connect to Mongo
mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    }) // Adding new mongo url parser
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// Set Routes
const listRoutes = require('./routes/api/lists');
app.use('/api/lists', listRoutes);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

module.exports = app;


