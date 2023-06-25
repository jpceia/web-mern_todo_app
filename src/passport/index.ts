import googleStrategy from "./google";
import { AppDataSource } from "../datasource";
import { User } from "../entities/user";
import passport from "passport";



passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ id });
    done(null, user);
});

passport.use("google", googleStrategy);
