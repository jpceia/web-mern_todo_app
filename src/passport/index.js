import googleStrategy from "./google.js";
import { AppDataSource } from "../datasource.js";
import User from "../entities/user.js";
import passport from "passport";

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ id });
    done(null, user);
});

passport.use(googleStrategy);
