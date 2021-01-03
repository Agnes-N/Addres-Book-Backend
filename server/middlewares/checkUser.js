import UserHelper from '../helpers/userHelper';
import TokenHelper from '../helpers/tokenHelper';
import ContactService from '../Services/contactService';

/**
 * This class contains methods
 * required to check specific users
 * in the database.
 */
class checkUser {
  /**
   * This method verifies whether email is used.
   * @param {object} req the user's request.
   * @param {object} res the response.
   * @param {Function} next pass to next function.
   * @returns {object} message indicating used email.
   */
  static async verifyUsedEmail(req, res, next) {
    try {
      const { email } = req.body;
      const usedEmail = await UserHelper.findUser({ email });
      if (usedEmail === null) {
        next();
      } else {
        res.status(409).send({
          status: 409,
          message: 'The specified email is already taken'
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Something went wrong while verifying used email',
        error: error.message
      });
    }
  }

  /**
   * This method verifies profile owner.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @param {Function} next pass to next function
   * @returns {object} message indicating an error.
   */
  static async verifyContactOwnership(req, res, next) {
    const { token } = req.headers;
    try {
      const data = TokenHelper.verifyToken(token);
      const { id } = data;
      const { contactId } = req.params;

      const foundContact = await ContactService.findExistingContact('id', contactId);
      const contactFound = foundContact[0].dataValues;
      if (contactFound.userId === undefined) {
        return res.status(404).json({
          status: 404,
          error: 'You have not created any contact yet!'
        });
      } if (contactFound.userId !== id) {
        return res.status(404).json({
          status: 404,
          error: 'Make sure you created this contact!'
        });
      }
      next();
    } catch (error) {
      return res.status(404).json({
        status: 404,
        message: 'You have not created any contact yet!'
      });
    }
  }
}

export default checkUser;
