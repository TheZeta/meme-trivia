const express = require('express');
const Score = require('../models/Score');

const router = express.Router();

router.get('/last', (req, res) => {
    Score.getLastScore(req.user.id, (err, score) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to fetch score' });
        } else {
            res.json(score);
        }
    })
});

router.post('/', (req, res) => {
    if (req.isAuthenticated()) {
        Score.setScore(req.user.id, req.body.questions, (err) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Failed to register score' });
            } else {
                res.json({ message: 'Score successfully registered to the database' });
            }
        });
    } else {
        res.json({ error: 'Only for registered users scores are saved' });
    }
});

router.get('/:score_id', (req, res) => {
    Score.getScoreByScoreId(req.params.score_id, req.user.id, (err, scores) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to fetch scores' });
        } else {
            res.json(scores);
        }
    });
});

router.get('/', (req, res) => {
    Score.getScoresByUserId(req.user.id, (err, scores) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to fetch scores' });
        } else {
            res.json(scores);
        }
    });
});

module.exports = router;
