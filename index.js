const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = 3002;
const axios = require('axios');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
const getEndpoints = (app) => {
  const endpoints = [];

  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      endpoints.push(middleware.route.path);
    } else if (middleware.name === 'router') {
      middleware.handle.stack.forEach((handler) => {
        endpoints.push(handler.route.path);
      });
    }
  });

  return endpoints;
};
app.get('/', async (req, res) => {
  const endpoints = getEndpoints(app);
  const buttons = endpoints
    .map((endpoint) => `<button onclick="window.location.href='${endpoint}'">${endpoint}</button>`)
    .join('');
  const alphaApiButton = `<button onclick="window.location.href='https://api.alpha-md.rf.gd/'">Check out the home page here</button>`;

  const html = `
    <h1>Welcome to alphas  API!</h1>
    <p>API Endpoints:</p>
    ${buttons}
    <br />
    ${alphaApiButton}
  `;

  res.send(html);
});




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
app.get('/ai/herc', async (req, res) => {
    const prompt = req.query.prompt;
  
    // Check if prompt is provided
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }
  
    try {
      const response = await axios.get(`https://hercai.onrender.com/v3/hercai?question=${encodeURIComponent(prompt)}`);
      res.json({ result: response.data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Endpoint for text to image conversion using GET request
  app.get('/ai/hercimg', async (req, res) => {
    const prompt = req.query.prompt;
  
    // Check if text is provided
    if (!prompt) {
      return res.status(400).json({ error: 'prompt is required' });
    }
  
    try {
      const response = await axios.get(`https://hercai.onrender.com/v3/text2image?prompt=${encodeURIComponent(prompt)}`);
      res.json({ result: response.data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
const nsfwApiUrl = 'https://nsfwhub.onrender.com/nsfw?type=';
const categories = [
    'ass',
    'sixtynine',
    'pussy',
    'dick',
    'anal',
    'boobs',
    'bdsm',
    'black',
    'easter',
    'bottomless',
    'blowjub',
    'collared',
    'cum',
    'cumsluts',
    'dp',
    'dom',
    'extreme',
    'feet',
    'finger',
    'fuck',
    'futa',
    'gay',
    'gif',
    'group',
    'hentai',
    'kiss',
    'lesbian',
    'lick',
    'pegged',
    'phgif',
    'puffies',
    'real',
    'suck',
    'tattoo',
    'tiny',
    'toys',
    'xmas'
  ];
  categories.forEach(category => {
    app.get(`/nsfw/${category}`, async (req, res) => {
      try {
        const response = await axios.get(`${nsfwApiUrl}${category}`);
        res.json({ result: response.data });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });
  }); 

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
