const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const CATALOG_SERVICE_URL = process.env.CATALOG_URL;;
const ORDER_SERVICE_URL = process.env.ORDER_URL;;

// Search for books by topic
app.get('/search/:topic', async (req, res) => {
    const topic = req.params.topic;
    const response = await axios.get(`${CATALOG_SERVICE_URL}/search/${topic}`);
    res.json(response.data);
});

// Get details of a specific book
app.get('/info/:item_number', async (req, res) => {
    const itemNumber = req.params.item_number;
    const response = await axios.get(`${CATALOG_SERVICE_URL}/info/${itemNumber}`);
    res.json(response.data);
});

// Purchase a book
app.post('/purchase/:item_number', async (req, res) => {
    const itemNumber = req.params.item_number;
    const response = await axios.post(`${ORDER_SERVICE_URL}/purchase/${itemNumber}`,
        req.body
    );
    res.json(response.data);
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Front-End Service running on port ${PORT}`);
});
