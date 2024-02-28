const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = 3000;

app.get('/getRandomNeko', async (req, res) => {
    try {
        const apiResponse = await fetch('https://api.nekosapi.com/v3/images/random');
        const data = await apiResponse.json();
        console.log(data);
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
