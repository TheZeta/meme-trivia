const express = require('express');
const Meme = require('../models/Meme');

const router = express.Router();

router.get('/', (req, res) => {
    const memeQuantity = req.user ? 3 : 1;

    Meme.getRandomMemes(memeQuantity, (err, memes) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to fetch memes' });
        } else {
            res.json(memes);
        }
    });
});

module.exports = router;
