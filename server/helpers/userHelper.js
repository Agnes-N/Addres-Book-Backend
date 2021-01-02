import models from '../sequelize/models';

/**
 * This class contains
 * methods for handling user-related operations.
 */
class UserHelper {
  /**
   * This method registers a user.
   * @param {object} data user information.
   * @returns {object} user information.
   */
  static async registerUser(data) {
    try {
      const { Users } = models;
      const result = await Users.create(data, {
        fields: [
          'firstname', 'lastname', 'email', 'password'
        ]
      });
      return result;
    } catch (error) {
      return error;
    }
  }

  /**
   * This method finds a user.
   * @param {String} data user id.
   * @returns {Boolean} user data.
   */
  static async findUser(data) {
    try {
      const { Users } = models;
      const user = await Users.findOne({ where: data });
      return user;
    } catch (error) {
      return error;
    }
  }
}

export default UserHelper;
