import models from '../sequelize/models';

/**
 * This class contains methods
 * that handle contact-related operations
 */
class ContactService {
  /**
     * This method to create contact.
     * @param {object} contactData contact data.
     * @returns {object} contact data.
     */
  static async saveContact(contactData) {
    try {
      const { Contacts } = models;
      const savedContact = await Contacts.create(
        {
          ...contactData,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          fields: [
            'userId',
            'names',
            'phoneNumber',
            'email',
            'createdAt',
            'updatedAt'
          ]
        }
      );
      return savedContact;
    } catch (error) {
      return error;
    }
  }

  /**
     * This method finds a Contact.
     * @param {object} data Contact data.
     * @returns {object} Contact data.
     */
  static async findContact(data) {
    try {
      const { Contacts } = models;
      const ContactFound = await Contacts.findOne({ where: data });
      return ContactFound;
    } catch (error) {
      return error;
    }
  }

  /**
     * This method checks whether the Contact exists
     * @param {string} column a value column where value belongs.
     * @param {string} value actual value.
     * @returns {object} User data.
     */
  static async retrieveContacts() {
    try {
      const { Contacts } = models;
      const Contact = await Contacts.findAndCountAll();
      return Contact;
    } catch (error) {
      return error;
    }
  }

  /**
     * This method checks whether the Contact exists
     * @param {string} column a value column where value belongs.
     * @param {string} value actual value.
     * @returns {object} User data.
     */
  static async findExistingContact(column, value) {
    try {
      const { Contacts } = models;
      const ContactExist = await Contacts.findAll({
        where: {
          [column]: value
        }
      });
      return ContactExist;
    } catch (error) {
      return error;
    }
  }

  /**
     * This method updates a Contact with email.
     * @param {string} id Contact email.
     * @param {object} data Contact data.
     * @returns {object} Contact data.
     */
  static async updateContactWithId(id, data) {
    try {
      const { Contacts } = models;
      const affectedRows = await Contacts.update(data, {
        where: { id },
        returning: true,
        plain: true
      });
      if (affectedRows) {
        const contact = await Contacts.findOne({
          where: { id }
        });
        return contact;
      }
    } catch (error) {
      return error;
    }
  }

  /**
   * This method updates a Contact with email.
   * @param {string} id Contact email.
   * @param {object} data Contact data.
   * @returns {object} Contact data.
   */
  static async deleteContactWithId(id) {
    try {
      const { Contacts } = models;
      await Contacts.destroy({
        where: { id },
        returning: true,
        plain: true
      });
    } catch (error) {
      return error;
    }
  }
}

export default ContactService;
