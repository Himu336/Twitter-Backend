import JWT from "passport-jwt";
import User from "../models/user.js";
import { JWT_SECRET_KEY } from "../config/server-config.js";

const JwtStrategy = JWT.Strategy;
const ExtractJwt = JWT.ExtractJwt;

const opts  = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET_KEY
};

export const passportAuth = (passport) => { 
    passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
        try {
            const user = await User.findById(jwt_payload._id);
            if(user){
                return done(null, user);
            }
            return done(null, false);
        } catch (error) {
            console.error(error);
            return done(error, false);
        }
    }));
};