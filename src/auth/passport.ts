import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy, StrategyOptions } from 'passport-jwt';
import User from '../user/userModel';

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

passport.use(
  new JwtStrategy(opts, async function (payload, done) {
    const response = await User.findOne({ id: payload.sub });
    if (response) return done(null, response);
    console.log(response);
    return done(response, false);
  })
);

export default passport;
