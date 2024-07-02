const express = require('express');
const Caption = require('../models/Caption');

const router = express.Router();

router.get('/', (req, res) => {
    Caption.getRandomCaptions(req.query.best_caption_1, req.query.best_caption_2, (err, captions) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to fetch memes' });
        } else {
            res.json(captions);
        }
    });
});

module.exports = router;
