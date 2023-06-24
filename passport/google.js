import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '../constants.js';
import { AppDataSource } from "../datasource.js";
import User from "../entities/user.js";

const config = {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
    scope: ["profile", "email"]
};

const verify = async(
    _accessToken,
    _refreshToken,
    profile,
    done
) => {
    // find or add user to database
    const userRepository = AppDataSource.getRepository(User);
    const foundUser = await userRepository.findOneBy({
        
            provider: profile.provider,
            providerId: profile.id
        
    });
    if (foundUser) {
        return done(null, foundUser);
    }
    const newUser = await userRepository.save({
        provider: profile.provider,
        providerId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value
    });
    return done(null, newUser);
}

export default new GoogleStrategy(config, verify);
