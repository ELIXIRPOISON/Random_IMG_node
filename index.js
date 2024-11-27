const express = require('express');
const fetch = require('node-fetch'); // Required for Unsplash
const { createApi } = require('unsplash-js');
const app = express();
const PORT = process.env.PORT || 3000;


const unsplash = createApi({
    accessKey: 'Wj9VVrlY7dMapwFnScxplCoBRKQ0wPlnctq6Q8qAxos',
    fetch: fetch,
});


app.get('/', (req, res) => {
    res.send('Welcome to the Random Image API! Use /api/image/random to get a random image.');
});


app.get('/api/image/random', async (req, res) => {
    try {
        const response = await unsplash.photos.getRandom();
        if (response.type === 'success') {
            const image = response.response.urls.full;
            res.json({ image });
        } else {
            throw new Error('Failed to fetch image');
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the image.' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
