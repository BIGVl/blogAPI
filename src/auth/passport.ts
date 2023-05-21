import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy, StrategyOptions } from 'passport-jwt';
import User from '../user/userModel';

const secret = process.env.SECRET || 'secret';
console.log(secret);
const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret
};

passport.use(
  new JwtStrategy(opts, async (payload, done) => {
    const user = await User.findById(payload.id);
    console.log(`payload ${payload.id}`);
    console.log(user);
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  })
);

export default passport;
