import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import SignInHelper from '../helpers/authHelper';

const passportConfig = () => {
  passport.use(new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => SignInHelper.userSignIn(email, password, done)
  ));
};

export default passportConfig;
