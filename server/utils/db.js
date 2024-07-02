const sqlite3 = require('sqlite3').verbose();

const DBSOURCE = "./database.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    } else {
        console.log('Connected to the SQLite database.');
        
        db.serialize(() => {
            // Create users table
            db.run(`CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE,
                password TEXT
            )`, (err) => {
                if (err) {
                    console.error(err.message);
                    throw err;
                }
            });
            
            // Create captions table
            db.run(`CREATE TABLE IF NOT EXISTS captions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                text TEXT
            )`, (err) => {
                if (err) {
                    console.error(err.message);
                    throw err;
                }
            });
            
            // Create memes table
            db.run(`CREATE TABLE IF NOT EXISTS memes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                image TEXT,
                best_caption1_id INTEGER,
                best_caption2_id INTEGER,
                FOREIGN KEY (best_caption1_id) REFERENCES captions(id),
                FOREIGN KEY (best_caption2_id) REFERENCES captions(id)
            )`, (err) => {
                if (err) {
                    console.error(err.message);
                    throw err;
                }
            });

            db.run(`
                CREATE TABLE IF NOT EXISTS scores (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id INTEGER NOT NULL,
                    questions TEXT NOT NULL,
                    FOREIGN KEY (user_id) REFERENCES users(id)
                )
            `, (err) => {
                if (err) {
                    console.error(err.message);
                    throw err;
                }
            });
        });
    }
});

module.exports = db;
