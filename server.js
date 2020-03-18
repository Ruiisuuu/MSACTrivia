const express = require('express');
const path = require('path');
const cors = require('cors');

// Load env vars
require('dotenv').config();

const app = express();

// Body parser
app.use(express.json());

// Enable cors
app.use(cors());

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(process.env.PORT, () => console.log(`Server started on PORT ${process.env.PORT}`));
