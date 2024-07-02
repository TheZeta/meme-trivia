const db = require('../utils/db');

const Caption = {
    getRandomCaptions: (best_caption_1, best_caption_2, callback) => {
        const query1 = `SELECT * FROM captions WHERE id IN (?, ?)`;
        const query2 = `SELECT * FROM captions WHERE id NOT IN (?, ?) ORDER BY RANDOM() LIMIT 5`;

        db.all(query1, [best_caption_1, best_caption_2], (err1, rows1) => {
            if (err1) {
                return callback(err1);
            }

            db.all(query2, [best_caption_1, best_caption_2], (err2, rows2) => {
                if (err2) {
                    return callback(err2);
                }

                // Combine the results
                const combinedRows = [...rows1, ...rows2];

                // Shuffle the combined results
                for (let i = combinedRows.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [combinedRows[i], combinedRows[j]] = [combinedRows[j], combinedRows[i]];
                }

                callback(null, combinedRows);
            });
        });
    },
};

module.exports = Caption;
