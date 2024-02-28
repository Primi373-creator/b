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
app.get('/getCharacter/:character_id', async (req, res) => {
    const characterId = req.params.character_id;
    try {
        const apiResponse = await fetch(`https://api.nekosapi.com/v3/characters/${characterId}`);
        const data = await apiResponse.json();
        console.log(data);
        res.json(data);
    } catch (error) {
        console.error('Error fetching character data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint to get characters for a specific image
app.get('/getCharactersForImage/:image_id', async (req, res) => {
    const imageId = req.params.image_id;
    try {
        const apiResponse = await fetch(`https://api.nekosapi.com/v3/images/${imageId}/characters`);
        const data = await apiResponse.json();
        console.log(data);
        res.json(data);
    } catch (error) {
        console.error('Error fetching characters for image:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint to get a list of all characters
app.get('/getAllCharacters', async (req, res) => {
    try {
        const apiResponse = await fetch('https://api.nekosapi.com/v3/characters');
        const data = await apiResponse.json();
        console.log(data);
        res.json(data);
    } catch (error) {
        console.error('Error fetching all characters:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/getImagesForArtist/:artist_id', async (req, res) => {
    const artistId = req.params.artist_id;
    try {
        const apiResponse = await fetch(`https://api.nekosapi.com/v3/characters/${artistId}/images`);
        const data = await apiResponse.json();
        console.log(data);
        res.json(data);
    } catch (error) {
        console.error('Error fetching images for artist:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
