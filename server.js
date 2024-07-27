const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config(); // Load environment variables

const app = express();
const port =3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the "public" directory

// MongoDB connection using Atlas
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define a schema and model
const dataSchema = new mongoose.Schema({
    name: String,
    email: String
});

const Data = mongoose.model('Data', dataSchema);

// Routes
app.post('/add', async (req, res) => {
    try {
        const newData = new Data(req.body);
        const savedData = await newData.save();
        res.status(200).send(savedData);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
