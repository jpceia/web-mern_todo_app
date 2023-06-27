import { Strategy as GoogleStrategy, Profile, VerifyCallback } from "passport-google-oauth20";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '../constants';
import { AppDataSource } from "../datasource";
import { User } from "../entities/user";
import { ProviderType } from "../entities/user";

const config = {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
    scope: ["profile", "email"]
};

const verify = async(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: VerifyCallback
) => {
    // find or add user to database
    const userRepository = AppDataSource.getRepository(User);
    const foundUser = await userRepository.findOneBy({
        provider: profile.provider as ProviderType,
        providerId: profile.id
    });
    if (foundUser) {
        return done(null, foundUser);
    }
    const newUser = await userRepository.save({
        provider: profile.provider as ProviderType,
        providerId: profile.id,
        name: profile.displayName,
        email: profile.emails[0]?.value,
        profileImg: profile.photos[0]?.value
    });
    return done(null, newUser);
}

export default new GoogleStrategy(config, verify);
