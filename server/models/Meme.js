const db = require('../utils/db');

const Meme = {
    getRandomMemes: (quantity, callback) => {
        db.all('SELECT * FROM memes ORDER BY RANDOM() LIMIT ?', [quantity], (err, rows) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, rows);
            }
        });
    },
};

module.exports = Meme;
