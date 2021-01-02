import { Router } from 'express';
import TokenHandler from '../middlewares/tokenHandler';
import ContactController from '../controllers/contactController';
import Validations from '../middlewares/validations';
import checkUser from '../middlewares/checkUser';

const router = Router();

router.post('/contacts', TokenHandler.verifyToken, Validations.validateContactData, ContactController.registerContact);
router.get('/contacts', TokenHandler.verifyToken, ContactController.retrieveAllContacts);
router.get('/contacts/:contactId', TokenHandler.verifyToken, Validations.validateContactId, checkUser.verifyContactOwnership, ContactController.retrieveOneContact);
router.patch('/contacts/:contactId/contacts', TokenHandler.verifyToken, Validations.validateContactId, checkUser.verifyContactOwnership, ContactController.updateContact);
router.delete('/contacts/:contactId', TokenHandler.verifyToken, Validations.validateContactId, checkUser.verifyContactOwnership, ContactController.deleteContact);

export default router;
