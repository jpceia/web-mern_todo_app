import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import { expenseRoutes, authRoutes, meRoutes } from './routes';
import path from 'path';
import session from 'express-session';
import passport from 'passport';
import { AppDataSource } from "./datasource";
import { Session } from "./entities/session";
import { PORT, SESSION_SECRET, __prod__ } from './constants';
import { TypeormStore } from 'connect-typeorm';
import cors from 'cors';
import './auth';
// const __dirname = path.resolve();

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

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);

// Middleware
app.use((_req: Request, res: Response, next: NextFunction) => {
    // res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
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
    },
    store: new TypeormStore({
        cleanupLimit: 2,
        limitSubquery: false,
        ttl: 10 * 365 * 24 * 60 * 60 * 100, // 10 years
    }).connect(AppDataSource.getRepository(Session))
}));


app.use(passport.initialize());
app.use(passport.session());

// Serve static assets if in production
app.use(express.static(path.resolve(__dirname, "./client/build")));
app.get("/", (_req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

// API routes
app.use('/api/expense', expenseRoutes);
app.use('/api/me', meRoutes);
app.use('/auth', authRoutes);

app.use((err, _req: Request, _res: Response, next: NextFunction) => {
    console.log(err);
    next();
});

//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', (_req: Request, res: Response) => {
    res.status(404).send('what???');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});
