import UserHelper from './userHelper';
import PasswordHelper from './passwordHelper';

/**
 * This class contains methods
 * that handle authentication related operations
 */
class SignInHelper {
  /**
   * This method signs a user in.
   * @param {string} email The user's email to be checked.
   * @param {string} password The user's password to be compared.
   * @param {Function} done supplies user credentials after user is successfully checked.
   * @returns {Function} returns a message for incorrect user email or Password.
   */
  static async userSignIn(email, password, done) {
    try {
      const user = await UserHelper.findUser({ email });
      if (user) {
        const passwordExists = await PasswordHelper.comparePasswords(
          password,
          user.password
        );
        if (passwordExists) return done(null, user);
      }
      return done('Password or email is incorrect');
    } catch (error) {
      return error;
    }
  }
}

export default SignInHelper;
