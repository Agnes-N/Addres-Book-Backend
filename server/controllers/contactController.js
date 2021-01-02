import ContactService from '../Services/contactService';

/**
 * This class contains all methods
 * required to handle all
 * contact-related operations.
 */
class ContactController {
  /**
   * This method registers contact.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @returns {object} Registered contact  .
   */
  static async registerContact(req, res) {
    try {
      const {
        names,
        phoneNumber,
        email
      } = req.body;
      const { id } = req.user;
      names.toUpperCase();

      const ContactFound = await ContactService.findContact({ names });
      if (ContactFound) {
        return res.status(409).json({
          status: 409,
          message: `Contact was not registered, ${names} already exist`
        });
      }

      const savedContact = await ContactService.saveContact({
        userId: id,
        names,
        phoneNumber,
        email
      });

      if (savedContact) {
        return res.status(201).json({
          status: 201,
          message: 'Contact registered succesfully',
          data: savedContact
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Something went wrong when registering the Contact',
        error: error.message
      });
    }
  }

  /**
     * This method handles view all Contact requests.
     * @param {object} req The user's request.
     * @param {object} res The response.
     * @returns {object} The status and some data of the Contact.
     */
  static async retrieveAllContacts(req, res) {
    try {
      const foundContacts = await ContactService.retrieveContacts();
      const contactData = foundContacts.rows;

      if (contactData.length === 0) {
        return res.status(404).json({
          status: 404,
          message: 'You don’t currently have any Contact requests'
        });
      }

      return res.status(200).json({
        status: 201,
        message: 'All Contacts retrieved successfully',
        Contacts: contactData
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Something went wrong when retrieving all Contacts',
        error: error.message
      });
    }
  }

  /**
     * This method handles the request for retrieving a single Contact.
     * @param {object} req The user's request.
     * @param {object} res The response.
     * @returns {object} The status and some data of the Contact.
     */
  static async retrieveOneContact(req, res) {
    try {
      const { contactId } = req.params;
      const foundContact = await ContactService.findExistingContact('id', contactId);
      if (foundContact.length > 0) {
        return res.status(200).json({
          status: 200,
          data: foundContact
        });
      }
      res.status(404).json({
        status: 404,
        error: `No Contact found with this id ${contactId}`
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Something went wrong when retrieving the Contact',
        error: error.message
      });
    }
  }

  /**
     * This method handles upddating Contact's phoneNumber request.
     * @param {object} req The user's request.
     * @param {object} res The response.
     * @returns {object} The status and some data of the user's updated Contact.
     */
  static async updateContact(req, res) {
    try {
      const { contactId } = req.params;
      const { names, phoneNumber, email } = req.body;

      const data = {
        names,
        phoneNumber,
        email,
        updatedAt: new Date()
      };

      const updatedContact = await ContactService.updateContactWithId(contactId, data);
      res.status(200).send({
        status: 200,
        message: 'User Contact has been successfuly updated',
        data: updatedContact
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Something went wrong when updating the user Contact',
        error: error.message
      });
    }
  }

  /**
     * This method handles deleting Contact request.
     * @param {object} req The user's request.
     * @param {object} res The response.
     * @returns {object} The status and message of the action done on Contact.
     */
  static async deleteContact(req, res) {
    try {
      const { contactId } = req.params;
      await ContactService.deleteContactWithId(contactId);
      res.status(200).send({
        status: 200,
        message: 'User Contact has been successfuly deleted'
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Something went wrong when deleting the user Contact',
        error: error.message
      });
    }
  }
}

export default ContactController;
