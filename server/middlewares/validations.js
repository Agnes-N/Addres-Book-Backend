import { signupSchema, signinSchema } from '../schemas/authSchema';
import contactSchema from '../schemas/contactSchema';
import idSchema from '../schemas/idSchema';
import ContactService from '../Services/contactService';

/**
 * This class contains all methods
 * required to validate all
 * sent data from the API consumer.
 */
class Validations {
  /**
   * This method validates the data sent from the API consumer for signing up a user.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @param {object} next pass to next method.
   * @returns {object} Error message.
   */
  static validateSignUpData(req, res, next) {
    const { error } = signupSchema.validate(req.body);
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map(i => i.message).join(',');
      res.status(422).json({
        status: 422,
        message
      });
    }
  }

  /**
   * This method validates the data sent from the API consumer for signing in a user.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @param {object} next pass to next method.
   * @returns {object} Error message.
   */
  static validateSignInData(req, res, next) {
    const { error } = signinSchema.validate(req.body);
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map(i => i.message).join(',');
      res.status(422).json({
        status: 422,
        message
      });
    }
  }

  /**
   * This method validates contact data from the API consumer.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @param {object} next pass to next method.
   * @returns {object} Error message.
   */
  static async validateContactData(req, res, next) {
    const { body } = req;
    const { error } = contactSchema.validate(body);
    const valid = error == null;
    if (valid) {
      const errors = {};
      const contactFound = await ContactService.findExistingContact('id', body.contactId);

      if (contactFound.length === 0) {
        errors.contactId = 'The specified contact does not exist!';
      }
      if (Object.keys(errors).length !== 0) {
        return res.status(422).json({
          status: 422,
          error: errors
        });
      }
      req.contactId = contactFound;
      next();
    } else {
      const { details } = error;
      const message = details.map(i => i.message).join(',');
      res.status(422).json({
        status: 422,
        error: message
      });
    }
  }

  /**
   * This method validates the contact id sent from the API consumer.
   * @param {object} req The contact's request.
   * @param {object} res The response.
   * @param {object} next pass to next method.
   * @returns {object} Error message.
   */
  static validateContactId(req, res, next) {
    const { error } = idSchema.validate({ contactId: req.params.contactId });
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const {
        details
      } = error;
      const message = details.map((i) => i.message).join(',');
      res.status(422).json({
        status: 422,
        error: `contact ${message}`
      });
    }
  }
}

export default Validations;
