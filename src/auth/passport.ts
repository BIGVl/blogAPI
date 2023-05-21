import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy, StrategyOptions } from 'passport-jwt';
import User from '../user/userModel';

const secret = process.env.SECRET || 'secret';

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret
};

passport.use(
  new JwtStrategy(opts, async function (payload, done) {
    const response = await User.findOne({ id: payload.sub });
    if (response) return done(null, payload);
    console.log(payload);
    return done(payload, false);
  })
);

export default passport;
