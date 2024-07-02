const db = require('../utils/db');

const Score = {
    // Retrieve the last score
    getLastScore: (user_id, callback) => {
        db.get('SELECT * FROM scores WHERE user_id = ? ORDER BY id DESC LIMIT 1', [user_id], (err, row) => {
            if (err) {
                callback(err, null);
            } else {
                if (row) {
                    row.questions = JSON.parse(row.questions);
                }
                callback(null, row);
            }
        });
    },

    // Store the score with a new structure
    setScore: (user_id, questions, callback) => {
        // Serialize the `questions` array to a JSON string
        const questionsJson = JSON.stringify(questions);
        db.run(
            'INSERT INTO scores (user_id, questions) VALUES (?, ?)', [user_id, questionsJson], (err) => {
                if (err) {
                    callback(err);
                } else {
                    callback(null, this.lastID);
                }
            }
        );
    },

    getScoreByScoreId: (score_id, user_id, callback) => {
        db.get('SELECT * FROM scores WHERE id = ? AND user_id = ?', [score_id, user_id], (err, row) => {
            if (err) {
                callback(err, null);
            } else {
                if (row) {
                    row.questions = JSON.parse(row.questions);
                }
                callback(null, row);
            }
        });
    },

    // Retrieve scores by user_id
    getScoresByUserId: (user_id, callback) => {
        db.all('SELECT id, user_id, questions FROM scores WHERE user_id = ?', [user_id], (err, rows) => {
            if (err) {
                callback(err, null);
            } else {
                // Parse the questions JSON for each row
                rows.forEach(row => {
                    row.questions = JSON.parse(row.questions);
                });
                callback(null, rows);
            }
        });
    }
};

module.exports = Score;
