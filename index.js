import express from 'express';
import bodyParser from 'body-parser';
import { expenseRoutes, authRoutes } from './routes/index.js';
import path from 'path';
import session from 'express-session';
import passport from 'passport';
import './passport/index.js';
import { AppDataSource } from "./datasource.js";
import { PORT, SESSION_SECRET, __prod__ } from './constants.js';
const __dirname = path.resolve();

// https://jasonwatmore.com/post/2020/03/02/react-hooks-redux-user-registration-and-login-tutorial-example
// https://medium.com/dailyjs/mern-stack-implementing-sign-in-with-google-made-easy-9bfdfe00d21c
// https://devcenter.heroku.com/articles/config-vars

const app = express();
const port = PORT || 5000;

// establish database connection
AppDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

// Middleware
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.json());

app.use(session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true, // false ?
    rolling: true, // forces resetting of max age
    cookie: {
        maxAge: 10 * 365 * 24 * 60 * 60 * 100, // 10 years
        httpOnly: true,
        sameSite: "lax", // csrf
        secure: __prod__ // this should be true only when you don't want to show it for security reason
    }
}));


app.use(passport.initialize());
app.use(passport.session());

// Serve static assets if in production
app.use(express.static(path.resolve(__dirname, "./client/build")));
app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

// API routes
app.use('/api/expense', expenseRoutes);
app.use('/auth', authRoutes);

app.use((err, req, res, next) => {
    console.log(err);
    next();
});

//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', (req, res) => {
    res.status(404).send('what???');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});
