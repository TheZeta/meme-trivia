const express = require('express');
const session = require('express-session');
const cors = require('cors')
const passport = require('./middleware/authMiddleware');
const authRoutes = require('./routes/authRoutes');
const memeRoutes = require('./routes/memeRoutes');
const captionRoutes = require('./routes/captionRoutes');
const scoreRoutes = require('./routes/scoreRoutes');

const app = express();

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'asd',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/memes', memeRoutes);
app.use('/captions', captionRoutes);
app.use('/scores', scoreRoutes);

module.exports = app;
