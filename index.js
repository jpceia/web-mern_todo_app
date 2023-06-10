import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/api.js';
import path from 'path';
import { config } from 'dotenv';
import { AppDataSource } from "./datasource.js";
const __dirname = path.resolve();

// https://jasonwatmore.com/post/2020/03/02/react-hooks-redux-user-registration-and-login-tutorial-example
// https://medium.com/dailyjs/mern-stack-implementing-sign-in-with-google-made-easy-9bfdfe00d21c
// https://devcenter.heroku.com/articles/config-vars

config();

const app = express();
const port = process.env.PORT || 5000;

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

// Serve static assets if in production
app.use(express.static(path.resolve(__dirname, "./client/build")));
app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

// API routes
app.use('/api', routes);

app.use((err, req, res, next) => {
    console.log(err);
    next();
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});
