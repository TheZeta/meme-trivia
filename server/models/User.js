const db = require('../utils/db');

const User = {
    create: (username, password, callback) => {
        db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (err) => {
            callback(err, { id: this.lastID, username });
        });
    },
    findByUsername: (username, callback) => {
        db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
            callback(err, row);
        });
    },
    findById: (id, callback) => {
        db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
            callback(err, row);
        });
    },
    delete: (id, callback) => {
        db.run('DELETE FROM users WHERE id = ?', [id], (err) => {
            callback(err, { deletedID: id });
        });
    },
};

module.exports = User;
